(function () {
  const app = window.LiteApp = window.LiteApp || {};
  const internals = window.__liteInternals;
  if (!internals) return;

  const state = internals.state;
  const refs = internals.refs;

  bindEvents = function bindEventsEnhanced() {
    if (app.eventsBound) return;
    app.eventsBound = true;

    window.addEventListener('resize', resizeCanvas);
    refs.canvas.addEventListener('wheel', handleWheel, { passive: false });
    refs.canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('keydown', handleKeyDown);
    refs.canvas.addEventListener('dblclick', () => {
      const panel = refs.propertyPanelEl.querySelector('input[data-prop]');
      if (panel) panel.focus();
    });

    refs.canvasWrap.addEventListener('dragover', event => {
      event.preventDefault();
      refs.canvasWrap.classList.add('drag-over');
    });
    refs.canvasWrap.addEventListener('dragleave', () => refs.canvasWrap.classList.remove('drag-over'));
    refs.canvasWrap.addEventListener('drop', event => {
      event.preventDefault();
      refs.canvasWrap.classList.remove('drag-over');
      const templateId = event.dataTransfer.getData('text/plain');
      if (!templateId) return;
      const pointer = getPointerPosition(event);
      const world = screenToWorld(pointer.x, pointer.y);
      addTemplateToScene(templateId, world.x, world.y);
    });

    refs.sidebarTabsEl.addEventListener('click', event => {
      const button = event.target.closest('[data-sidebar-tab]');
      if (!button) return;
      state.sidebarTab = button.dataset.sidebarTab;
      renderSidebarTabs();
      renderSidebarContent();
    });

    refs.sidebarContentEl.addEventListener('click', event => {
      const button = event.target.closest('[data-add-template]');
      if (button) addTemplateToScene(button.dataset.addTemplate);
    });
    refs.sidebarContentEl.addEventListener('dragstart', event => {
      const card = event.target.closest('[data-template-id]');
      if (!card) return;
      event.dataTransfer.setData('text/plain', card.dataset.templateId);
    });

    document.getElementById('viewTabs').addEventListener('click', event => {
      const button = event.target.closest('[data-view]');
      if (!button) return;
      app.actions.setView(button.dataset.view);
    });

    document.body.addEventListener('click', event => {
      if (event.target.closest('.menu-actions [data-action]')) {
        event.preventDefault();
        app.actions.handleAction(event.target.closest('[data-action]').dataset.action);
        return;
      }
      if (event.target.closest('[data-close-modal]') || event.target === refs.checklistModalEl) {
        closeChecklist();
      }
    });

    refs.presetMenuEl.addEventListener('mouseover', event => {
      const button = event.target.closest('[data-preset]');
      if (button) showPresetPreview(button.dataset.preset, event);
    });
    refs.presetMenuEl.addEventListener('mousemove', event => {
      const button = event.target.closest('[data-preset]');
      if (button) showPresetPreview(button.dataset.preset, event);
    });
    refs.presetMenuEl.addEventListener('mouseout', hidePresetPreviewSoon);
    refs.presetPreviewEl.addEventListener('mouseenter', () => clearTimeout(previewHideTimer));
    refs.presetPreviewEl.addEventListener('mouseleave', hidePresetPreviewSoon);

    document.getElementById('checkAllBtn').addEventListener('click', checkAll);
    document.getElementById('uncheckAllBtn').addEventListener('click', uncheckAll);
    refs.checklistBodyEl.addEventListener('change', event => {
      const checkbox = event.target.closest('[data-check]');
      if (checkbox) toggleCheck(checkbox.dataset.check, checkbox.checked);
    });

    document.getElementById('selectToolBtn').addEventListener('click', () => app.actions.setTool('select'));
    document.getElementById('rotateToolBtn').addEventListener('click', () => app.actions.setTool('rotate'));
    document.getElementById('measureToolBtn').addEventListener('click', () => app.actions.toggleMeasure());
    document.getElementById('lightConesBtn').addEventListener('click', () => app.actions.toggleLightCones());

    document.querySelectorAll('[data-display-flag]').forEach(button => {
      button.addEventListener('click', () => app.actions.toggleDisplayFlag(button.dataset.displayFlag));
    });

    document.getElementById('snapSelect').addEventListener('change', event => {
      app.actions.setGridSnap(event.target.value);
    });
    document.getElementById('textureSelect').addEventListener('change', event => {
      app.actions.setSurface(event.target.value);
    });

    const presetQuickSelect = document.getElementById('presetQuickSelect');
    if (presetQuickSelect) {
      presetQuickSelect.addEventListener('change', event => {
        if (event.target.value) app.actions.applyPreset(event.target.value);
      });
    }

    refs.loadJsonInputEl.addEventListener('change', async event => {
      const file = event.target.files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        app.actions.importJsonObject(JSON.parse(text));
      } catch (error) {
        console.error(error);
        notify('JSON invalide');
      }
      refs.loadJsonInputEl.value = '';
    });
  };
})();
