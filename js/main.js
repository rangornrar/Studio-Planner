(function () {
  if (window.__liteStarted) return;
  window.__liteStarted = true;
  if (typeof window.__liteLegacyInit === 'function') {
    window.__liteLegacyInit();
    if (window.LiteApp?.requestRender) window.LiteApp.requestRender(true);
  }
})();
