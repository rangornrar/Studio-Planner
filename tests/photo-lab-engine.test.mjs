import assert from "node:assert/strict";
import test from "node:test";

import {
  buildPhotoLabReadout,
  calculateEquivalentFocalLength,
  clampSettingsToEquipment,
  findCameraBody,
  findLens,
  getSupportedApertures,
  getSupportedFocalLengths,
  interpolateMaxAperture
} from "../js/photo-lab-engine.mjs";

test("une focale fixe ne permet pas de changer de focale", () => {
  const lens = findLens("prime-50-f18");

  assert.deepEqual(getSupportedFocalLengths(lens), [50]);

  const result = clampSettingsToEquipment({
    bodyId: "lumiere-ff-45",
    lensId: "prime-50-f18",
    focalLength: 85
  });

  assert.equal(result.settings.focalLength, 50);
  assert.equal(result.changes.some((change) => change.field === "focalLength"), true);
});

test("un 24-70 mm ne permet pas de selectionner 85 mm", () => {
  const result = clampSettingsToEquipment({
    bodyId: "lumiere-ff-45",
    lensId: "zoom-24-70-f28",
    focalLength: 85
  });

  assert.equal(result.settings.focalLength, 70);
  assert.equal(result.supported.focalLengths.includes(85), false);
});

test("un objectif f/4 ne permet pas de selectionner f/2.8", () => {
  const result = clampSettingsToEquipment({
    bodyId: "lumiere-ff-45",
    lensId: "zoom-24-105-f4",
    focalLength: 50,
    aperture: 2.8
  });

  assert.equal(result.settings.aperture, 4);
  assert.equal(result.supported.apertures.includes(2.8), false);
});

test("l'ouverture maximale d'un zoom variable evolue avec la focale", () => {
  const lens = findLens("zoom-18-55-f35-f56");

  assert.equal(interpolateMaxAperture(lens, 18), 3.5);
  assert.equal(interpolateMaxAperture(lens, 55), 5.6);
  assert.equal(interpolateMaxAperture(lens, 35), 4.5);

  assert.deepEqual(getSupportedApertures(lens, 55).slice(0, 2), [5.6, 8]);
});

test("un capteur APS-C applique correctement son facteur de recadrage", () => {
  const body = findCameraBody("lumiere-apsc-26");

  assert.equal(calculateEquivalentFocalLength(50, body), 75);
});

test("les valeurs restent coherentes apres changement d'objectif", () => {
  const result = clampSettingsToEquipment({
    bodyId: "lumiere-apsc-26",
    lensId: "zoom-18-55-f35-f56",
    focalLength: 55,
    aperture: 1.8,
    iso: 12800
  });

  assert.equal(result.settings.iso, 6400);
  assert.equal(result.settings.focalLength, 55);
  assert.equal(result.settings.aperture, 5.6);
});

test("le readout expose exposition, profondeur de champ et risques de flou", () => {
  const result = buildPhotoLabReadout({
    bodyId: "lumiere-ff-45",
    lensId: "prime-85-f14",
    focalLength: 85,
    aperture: 1.4,
    shutterSeconds: 1 / 15,
    iso: 1600,
    subjectDistanceMeters: 2.2,
    subjectSpeedMetersPerSecond: 0.7
  });

  assert.equal(result.readout.exposureWarning, "overexposed");
  assert.equal(result.readout.handheldBlurRisk.level, "high");
  assert.equal(result.readout.subjectMotionBlurRisk.level, "high");
  assert.equal(result.readout.depthOfField.totalMeters > 0, true);
});
