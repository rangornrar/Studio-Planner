(function () {
  const app = window.LiteApp = window.LiteApp || {};
  const internals = window.__liteInternals;
  if (!internals) return;

  const state = internals.state;
  const HISTORY_LIMIT = 120;
  const SNAPSHOT_VERSION = 2;

  function defaultDisplay() {
    return {
      grid: true,
      falloff: true,
      shadows: true,
      labels: true,
      fov: true
    };
  }

  function ensureDisplayState() {
    state.display = { ...defaultDisplay(), ...(state.display || {}) };
    return state.display;
  }

  function cloneItems(items) {
    return (items || []).map(item => ({ ...item }));
  }

  function computeSnapshotHash(snapshot) {
    return JSON.stringify(snapshot);
  }

  function normalizeStudioShape(studio) {
    return {
      w: clamp(Number(studio?.w) || 8, 2, 30),
      h: clamp(Number(studio?.h) || 8, 2, 30),
      type: studio?.type === 'outdoor' ? 'outdoor' : 'indoor',
      surface: SURFACE_PALETTE_LOOKUP[studio?.surface] ? studio.surface : (state.studio.surface || 'concrete')
    };
  }

  function normalizeSnapshotItem(item) {
    const normalized = normalizeItem(item || {});
    normalized.hidden = !!item?.hidden;
    normalized.locked = !!item?.locked;
    normalized.groupId = item?.groupId || null;
    return normalized;
  }

  function scaleCoordinate(value, fromMax, toMax) {
    if (!Number.isFinite(value)) return toMax / 2;
    if (!fromMax) return value;
    return (value / fromMax) * toMax;
  }

  function adaptItemsToStudio(items, fromStudio, toStudio) {
    return cloneItems(items).map(item => {
      const scaled = normalizeSnapshotItem({
        ...item,
        x: scaleCoordinate(item.x, fromStudio.w, toStudio.w),
        y: scaleCoordinate(item.y, fromStudio.h, toStudio.h)
      });
      clampItemToStudio(scaled);
      return scaled;
    });
  }

  function validateSnapshot(payload) {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Snapshot invalide');
    }

    const studio = normalizeStudioShape(payload.studio || state.studio);
    const items = Array.isArray(payload.items) ? payload.items.map(normalizeSnapshotItem) : [];

    return {
      __schemaVersion: Number(payload.__schemaVersion) || 1,
      view: VIEWS.some(view => view.id === payload.view) ? payload.view : 'setup',
      tool: payload.tool === 'rotate' ? 'rotate' : 'select',
      zoom: clamp(Number(payload.zoom) || 1, 0.2, 4),
      panX: Number(payload.panX) || 0,
      panY: Number(payload.panY) || 0,
      studio,
      items,
      selected: typeof payload.selected === 'string' ? payload.selected : null,
      preset: typeof payload.preset === 'string' ? payload.preset : null,
      sidebarTab: typeof payload.sidebarTab === 'string' ? payload.sidebarTab : state.sidebarTab,
      notes: typeof payload.notes === 'string' ? payload.notes : '',
      gridSnap: [0, 0.25, 0.5].includes(Number(payload.gridSnap)) ? Number(payload.gridSnap) : 0.5,
      showLightCones: payload.showLightCones !== false,
      measure: {
        active: !!payload.measure?.active,
        firstId: typeof payload.measure?.firstId === 'string' ? payload.measure.firstId : null,
        secondId: typeof payload.measure?.secondId === 'string' ? payload.measure.secondId : null
      },
      checklist: payload.checklist && typeof payload.checklist === 'object' ? { ...payload.checklist } : {},
      backgroundOverride: typeof payload.backgroundOverride === 'string' ? payload.backgroundOverride : null,
      display: { ...defaultDisplay(), ...(payload.display || {}) }
    };
  }

  const originalNormalizeItem = normalizeItem;
  normalizeItem = function patchedNormalizeItem(item) {
    const normalized = originalNormalizeItem(item);
    normalized.hidden = !!item?.hidden;
    normalized.locked = !!item?.locked;
    normalized.groupId = item?.groupId || null;
    return normalized;
  };

  serializeState = function serializeStateEnhanced() {
    ensureDisplayState();
    return {
      __schemaVersion: SNAPSHOT_VERSION,
      view: state.view,
      tool: state.tool,
      zoom: state.zoom,
      panX: state.panX,
      panY: state.panY,
      studio: { ...state.studio },
      items: state.items.map(item => ({ ...item })),
      selected: state.selected,
      preset: state.preset,
      sidebarTab: state.sidebarTab,
      notes: state.notes,
      gridSnap: state.gridSnap,
      showLightCones: state.showLightCones,
      measure: { ...state.measure },
      checklist: { ...state.checklist },
      backgroundOverride: state.backgroundOverride,
      display: { ...state.display }
    };
  };

  restoreSnapshot = function restoreSnapshotEnhanced(snapshot) {
    const validated = validateSnapshot(snapshot);
    state.view = validated.view;
    state.tool = validated.tool;
    state.zoom = validated.zoom;
    state.panX = validated.panX;
    state.panY = validated.panY;
    state.studio = { ...validated.studio };
    state.items = validated.items.map(item => {
      const normalized = normalizeSnapshotItem(item);
      clampItemToStudio(normalized);
      return normalized;
    });
    state.selected = state.items.some(item => item.id === validated.selected) ? validated.selected : null;
    state.preset = validated.preset;
    state.sidebarTab = validated.sidebarTab;
    state.notes = validated.notes;
    state.gridSnap = validated.gridSnap;
    state.showLightCones = validated.showLightCones;
    state.measure = { ...validated.measure };
    state.checklist = { ...validated.checklist };
    state.backgroundOverride = validated.backgroundOverride;
    state.display = { ...validated.display };
  };

  app.store = app.store || {};
  app.store.snapshotVersion = SNAPSHOT_VERSION;
  app.store.historyLimit = HISTORY_LIMIT;
  app.store.ensureDisplayState = ensureDisplayState;
  app.store.adaptItemsToStudio = adaptItemsToStudio;
  app.store.validateSnapshot = validateSnapshot;

  function updateHistoryHash() {
    const current = state.history[state.historyIndex];
    app.store.lastHistoryHash = current ? computeSnapshotHash(current) : null;
  }

  commitHistory = function commitHistoryEnhanced(label, options = {}) {
    const snapshot = serializeState();
    const hash = computeSnapshotHash(snapshot);
    if (app.store.lastHistoryHash === hash) {
      return;
    }
    state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push(snapshot);
    if (state.history.length > HISTORY_LIMIT) {
      state.history = state.history.slice(state.history.length - HISTORY_LIMIT);
    }
    state.historyIndex = state.history.length - 1;
    app.store.lastHistoryHash = hash;
    syncUI();
    saveLocalState(false);
    if (label && !options.silent) notify(label);
  };

  undo = function undoEnhanced() {
    if (state.historyIndex <= 0) return;
    state.historyIndex -= 1;
    restoreSnapshot(state.history[state.historyIndex]);
    updateHistoryHash();
    syncUI();
    render();
  };

  redo = function redoEnhanced() {
    if (state.historyIndex >= state.history.length - 1) return;
    state.historyIndex += 1;
    restoreSnapshot(state.history[state.historyIndex]);
    updateHistoryHash();
    syncUI();
    render();
  };

  saveLocalState = function saveLocalStateEnhanced(withToast = true) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(serializeState()));
    if (withToast) notify('Auto-save enregistré');
  };

  loadLocalState = function loadLocalStateEnhanced() {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) {
      notify('Aucun auto-save trouvé');
      return;
    }
    try {
      restoreSnapshot(JSON.parse(raw));
      commitHistory('Auto-save restauré');
      syncUI();
      render();
    } catch (error) {
      console.error(error);
      notify('Auto-save invalide');
    }
  };

  function resolvePresetItemsForStudio(preset, studio) {
    const sourceStudio = { w: 8, h: 8 };
    const baseItems = resolvePresetItems(preset);
    return adaptItemsToStudio(baseItems, sourceStudio, studio);
  }

  function getLightModifierGain(light) {
    const family = getLightConeFamily(light);
    const gains = {
      octobox: 1.12,
      softbox: 1.04,
      'beauty-dish': 1.2,
      parabolic: 1.28,
      reflector: 1.1,
      snoot: 0.72,
      grid: 0.84,
      'ring-flash': 0.95,
      'strip-box': 1,
      'barn-doors': 0.8,
      gel: 0.74,
      flag: 0.56,
      monolight: 1,
      generator: 1.1,
      'led-panel': 0.9,
      fresnel: 1.22,
      speedlight: 0.82,
      torch: 0.78,
      window: 1.18,
      sun: 1.6
    };
    return gains[family] || 1;
  }

  function getExposureTargets() {
    const subjects = getSubjectItems();
    if (subjects.length) return subjects.map(subject => ({ x: subject.x, y: subject.y, z: subject.height || 1.7 }));
    return [{ x: state.studio.w / 2, y: state.studio.h / 2, z: 1.6 }];
  }

  function getLightContribution(light, target) {
    const dx = target.x - light.x;
    const dy = target.y - light.y;
    const distance = Math.max(0.55, Math.hypot(dx, dy));
    const heading = degToRad(light.rotation || 0);
    const beam = Math.atan2(dy, dx);
    const delta = Math.abs(Math.atan2(Math.sin(beam - heading), Math.cos(beam - heading)));
    const cone = getLightConeAngle(light) || (Math.PI / 3);
    const coneFactor = delta <= cone / 2 ? 1 : clamp(1 - ((delta - cone / 2) / cone), 0.12, 0.92);
    const angleFactor = Math.pow(Math.max(0.18, Math.cos(delta)), 2) * coneFactor;
    const heightFactor = clamp((light.height || 1.6) / Math.max(1, target.z), 0.72, 1.18);
    const modifierGain = getLightModifierGain(light);
    const power = Math.max(0, light.power || 0);
    const intensity = (power * modifierGain * angleFactor * heightFactor * 3.4) / Math.max(0.7, distance * distance);
    return {
      light,
      distance,
      intensity,
      family: getLightConeFamily(light) || light.type
    };
  }

  estimateExposure = function estimateExposureEnhanced() {
    const lights = getLightItems();
    ensureDisplayState();
    if (!lights.length) {
      return {
        avgPower: 0,
        ev: 0,
        aperture: 'f/4',
        speed: '1/125',
        iso: 200,
        ratio: '1:1',
        level: 0.12,
        avgTemp: 5600,
        keyDistance: '-',
        keyModifier: '-'
      };
    }

    const targets = getExposureTargets();
    const perLight = lights.map(light => {
      const contributions = targets.map(target => getLightContribution(light, target));
      const total = contributions.reduce((sum, entry) => sum + entry.intensity, 0);
      const avgDistance = contributions.reduce((sum, entry) => sum + entry.distance, 0) / contributions.length;
      return {
        light,
        intensity: total / contributions.length,
        avgDistance,
        family: contributions[0]?.family || light.type
      };
    }).sort((a, b) => b.intensity - a.intensity);

    const avgPower = perLight.reduce((sum, entry) => sum + entry.intensity, 0);
    const key = perLight[0] || null;
    const fill = perLight[1] || null;
    const fillValue = fill ? fill.intensity : Math.max(0.1, avgPower * 0.45);
    const ratio = (Math.max(0.1, key ? key.intensity : avgPower) / Math.max(0.1, fillValue)).toFixed(1) + ':1';
    const avgTemp = Math.round(perLight.reduce((sum, entry) => sum + ((entry.light.colorTemp || 5600) * entry.intensity), 0) / Math.max(0.1, perLight.reduce((sum, entry) => sum + entry.intensity, 0)));
    const ev = 7.2 + Math.log2(Math.max(0.18, avgPower));
    const level = clamp(avgPower / 18, 0.06, 1);
    const apertureStops = ['f/1.8', 'f/2', 'f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11', 'f/16'];
    const aperture = apertureStops[Math.round(clamp(ev - 4.5, 0, apertureStops.length - 1))];
    const speeds = ['1/50', '1/80', '1/125', '1/160', '1/200', '1/250'];
    const speed = speeds[Math.round(clamp(ev - 5.2, 0, speeds.length - 1))];
    const iso = clamp(Math.round(100 * Math.pow(2, clamp(7.8 - ev, 0, 3))), 100, 800);

    return {
      avgPower,
      ev,
      aperture,
      speed,
      iso,
      ratio,
      level,
      avgTemp,
      keyDistance: key ? key.avgDistance.toFixed(2) + ' m' : '-',
      keyModifier: key ? key.family : '-'
    };
  };

  app.actions = app.actions || {};
  app.actions.ensureDisplayState = ensureDisplayState;
  app.actions.setView = function setView(viewId) {
    if (!VIEWS.some(view => view.id === viewId)) return;
    state.view = viewId;
    renderViewTabs();
    render();
  };
  app.actions.setTool = function setTool(toolId) {
    state.tool = toolId === 'rotate' ? 'rotate' : 'select';
    render();
  };
  app.actions.toggleMeasure = function toggleMeasure() {
    state.measure.active = !state.measure.active;
    if (!state.measure.active) {
      state.measure.firstId = null;
      state.measure.secondId = null;
    }
    render();
  };
  app.actions.toggleDisplayFlag = function toggleDisplayFlag(flag) {
    ensureDisplayState();
    if (!(flag in state.display)) return;
    state.display[flag] = !state.display[flag];
    saveLocalState(false);
    render();
  };
  app.actions.toggleLightCones = function toggleLightCones() {
    state.showLightCones = !state.showLightCones;
    saveLocalState(false);
    render();
  };
  app.actions.setGridSnap = function setGridSnap(value) {
    state.gridSnap = [0, 0.25, 0.5].includes(Number(value)) ? Number(value) : 0.5;
    saveLocalState(false);
  };
  app.actions.setSurface = function setSurface(surfaceKey) {
    if (!SURFACE_PALETTE_LOOKUP[surfaceKey]) return;
    state.studio.surface = surfaceKey;
    commitHistory('Palette ' + getSurfaceLabel(state.studio.surface));
    render();
  };
  app.actions.setStudioSize = function setStudioSizeAction(size, options = {}) {
    const targetStudio = {
      ...state.studio,
      w: size.w,
      h: size.h,
      type: size.type || state.studio.type
    };
    const previousStudio = { ...state.studio };
    state.studio = targetStudio;
    state.items = adaptItemsToStudio(state.items, previousStudio, targetStudio);
    commitHistory('Studio ' + size.label);
    render();
  };
  app.actions.applyPreset = function applyPresetAction(presetKey) {
    const preset = PRESETS.find(entry => entry.key === presetKey);
    if (!preset) return;
    const targetStudio = { ...state.studio };
    state.items = resolvePresetItemsForStudio(preset, targetStudio);
    state.selected = state.items[0]?.id || null;
    state.preset = preset.key;
    state.zoom = 1;
    state.panX = 0;
    state.panY = 0;
    state.measure.firstId = null;
    state.measure.secondId = null;
    state.backgroundOverride = null;
    state.checklist = {};
    ensureDisplayState();
    const textureSelect = document.getElementById('textureSelect');
    if (textureSelect) textureSelect.value = state.studio.surface;
    commitHistory('Preset appliqué : ' + preset.name);
    render();
  };
  app.actions.resetProject = function resetProjectAction() {
    const preservedStudio = { ...state.studio };
    state.items = [];
    state.selected = null;
    state.preset = null;
    state.notes = '';
    state.zoom = 1;
    state.panX = 0;
    state.panY = 0;
    state.studio = preservedStudio;
    state.measure = { active: false, firstId: null, secondId: null };
    state.checklist = {};
    ensureDisplayState();
    const textureSelect = document.getElementById('textureSelect');
    if (textureSelect) textureSelect.value = state.studio.surface;
    commitHistory('Nouveau plateau');
    render();
  };
  app.actions.importJsonObject = function importJsonObjectAction(payload) {
    restoreSnapshot(payload);
    commitHistory('JSON chargé');
    render();
  };
  app.actions.handleAction = function handleAction(action) {
    switch (action) {
      case 'new-project': app.actions.resetProject(); break;
      case 'save-json': saveJsonFile(); break;
      case 'load-json': internals.refs.loadJsonInputEl.click(); break;
      case 'restore-local': loadLocalState(); break;
      case 'export-png': exportPng(); break;
      case 'export-png-all': exportAllPngs(); break;
      case 'export-pdf': exportPdf(); break;
      case 'undo': undo(); break;
      case 'redo': redo(); break;
      case 'duplicate': duplicateSelected(); break;
      case 'delete': deleteSelected(); break;
      case 'save-local': saveLocalState(); break;
      default: break;
    }
  };

  applyPreset = app.actions.applyPreset;
  setStudioSize = app.actions.setStudioSize;
  resetProject = app.actions.resetProject;
  importJsonObject = app.actions.importJsonObject;
  handleMenuAction = app.actions.handleAction;

  ensureDisplayState();
})();
