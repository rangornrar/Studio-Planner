(function () {
  const app = window.LiteApp = window.LiteApp || {};

  function closeMenus() {
    document.querySelectorAll('[data-menu]').forEach(menu => menu.classList.remove('open'));
  }

  window.__menuBridgeToggle = function menuBridgeToggle(button, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (!button || !button.parentElement) return false;
    const menu = button.parentElement;
    const willOpen = !menu.classList.contains('open');
    closeMenus();
    if (willOpen) menu.classList.add('open');
    return false;
  };

  window.__menuBridgeAction = function menuBridgeAction(action, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (app.actions?.handleAction) app.actions.handleAction(action);
    closeMenus();
    return false;
  };

  window.__menuBridgePreset = function menuBridgePreset(presetKey, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (app.actions?.applyPreset) app.actions.applyPreset(presetKey);
    closeMenus();
    return false;
  };

  window.__menuBridgeStudio = function menuBridgeStudio(label, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const size = STUDIO_SIZES.find(entry => entry.label === label);
    if (size && app.actions?.setStudioSize) app.actions.setStudioSize(size);
    closeMenus();
    return false;
  };

  window.__menuBridgeTexture = function menuBridgeTexture(texture, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (app.actions?.setSurface) app.actions.setSurface(texture);
    closeMenus();
    return false;
  };

  window.__menuBridgeChecklist = function menuBridgeChecklist(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    openChecklist();
    closeMenus();
    return false;
  };

  document.addEventListener('click', event => {
    if (!event.target.closest('[data-menu]')) closeMenus();
  });
})();
