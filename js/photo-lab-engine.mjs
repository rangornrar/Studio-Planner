import {
  APERTURE_VALUES,
  CAMERA_BODIES,
  DEFAULT_PHOTO_LAB_SETTINGS,
  FOCAL_LENGTH_VALUES,
  ISO_VALUES,
  LENSES,
  SHUTTER_SPEEDS
} from "./photo-lab-data.mjs";

const CIRCLE_OF_CONFUSION_MM = {
  "full-frame": 0.03,
  "aps-c": 0.02,
  "micro-four-thirds": 0.015
};

export function findCameraBody(bodyId, bodies = CAMERA_BODIES) {
  return bodies.find((body) => body.id === bodyId) || null;
}

export function findLens(lensId, lenses = LENSES) {
  return lenses.find((lens) => lens.id === lensId) || null;
}

export function isLensCompatibleWithBody(lens, body) {
  if (!lens || !body) return false;
  return body.compatibleLensIds.includes(lens.id) && lens.compatibleSensorFormats.includes(body.sensorFormat);
}

export function interpolateMaxAperture(lens, focalLength) {
  if (!lens) throw new Error("Lens is required");
  if (lens.type === "prime") return lens.maxApertureAtMinFocal;

  const clampedFocal = clamp(focalLength, lens.minFocalLength, lens.maxFocalLength);
  if (Array.isArray(lens.apertureTable) && lens.apertureTable.length) {
    const table = [...lens.apertureTable].sort((a, b) => a.focalLength - b.focalLength);
    if (clampedFocal <= table[0].focalLength) return table[0].maxAperture;
    if (clampedFocal >= table[table.length - 1].focalLength) return table[table.length - 1].maxAperture;

    for (let index = 0; index < table.length - 1; index += 1) {
      const start = table[index];
      const end = table[index + 1];
      if (clampedFocal >= start.focalLength && clampedFocal <= end.focalLength) {
        const ratio = (clampedFocal - start.focalLength) / (end.focalLength - start.focalLength);
        return roundToTenth(start.maxAperture + (end.maxAperture - start.maxAperture) * ratio);
      }
    }
  }

  const zoomRatio = (clampedFocal - lens.minFocalLength) / (lens.maxFocalLength - lens.minFocalLength);
  return roundToTenth(lens.maxApertureAtMinFocal + (lens.maxApertureAtMaxFocal - lens.maxApertureAtMinFocal) * zoomRatio);
}

export function getSupportedFocalLengths(lens, baseValues = FOCAL_LENGTH_VALUES) {
  if (!lens) return [];
  if (lens.type === "prime") return [lens.minFocalLength];

  return uniqueSortedNumbers([
    lens.minFocalLength,
    ...baseValues.filter((value) => value >= lens.minFocalLength && value <= lens.maxFocalLength),
    lens.maxFocalLength
  ]);
}

export function getSupportedApertures(lens, focalLength, baseValues = APERTURE_VALUES) {
  if (!lens) return [];
  const maxAperture = interpolateMaxAperture(lens, focalLength);
  return uniqueSortedNumbers([
    maxAperture,
    ...baseValues.filter((value) => value >= maxAperture && value <= lens.minAperture),
    lens.minAperture
  ]);
}

export function clampSettingsToEquipment(settings, bodies = CAMERA_BODIES, lenses = LENSES) {
  const requested = { ...DEFAULT_PHOTO_LAB_SETTINGS, ...settings };
  const body = findCameraBody(requested.bodyId, bodies) || bodies[0];
  const requestedLens = findLens(requested.lensId, lenses);
  const lens = requestedLens && isLensCompatibleWithBody(requestedLens, body)
    ? requestedLens
    : findLens(body.compatibleLensIds[0], lenses);

  if (!lens) {
    throw new Error(`No compatible lens found for body ${body.id}`);
  }

  const warnings = [];
  const changes = [];

  if (requestedLens && requestedLens.id !== lens.id) {
    warnings.push(`${requestedLens.name} n'est pas compatible avec ${body.name}.`);
    changes.push({ field: "lensId", from: requestedLens.id, to: lens.id, reason: "incompatible-lens" });
  }

  const isoValues = ISO_VALUES.filter((value) => value >= body.isoRange.min && value <= body.isoRange.max);
  const iso = nearestValue(requested.iso, isoValues);
  pushChange(changes, warnings, "iso", requested.iso, iso, `ISO limite a la plage ${body.isoRange.min}-${body.isoRange.max}.`);

  const focalValues = getSupportedFocalLengths(lens);
  const focalLength = nearestValue(clamp(requested.focalLength, lens.minFocalLength, lens.maxFocalLength), focalValues);
  pushChange(
    changes,
    warnings,
    "focalLength",
    requested.focalLength,
    focalLength,
    lens.type === "prime"
      ? `${lens.name} est une focale fixe.`
      : `${lens.name} couvre uniquement ${lens.minFocalLength}-${lens.maxFocalLength} mm.`
  );

  const apertureValues = getSupportedApertures(lens, focalLength);
  const aperture = nearestValue(Math.max(requested.aperture, apertureValues[0]), apertureValues);
  pushChange(
    changes,
    warnings,
    "aperture",
    requested.aperture,
    aperture,
    `${lens.name} ne peut pas ouvrir plus grand que f/${formatNumber(apertureValues[0])} a ${focalLength} mm.`
  );

  const shutterSeconds = nearestValue(requested.shutterSeconds, SHUTTER_SPEEDS.map((speed) => speed.seconds));
  pushChange(changes, warnings, "shutterSeconds", requested.shutterSeconds, shutterSeconds, "Vitesse rapprochee de la valeur disponible.");

  return {
    settings: {
      ...requested,
      bodyId: body.id,
      lensId: lens.id,
      iso,
      focalLength,
      aperture,
      shutterSeconds
    },
    body,
    lens,
    supported: {
      isoValues,
      focalLengths: focalValues,
      apertures: apertureValues,
      shutterSpeeds: SHUTTER_SPEEDS
    },
    warnings: uniqueStrings(warnings),
    changes
  };
}

