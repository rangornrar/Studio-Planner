import { APERTURE_VALUES, ISO_VALUES } from "./photo-lab-data.mjs";
import { buildPhotoLabReadout, getSupportedApertures, getSupportedFocalLengths } from "./photo-lab-engine.mjs";
import { getPhotoLabScene } from "./photo-lab-scenes.mjs";

const scene = getPhotoLabScene("portrait-loft");
const state = {
  ...scene.defaultSettings,
  comparisonMode: "single",
  focalMode: "same-position",
  activeFrame: "current"
};

const refs = {};
let sourceImage = null;
let rafId = 0;

function initPhotoLab() {
  cacheRefs();
  if (!refs.root || !refs.canvas) return;

  sourceImage = new Image();
  sourceImage.decoding = "async";
  sourceImage.src = `${new URL(scene.imageSrc, import.meta.url).href}?v=photo-lab-2`;
  sourceImage.onload = function () {
    refs.loading.hidden = true;
    renderControls();
    queueRender();
  };
  sourceImage.onerror = function () {
    refs.loading.textContent = "Image de scene indisponible.";
  };

  bindEvents();
  renderControls();
  renderMode();
  setControlsOpen(false);
  queueRender();
}

function cacheRefs() {
  refs.page = document.querySelector(".page");
  refs.root = document.getElementById("photoLabShell");
  refs.canvas = document.getElementById("photoLabCanvas");
  refs.loading = document.getElementById("photoLabLoading");
  refs.isoControls = document.getElementById("photoLabIsoControls");
  refs.apertureControls = document.getElementById("photoLabApertureControls");
  refs.focalControls = document.getElementById("photoLabFocalControls");
  refs.explanation = document.getElementById("photoLabExplanation");
  refs.warning = document.getElementById("photoLabWarning");
  refs.metrics = document.getElementById("photoLabMetrics");
  refs.hudSettings = document.getElementById("photoLabHudSettings");
  refs.lensName = document.getElementById("photoLabLensName");
  refs.lensSpec = document.getElementById("photoLabLensSpec");
  refs.modeButtons = Array.from(document.querySelectorAll("[data-app-mode-target]"));
  refs.focalModeButtons = Array.from(document.querySelectorAll("[data-focal-mode]"));
  refs.compareButtons = Array.from(document.querySelectorAll("[data-photo-compare]"));
  refs.referenceCanvas = document.getElementById("photoLabReferenceCanvas");
  refs.currentCanvas = document.getElementById("photoLabCurrentCanvas");
  refs.compareWrap = document.getElementById("photoLabCompare");
  refs.controls = document.getElementById("photoLabControls");
  refs.controlsToggle = document.getElementById("photoLabControlsToggle");
}

