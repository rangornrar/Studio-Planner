(function () {
  const app = window.LiteApp = window.LiteApp || {};
  const internals = window.__liteInternals;
  if (!internals) return;

  const state = internals.state;
  const refs = internals.refs;
  const displayButtons = [
    { id: 'gridDisplayBtn', flag: 'grid', label: 'Grille', title: 'Afficher ou masquer la grille' },
    { id: 'falloffDisplayBtn', flag: 'falloff', label: 'Halos', title: 'Afficher ou masquer les halos et contributions' },
    { id: 'shadowDisplayBtn', flag: 'shadows', label: 'Ombres', title: 'Afficher ou masquer les ombres' },
    { id: 'labelDisplayBtn', flag: 'labels', label: 'Labels', title: 'Afficher ou masquer les labels' },
    { id: 'fovDisplayBtn', flag: 'fov', label: 'FOV', title: 'Afficher ou masquer les angles de vue' }
  ];

  function ensureToolbarButtons() {
    const toolbar = document.querySelector('.view-tools');
    const snapSelect = document.getElementById('snapSelect');
    if (!toolbar || !snapSelect) return;
    displayButtons.forEach(config => {
      if (document.getElementById(config.id)) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.id = config.id;
      button.className = 'toolbar-btn display-btn';
      button.dataset.displayFlag = config.flag;
      button.title = config.title;
      button.textContent = config.label;
      toolbar.insertBefore(button, snapSelect);
    });
  }

  const originalSyncToolButtons = syncToolButtons;
  syncToolButtons = function syncToolButtonsEnhanced() {
    if (typeof originalSyncToolButtons === 'function') originalSyncToolButtons();
    if (!state.display) return;
    displayButtons.forEach(config => {
      const button = document.getElementById(config.id);
      if (button) button.classList.toggle('active', state.display[config.flag] !== false);
    });
  };

  const originalRenderPropertyPanel = renderPropertyPanel;
  renderPropertyPanel = function renderPropertyPanelEnhanced() {
    originalRenderPropertyPanel();
    const item = getSelectedItem();
    if (!item) return;
    refs.propertyPanelEl.querySelectorAll('.field').forEach(field => {
      const range = field.querySelector('input[type="range"][data-prop]');
      if (!range || field.querySelector('.field-controls')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'field-controls';
      range.parentNode.insertBefore(wrapper, range);
      wrapper.appendChild(range);
      const numeric = document.createElement('input');
      numeric.type = 'number';
      numeric.className = 'numeric-input';
      numeric.min = range.min;
      numeric.max = range.max;
      numeric.step = range.step;
      numeric.value = range.value;
      numeric.dataset.prop = range.dataset.prop;
      wrapper.appendChild(numeric);
      range.addEventListener('input', () => {
        numeric.value = range.value;
      });
      numeric.addEventListener('input', () => {
        range.value = numeric.value;
        range.dispatchEvent(new Event('input', { bubbles: true }));
      });
      numeric.addEventListener('change', () => {
        range.value = numeric.value;
        range.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  };

  renderTips = function renderTipsEnhanced() {
    const preset = getCurrentPreset();
    const exposure = estimateExposure();
    const selected = getSelectedItem();
    const first = state.items.find(item => item.id === state.measure.firstId);
    const second = state.items.find(item => item.id === state.measure.secondId);
    const distance = first && second ? Math.hypot(first.x - second.x, first.y - second.y).toFixed(2) + ' m' : 'Cliquez deux items';
    const displayState = state.display || {};
    refs.tipsBarEl.innerHTML = `
      <div class="tip-card">
        <div class="tip-title"><span>Preset & scène</span><span class="badge">${preset ? preset.category : 'Libre'}</span></div>
        <div class="tip-row"><strong>${preset ? preset.name : 'Plateau en construction'}</strong><span>${preset?.tips.eclairage || 'Ajoutez un sujet et une ou plusieurs sources pour obtenir une fiche d’éclairage plus détaillée.'}</span></div>
        <div class="quick-inline">
          <span class="badge">${state.studio.type === 'outdoor' ? 'Outdoor' : 'Indoor'}</span>
          <span class="badge">${getSurfaceLabel(state.studio.surface)}</span>
          <span class="badge">${state.items.length} items</span>
        </div>
      </div>
      <div class="tip-card">
        <div class="tip-title"><span>Light Meter</span><span class="badge">EV ${exposure.ev.toFixed(1)}</span></div>
        <div class="tip-row"><strong>Réglages suggérés</strong><span>ISO ${preset?.settings.iso || exposure.iso} • ${preset?.settings.aperture || exposure.aperture} • ${preset?.settings.speed || exposure.speed} • ${preset?.settings.focal || '50mm'}</span></div>
        <div class="tip-row"><strong>Ratio key / fill</strong><span>${exposure.ratio}</span></div>
        <div class="tip-row"><strong>Température mixte</strong><span>${exposure.avgTemp || 5600} K • key ${exposure.keyModifier || '-'}</span></div>
        <div class="tip-row"><strong>Distance clé</strong><span>${exposure.keyDistance || '-'}</span></div>
        <div class="meter"><div class="meter-fill" style="width:${(exposure.level * 100).toFixed(1)}%"></div></div>
      </div>
      <div class="tip-card">
        <div class="tip-title"><span>Contrôle scène</span><span class="badge">${state.measure.active ? 'Mesure active' : state.tool}</span></div>
        <div class="tip-row"><strong>Sélection</strong><span>${selected ? selected.name + ' • ' + selected.x.toFixed(2) + ' / ' + selected.y.toFixed(2) + ' m' : 'Aucun élément sélectionné'}</span></div>
        <div class="tip-row"><strong>Distance</strong><span>${distance}</span></div>
        <div class="tip-row"><strong>Affichages</strong><span>${displayState.grid !== false ? 'Grille' : ''}${displayState.falloff !== false ? ' • Halos' : ''}${displayState.shadows !== false ? ' • Ombres' : ''}${displayState.labels !== false ? ' • Labels' : ''}${displayState.fov !== false ? ' • FOV' : ''}${state.showLightCones ? ' • Cônes' : ''}</span></div>
        <div class="tip-row"><strong>Interactions</strong><span>Alt + drag pour pan, molette centrée curseur pour zoom, poignée orange pour rotation.</span></div>
      </div>
    `;
  };

  const originalSyncUI = syncUI;
  syncUI = function syncUIEnhanced() {
    ensureToolbarButtons();
    if (typeof originalSyncUI === 'function') originalSyncUI();
    syncToolButtons();
  };

  ensureToolbarButtons();
})();