export function calculateExposureOffsetStops(settings, reference = DEFAULT_PHOTO_LAB_SETTINGS) {
  const isoStops = Math.log2(settings.iso / reference.iso);
  const shutterStops = Math.log2(settings.shutterSeconds / reference.shutterSeconds);
  const apertureStops = 2 * Math.log2(reference.aperture / settings.aperture);
  return roundToTenth(isoStops + shutterStops + apertureStops);
}

export function calculateEv100(settings) {
  return roundToTenth(Math.log2((settings.aperture * settings.aperture) / settings.shutterSeconds));
}

export function calculateEquivalentFocalLength(focalLength, body) {
  return Math.round(focalLength * body.cropFactor);
}

export function calculateHyperfocalDistanceMeters(settings, body) {
  const circleOfConfusion = CIRCLE_OF_CONFUSION_MM[body.sensorFormat] || CIRCLE_OF_CONFUSION_MM["full-frame"];
  const focalMm = settings.focalLength;
  const hyperfocalMm = (focalMm * focalMm) / (settings.aperture * circleOfConfusion) + focalMm;
  return roundToHundredth(hyperfocalMm / 1000);
}

export function calculateDepthOfField(settings, body) {
  const focalMeters = settings.focalLength / 1000;
  const subjectDistance = Math.max(settings.subjectDistanceMeters, focalMeters + 0.01);
  const hyperfocal = calculateHyperfocalDistanceMeters(settings, body);
  const near = (hyperfocal * subjectDistance) / (hyperfocal + (subjectDistance - focalMeters));
  const farDenominator = hyperfocal - (subjectDistance - focalMeters);
  const far = farDenominator <= 0 ? Infinity : (hyperfocal * subjectDistance) / farDenominator;

  return {
    nearMeters: roundToHundredth(near),
    farMeters: Number.isFinite(far) ? roundToHundredth(far) : Infinity,
    totalMeters: Number.isFinite(far) ? roundToHundredth(far - near) : Infinity,
    hyperfocalMeters: hyperfocal
  };
}

export function estimateHandheldBlurRisk(settings, body) {
  const safeSpeed = 1 / (settings.focalLength * body.cropFactor);
  const stabilizedSafeSpeed = safeSpeed * Math.pow(2, settings.stabilizationStops || 0);
  const ratio = settings.shutterSeconds / stabilizedSafeSpeed;
  if (ratio <= 1) return { level: "low", ratio: roundToTenth(ratio), safeShutterSeconds: stabilizedSafeSpeed };
  if (ratio <= 2) return { level: "moderate", ratio: roundToTenth(ratio), safeShutterSeconds: stabilizedSafeSpeed };
  return { level: "high", ratio: roundToTenth(ratio), safeShutterSeconds: stabilizedSafeSpeed };
}

export function estimateSubjectMotionBlurRisk(settings) {
  const motionTraceMeters = settings.subjectSpeedMetersPerSecond * settings.shutterSeconds;
  if (motionTraceMeters < 0.004) return { level: "low", motionTraceMeters: roundToHundredth(motionTraceMeters) };
  if (motionTraceMeters < 0.02) return { level: "moderate", motionTraceMeters: roundToHundredth(motionTraceMeters) };
  return { level: "high", motionTraceMeters: roundToHundredth(motionTraceMeters) };
}

export function buildPhotoLabReadout(settingsInput, reference = DEFAULT_PHOTO_LAB_SETTINGS) {
  const validation = clampSettingsToEquipment(settingsInput);
  const settings = validation.settings;
  const exposureOffsetStops = calculateExposureOffsetStops(settings, reference);
  const depthOfField = calculateDepthOfField(settings, validation.body);

  return {
    ...validation,
    readout: {
      exposureOffsetStops,
      ev100: calculateEv100(settings),
      exposureWarning: getExposureWarning(exposureOffsetStops),
      equivalentFocalLength: calculateEquivalentFocalLength(settings.focalLength, validation.body),
      depthOfField,
      handheldBlurRisk: estimateHandheldBlurRisk(settings, validation.body),
      subjectMotionBlurRisk: estimateSubjectMotionBlurRisk(settings)
    }
  };
}

function getExposureWarning(stops) {
  if (stops >= 2) return "overexposed";
  if (stops <= -2) return "underexposed";
  return "balanced";
}

function nearestValue(value, values) {
  return values.reduce((closest, candidate) => (
    Math.abs(candidate - value) < Math.abs(closest - value) ? candidate : closest
  ), values[0]);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function uniqueSortedNumbers(values) {
  return [...new Set(values.map((value) => Number(value.toFixed(2))))].sort((a, b) => a - b);
}

function uniqueStrings(values) {
  return [...new Set(values)];
}

function pushChange(changes, warnings, field, from, to, message) {
  if (from !== to) {
    changes.push({ field, from, to });
    warnings.push(message);
  }
}

function roundToTenth(value) {
  return Math.round(value * 10) / 10;
}

function roundToHundredth(value) {
  return Math.round(value * 100) / 100;
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