function bindEvents() {
  refs.modeButtons.forEach((button) => {
    button.addEventListener("click", () => setAppMode(button.dataset.appModeTarget));
  });

  refs.focalModeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.focalMode = button.dataset.focalMode;
      renderMode();
      queueRender();
    });
  });

  refs.compareButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.comparisonMode = button.dataset.photoCompare;
      renderMode();
      queueRender();
    });
  });

  if (refs.controlsToggle) {
    refs.controlsToggle.addEventListener("click", () => {
      const nextOpen = !refs.root.classList.contains("is-controls-open");
      setControlsOpen(nextOpen);
    });
  }

  if (refs.controls) {
    refs.controls.addEventListener("click", (event) => {
      if (event.target.closest("[data-value], [data-focal-mode]")) {
        setControlsOpen(false);
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setControlsOpen(false);
  });

  window.addEventListener("resize", queueRender);
  window.addEventListener("hashchange", applyHashMode);
  applyHashMode();
}

function setControlsOpen(open) {
  if (!refs.root) return;
  refs.root.classList.toggle("is-controls-open", open);
  if (refs.controlsToggle) refs.controlsToggle.setAttribute("aria-expanded", open ? "true" : "false");
  if (refs.controls) refs.controls.setAttribute("aria-hidden", open ? "false" : "true");
}

function applyHashMode() {
  if (window.location.hash === "#photo-lab") setAppMode("photo-lab");
}

function setAppMode(mode) {
  const normalized = mode === "photo-lab" ? "photo-lab" : "planner";
  refs.page.dataset.appMode = normalized;
  if (normalized !== "photo-lab") setControlsOpen(false);
  refs.modeButtons.forEach((button) => {
    const active = button.dataset.appModeTarget === normalized;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  if (normalized === "photo-lab") queueRender();
}

function renderControls() {
  const readout = buildPhotoLabReadout(state);
  const focalValues = getSupportedFocalLengths(readout.lens);
  const apertureValues = getSupportedApertures(readout.lens, state.focalLength);

  state.iso = readout.settings.iso;
  state.focalLength = readout.settings.focalLength;
  state.aperture = readout.settings.aperture;

  setDialAngle(refs.isoControls, ISO_VALUES, state.iso, -132, 264);
  setDialAngle(refs.apertureControls, APERTURE_VALUES, state.aperture, -120, 240);
  setDialAngle(refs.focalControls, focalValues, state.focalLength, -112, 224);

  refs.isoControls.innerHTML = ISO_VALUES.map((value, index) => {
    return controlButton("iso", value, state.iso === value, `ISO ${value}`, true, dialStyle(index, ISO_VALUES.length, -132, 264));
  }).join("");
  refs.apertureControls.innerHTML = APERTURE_VALUES.map((value, index) => {
    const enabled = apertureValues.includes(value);
    const selected = state.aperture === value;
    return controlButton("aperture", value, selected, `f/${formatNumber(value)}`, enabled, dialStyle(index, APERTURE_VALUES.length, -120, 240));
  }).join("");
  refs.focalControls.innerHTML = focalValues.map((value, index) => {
    return controlButton("focal", value, state.focalLength === value, `${value} mm`, true, dialStyle(index, focalValues.length, -112, 224));
  }).join("");

  refs.isoControls.querySelectorAll("[data-value]").forEach((button) => {
    button.addEventListener("click", () => updateSetting("iso", Number(button.dataset.value)));
  });
  refs.apertureControls.querySelectorAll("[data-value]").forEach((button) => {
    button.addEventListener("click", () => updateSetting("aperture", Number(button.dataset.value)));
  });
  refs.focalControls.querySelectorAll("[data-value]").forEach((button) => {
    button.addEventListener("click", () => updateSetting("focalLength", Number(button.dataset.value)));
  });

  renderReadout(readout);
}

function controlButton(kind, value, selected, label, enabled = true, style = "") {
  const disabled = enabled ? "" : " disabled aria-disabled=\"true\"";
  const styleAttribute = style ? ` style="${style}"` : "";
  return `<button class="photo-lab-dial-option${selected ? " active" : ""}" type="button" data-kind="${kind}" data-value="${value}" aria-pressed="${selected ? "true" : "false"}"${styleAttribute}${disabled}>${label}</button>`;
}

function updateSetting(field, value) {
  state[field] = value;
  const readout = buildPhotoLabReadout(state);
  Object.assign(state, readout.settings);
  renderControls();
  queueRender();
}

function renderMode() {
  refs.focalModeButtons.forEach((button) => {
    const active = button.dataset.focalMode === state.focalMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  refs.compareButtons.forEach((button) => {
    const active = button.dataset.photoCompare === state.comparisonMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  refs.root.dataset.compareMode = state.comparisonMode;
}

function renderReadout(readout) {
  const settings = readout.settings;
  const exposure = readout.readout.exposureOffsetStops;
  const blurRisk = readout.readout.handheldBlurRisk.level;
  const dof = readout.readout.depthOfField.totalMeters;
  const focalCopy = state.focalMode === "same-position"
    ? "Ici l'appareil reste au meme endroit : la focale modifie l'angle de champ et le cadrage, pas la perspective."
    : "Ici le sujet reste proche de la meme taille : la position camera est supposee changer, donc la perspective evolue.";

  refs.explanation.textContent = `A f/${formatNumber(settings.aperture)}, la zone nette reste centree sur le sujet. ISO ${settings.iso} module la luminosite et le bruit, tandis que ${settings.focalLength} mm agit sur le cadrage. ${focalCopy}`;
  refs.warning.textContent = buildWarningCopy(readout);
  refs.warning.dataset.level = readout.readout.exposureWarning;
  refs.metrics.innerHTML = [
    metricMarkup("Expo", `${exposure > 0 ? "+" : ""}${formatNumber(exposure)} IL`),
    metricMarkup("EV100", formatNumber(readout.readout.ev100)),
    metricMarkup("PDC approx.", Number.isFinite(dof) ? `${formatNumber(dof)} m` : "infini"),
    metricMarkup("Eq. plein format", `${readout.readout.equivalentFocalLength} mm`),
    metricMarkup("Bouge", translateRisk(blurRisk))
  ].join("");

  if (refs.hudSettings) {
    refs.hudSettings.textContent = `ISO ${settings.iso} · f/${formatNumber(settings.aperture)} · ${settings.focalLength} mm`;
  }
  if (refs.lensName) {
    refs.lensName.textContent = `${readout.lens.brand} ${readout.lens.name}`;
  }
  if (refs.lensSpec) {
    const focalRange = readout.lens.type === "prime"
      ? `${readout.lens.minFocalLength} mm fixe`
      : `${readout.lens.minFocalLength}-${readout.lens.maxFocalLength} mm`;
    refs.lensSpec.textContent = `${readout.body.sensorFormat} · ${focalRange} · ${readout.lens.apertureBladeCount} lamelles`;
  }
}

function buildWarningCopy(readout) {
  const exposure = readout.readout.exposureWarning;
  const motion = readout.readout.subjectMotionBlurRisk.level;
  const handheld = readout.readout.handheldBlurRisk.level;
  const warnings = [];

  if (exposure === "overexposed") warnings.push("Risque de surexposition : hautes lumieres moins recuperables.");
  if (exposure === "underexposed") warnings.push("Risque de sous-exposition : bruit plus visible dans les ombres.");
  if (handheld !== "low") warnings.push(`Flou de bouge ${translateRisk(handheld).toLowerCase()} a main levee.`);
  if (motion !== "low") warnings.push(`Mouvement du sujet ${translateRisk(motion).toLowerCase()} avec cette vitesse.`);

  return warnings.length ? warnings.join(" ") : "Exposition equilibree, bruit contenu et risque de flou limite.";
}

function queueRender() {
  window.cancelAnimationFrame(rafId);
  rafId = window.requestAnimationFrame(renderScene);
}

function renderScene() {
  if (!refs.canvas || !sourceImage || !sourceImage.complete) return;
  renderToCanvas(refs.canvas, state);

  if (state.comparisonMode === "split" && refs.referenceCanvas && refs.currentCanvas) {
    renderToCanvas(refs.referenceCanvas, scene.defaultSettings);
    renderToCanvas(refs.currentCanvas, state);
  }
}

function renderToCanvas(canvas, settings) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width * ratio));
  const height = Math.max(220, Math.round(rect.height * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const ctx = canvas.getContext("2d");
  const readout = buildPhotoLabReadout(settings);
  const blur = getDepthBlur(readout.settings.aperture);
  const exposureStops = readout.readout.exposureOffsetStops;
  const frame = getSourceFrame(readout.settings, state.focalMode);

  ctx.clearRect(0, 0, width, height);
  drawImageFrame(ctx, frame, width, height, blur.background);
  drawSubjectPlane(ctx, frame, width, height, blur.subject);
  drawForegroundPlane(ctx, frame, width, height, blur.foreground);
  applyExposure(ctx, width, height, exposureStops);
  applyIsoQualityLoss(ctx, width, height, readout.settings.iso);
  drawNoise(ctx, width, height, readout.settings.iso);
  drawFocusMark(ctx, width, height);
}

function getSourceFrame(settings, focalMode) {
  const imageRatio = sourceImage.width / sourceImage.height;
  const baseFocal = focalMode === "same-position" ? 35 : 50;
  const zoom = clamp(settings.focalLength / baseFocal, 1, 3.4);
  const frameWidth = sourceImage.width / zoom;
  const frameHeight = frameWidth / imageRatio;
  const focusX = scene.focusPoint.x * sourceImage.width;
  const focusY = scene.focusPoint.y * sourceImage.height;
  const shift = focalMode === "subject-size" ? (settings.focalLength - 50) / 220 : 0;

  return {
    sx: clamp(focusX - frameWidth * (0.46 + shift), 0, sourceImage.width - frameWidth),
    sy: clamp(focusY - frameHeight * 0.43, 0, sourceImage.height - frameHeight),
    sw: frameWidth,
    sh: frameHeight
  };
}

function drawImageFrame(ctx, frame, width, height, blur) {
  ctx.save();
  ctx.filter = blur > 0 ? `blur(${blur}px)` : "none";
  const bleed = blur * 2;
  ctx.drawImage(sourceImage, frame.sx, frame.sy, frame.sw, frame.sh, -bleed, -bleed, width + bleed * 2, height + bleed * 2);
  ctx.restore();
}

function drawSubjectPlane(ctx, frame, width, height, blur) {
  drawFeatheredPlane(ctx, frame, width, height, scene.subjectMask, blur, 0.58, 1);
}

function drawForegroundPlane(ctx, frame, width, height, blur) {
  drawFeatheredPlane(ctx, frame, width, height, scene.foregroundMask, blur, 0.4, 0.58);
}

function drawFeatheredPlane(ctx, frame, width, height, mask, blur, innerStop, alpha) {
  const plane = document.createElement("canvas");
  plane.width = width;
  plane.height = height;
  const planeCtx = plane.getContext("2d");
  planeCtx.filter = blur > 0 ? `blur(${blur}px)` : "none";
  planeCtx.drawImage(sourceImage, frame.sx, frame.sy, frame.sw, frame.sh, 0, 0, width, height);
  planeCtx.filter = "none";
  planeCtx.globalCompositeOperation = "destination-in";
  planeCtx.save();
  planeCtx.translate(mask.x * width, mask.y * height);
  planeCtx.rotate(mask.rotation || 0);
  planeCtx.scale(mask.radiusX * width, mask.radiusY * height);
  const gradient = planeCtx.createRadialGradient(0, 0, innerStop, 0, 0, 1);
  gradient.addColorStop(0, "rgba(0,0,0,1)");
  gradient.addColorStop(Math.min(0.98, innerStop + 0.14), "rgba(0,0,0,0.82)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  planeCtx.fillStyle = gradient;
  planeCtx.fillRect(-1, -1, 2, 2);
  planeCtx.restore();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(plane, 0, 0);
  ctx.restore();
}

function applyExposure(ctx, width, height, stops) {
  const alpha = Math.min(0.46, Math.abs(stops) * 0.105);
  if (alpha <= 0.005) return;
  ctx.save();
  ctx.globalCompositeOperation = stops > 0 ? "screen" : "multiply";
  ctx.fillStyle = stops > 0 ? `rgba(255, 243, 220, ${alpha})` : `rgba(16, 20, 24, ${alpha})`;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawNoise(ctx, width, height, iso) {
  if (iso <= 200) return;
  const strength = Math.min(1, Math.log2(iso / 100) / 7);
  const count = Math.round((width * height * strength) / 1800);
  const chromaEvery = iso >= 1600 ? 4 : 10;
  const blotchCount = Math.round(12 * strength);
  let seed = (iso * 2654435761 + width * 97 + height * 193) >>> 0;

  ctx.save();
  ctx.globalCompositeOperation = "soft-light";
  for (let index = 0; index < blotchCount; index += 1) {
    seed = nextNoiseSeed(seed);
    const x = seed % width;
    seed = nextNoiseSeed(seed);
    const y = seed % height;
    seed = nextNoiseSeed(seed);
    const radius = (8 + (seed % 22)) * strength;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const alpha = 0.025 + strength * 0.035;
    gradient.addColorStop(0, index % 2 === 0 ? `rgba(255,120,90,${alpha})` : `rgba(70,170,255,${alpha})`);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  ctx.globalCompositeOperation = "overlay";
  for (let index = 0; index < count; index += 1) {
    seed = nextNoiseSeed(seed);
    const x = seed % width;
    seed = nextNoiseSeed(seed);
    const y = seed % height;
    const chroma = index % chromaEvery === 0;
    const alpha = chroma ? 0.12 * strength : 0.2 * strength;
    ctx.fillStyle = chroma ? randomChroma(index, alpha) : `rgba(255,255,255,${alpha})`;
    ctx.fillRect(x, y, iso >= 6400 ? 2 : 1, iso >= 6400 ? 2 : 1);
  }
  ctx.restore();
}

function applyIsoQualityLoss(ctx, width, height, iso) {
  if (iso < 800) return;
  const strength = Math.min(1, Math.log2(iso / 400) / 5);
  const snapshot = document.createElement("canvas");
  snapshot.width = width;
  snapshot.height = height;
  snapshot.getContext("2d").drawImage(ctx.canvas, 0, 0);

  ctx.save();
  ctx.globalAlpha = 0.06 + strength * 0.18;
  ctx.filter = `blur(${0.35 + strength * 1.15}px) saturate(${1 - strength * 0.16}) contrast(${1 - strength * 0.08})`;
  ctx.drawImage(snapshot, 0, 0);
  ctx.filter = "none";
  ctx.globalAlpha = strength * 0.09;
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgba(32, 28, 24, 1)";
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function nextNoiseSeed(seed) {
  return (seed * 1664525 + 1013904223) >>> 0;
}

function randomChroma(index, alpha) {
  if (index % 3 === 0) return `rgba(255,70,80,${alpha})`;
  if (index % 3 === 1) return `rgba(70,180,255,${alpha})`;
  return `rgba(80,255,150,${alpha})`;
}

function drawFocusMark(ctx, width, height) {
  const x = scene.focusPoint.x * width;
  const y = scene.focusPoint.y * height;
  const size = Math.min(width, height) * 0.045;
  ctx.save();
  ctx.strokeStyle = "rgba(255, 190, 114, 0.82)";
  ctx.lineWidth = Math.max(1, width / 900);
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x - size * 0.4, y);
  ctx.moveTo(x + size * 0.4, y);
  ctx.lineTo(x + size, y);
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y - size * 0.4);
  ctx.moveTo(x, y + size * 0.4);
  ctx.lineTo(x, y + size);
  ctx.stroke();
  ctx.restore();
}

function getDepthBlur(aperture) {
  const openness = clamp((16 - aperture) / 14.6, 0, 1);
  return {
    background: Math.round(openness * 10),
    foreground: Math.round(openness * 4),
    subject: aperture <= 1.8 ? 0.5 : 0
  };
}

function metricMarkup(label, value) {
  return `<div class="photo-lab-metric"><span>${label}</span><strong>${value}</strong></div>`;
}

function setDialAngle(element, values, selectedValue, startAngle, sweepAngle) {
  if (!element || values.length < 2) return;
  const index = Math.max(0, values.indexOf(selectedValue));
  const angle = startAngle + (sweepAngle * index) / (values.length - 1);
  element.style.setProperty("--selected-angle", `${angle + 180}deg`);
}

function dialStyle(index, total, startAngle, sweepAngle) {
  const angle = total < 2 ? 0 : startAngle + (sweepAngle * index) / (total - 1);
  return `--dial-angle:${angle}deg`;
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

function translateRisk(level) {
  if (level === "high") return "Eleve";
  if (level === "moderate") return "Modere";
  return "Faible";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

initPhotoLab();
