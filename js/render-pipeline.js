(function () {
  const app = window.LiteApp = window.LiteApp || {};
  const internals = window.__liteInternals;
  if (!internals) return;

  const state = internals.state;
  const refs = internals.refs;
  const runtime = app.renderRuntime = app.renderRuntime || {
    scheduled: false,
    width: 0,
    height: 0,
    dpr: 1,
    staticCache: new Map()
  };

  function currentViewport() {
    if (!runtime.width || !runtime.height) {
      const rect = refs.canvasWrap.getBoundingClientRect();
      runtime.width = Math.max(1, Math.floor(rect.width));
      runtime.height = Math.max(1, Math.floor(rect.height));
      runtime.dpr = Math.min(window.devicePixelRatio || 1, 2);
    }
    return runtime;
  }

  function cacheKey(parts) {
    return parts.join('|');
  }

  function getStaticCanvas(key, width, height, drawFn) {
    const existing = runtime.staticCache.get(key);
    if (existing) return existing;
    const offscreen = document.createElement('canvas');
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext('2d');
    drawFn(offCtx, width, height);
    runtime.staticCache.set(key, offscreen);
    if (runtime.staticCache.size > 18) {
      const oldest = runtime.staticCache.keys().next().value;
      runtime.staticCache.delete(oldest);
    }
    return offscreen;
  }

  app.invalidateStaticCaches = function invalidateStaticCaches() {
    runtime.staticCache.clear();
  };

  getSceneMetrics = function getSceneMetricsEnhanced(width = currentViewport().width, height = currentViewport().height) {
    const scale = Math.max(20, Math.min((width - 200) / state.studio.w, (height - 200) / state.studio.h));
    return {
      width,
      height,
      scale,
      centerX: width / 2 + state.panX,
      centerY: height / 2 + state.panY
    };
  };

  drawSetupView = function drawSetupViewEnhanced(targetCtx, width, height, metrics) {
    const resolvedMetrics = metrics || getSceneMetrics(width, height);
    const bg = targetCtx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, '#0b0f14');
    bg.addColorStop(1, '#06070a');
    targetCtx.fillStyle = bg;
    targetCtx.fillRect(0, 0, width, height);
    withStudioTransform(targetCtx, resolvedMetrics, () => {
      drawStudioBase(targetCtx, resolvedMetrics);
      if (state.display?.grid !== false) drawGrid(targetCtx, resolvedMetrics);
      if (state.display?.shadows !== false) drawStudioShadows(targetCtx, resolvedMetrics);
      if (state.display?.falloff !== false) getLightItems().forEach(light => drawLightFalloff(targetCtx, light, resolvedMetrics));
      if (state.showLightCones) getLightItems().forEach(light => drawLightCone(targetCtx, light, resolvedMetrics));
      if (state.display?.fov !== false) state.items.forEach(item => drawFovCone(targetCtx, item, resolvedMetrics));
      state.items.filter(item => !item.hidden).forEach(item => drawItemTopDown(targetCtx, item, resolvedMetrics));
    });
    drawMeasurementOverlay(targetCtx, resolvedMetrics);
    if (state.display?.labels !== false) drawItemLabels(targetCtx, resolvedMetrics);
    drawSelectionOverlay(targetCtx, resolvedMetrics);
    drawStudioMetrics(targetCtx, resolvedMetrics);
  };

  drawCameraView = function drawCameraViewEnhanced(targetCtx, width, height) {
    const backdropKey = cacheKey(['camera-bg', width, height, state.studio.type, state.studio.surface, state.backgroundOverride || '', getBackdropItem()?.background || '']);
    const backdropLayer = getStaticCanvas(backdropKey, width, height, offCtx => {
      drawBackdropForView(offCtx, width, height);
    });
    targetCtx.drawImage(backdropLayer, 0, 0);

    if (state.display?.falloff !== false) {
      getLightItems().forEach(light => {
        const point = getLightViewHeadPoint(light, width, height, Math.max(0.45, light.height - 0.04));
        const gradient = targetCtx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 190);
        gradient.addColorStop(0, getLightColor(light).replace(', 1)', ', 0.18)'));
        gradient.addColorStop(0.6, getLightColor(light).replace(', 1)', ', 0.05)'));
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        targetCtx.fillStyle = gradient;
        targetCtx.beginPath();
        targetCtx.arc(point.x, point.y, 190, 0, Math.PI * 2);
        targetCtx.fill();
      });
    }

    drawLightViewRigItems(targetCtx, width, height);
    const frameGradient = targetCtx.createLinearGradient(0, height * 0.56, 0, height);
    frameGradient.addColorStop(0, 'rgba(0,0,0,0)');
    frameGradient.addColorStop(1, 'rgba(0,0,0,0.18)');
    targetCtx.fillStyle = frameGradient;
    targetCtx.fillRect(0, 0, width, height);
    targetCtx.save();
    targetCtx.strokeStyle = 'rgba(255,255,255,0.14)';
    targetCtx.lineWidth = 1;
    targetCtx.setLineDash([7, 7]);
    for (let i = 1; i < 3; i += 1) {
      targetCtx.beginPath();
      targetCtx.moveTo(width * i / 3, 28);
      targetCtx.lineTo(width * i / 3, height - 28);
      targetCtx.stroke();
      targetCtx.beginPath();
      targetCtx.moveTo(28, height * i / 3);
      targetCtx.lineTo(width - 28, height * i / 3);
      targetCtx.stroke();
    }
    targetCtx.setLineDash([]);
    targetCtx.strokeRect(28, 28, width - 56, height - 56);
    targetCtx.restore();
    getSubjectItems().sort((a, b) => a.y - b.y).forEach(subject => {
      const projected = projectFrontal(subject, width, height);
      const lighting = computeLightingForSubject(subject);
      drawPersonFigure(targetCtx, projected.x, projected.y, subject.gender, projected.scale * 1.08, { lighting, pose: subject.pose });
    });
  };

  drawLightView = function drawLightViewEnhanced(targetCtx, width, height) {
    const backgroundKey = cacheKey(['light-bg', width, height]);
    const backgroundLayer = getStaticCanvas(backgroundKey, width, height, offCtx => {
      const wall = offCtx.createLinearGradient(0, 0, 0, height);
      wall.addColorStop(0, '#202732');
      wall.addColorStop(0.62, '#151b23');
      wall.addColorStop(0.63, '#0b1016');
      wall.addColorStop(1, '#07090d');
      offCtx.fillStyle = wall;
      offCtx.fillRect(0, 0, width, height);
      const floorGrad = offCtx.createLinearGradient(0, height * 0.62, 0, height);
      floorGrad.addColorStop(0, 'rgba(255,255,255,0.03)');
      floorGrad.addColorStop(1, 'rgba(0,0,0,0.18)');
      offCtx.fillStyle = floorGrad;
      offCtx.fillRect(0, height * 0.62, width, height * 0.38);
    });
    targetCtx.drawImage(backgroundLayer, 0, 0);
    if (state.display?.shadows !== false) drawBackgroundShadows(targetCtx, width, height);
    if (state.showLightCones) getLightItems().forEach(light => drawLightViewCone(targetCtx, light, width, height));
    drawLightViewRigItems(targetCtx, width, height);
    if (state.display?.falloff !== false) drawBeamLines(targetCtx, width, height);
    getSubjectItems().sort((a, b) => a.y - b.y).forEach(subject => {
      const projected = projectFrontal(subject, width, height);
      const lighting = computeLightingForSubject(subject);
      drawPersonFigure(targetCtx, projected.x, projected.y, subject.gender, projected.scale * 1.05, { lighting, pose: subject.pose });
    });
    drawLightBadges(targetCtx, width, height);
  };

  function drawNow() {
    const viewport = currentViewport();
    const width = viewport.width;
    const height = viewport.height;
    const dpr = viewport.dpr;
    refs.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    refs.ctx.clearRect(0, 0, width, height);
    renderScene(refs.ctx, width, height, state.view);
    renderPropertyPanel();
    renderTips();
    syncToolButtons();
    runtime.scheduled = false;
  }

  render = function renderEnhanced(force = false) {
    if (force) {
      drawNow();
      return;
    }
    if (runtime.scheduled) return;
    runtime.scheduled = true;
    window.requestAnimationFrame(drawNow);
  };

  app.requestRender = render;

  resizeCanvas = function resizeCanvasEnhanced() {
    const rect = refs.canvasWrap.getBoundingClientRect();
    runtime.width = Math.max(1, Math.floor(rect.width));
    runtime.height = Math.max(1, Math.floor(rect.height));
    runtime.dpr = Math.min(window.devicePixelRatio || 1, 2);
    refs.canvas.width = Math.max(1, Math.round(runtime.width * runtime.dpr));
    refs.canvas.height = Math.max(1, Math.round(runtime.height * runtime.dpr));
    refs.canvas.style.width = runtime.width + 'px';
    refs.canvas.style.height = runtime.height + 'px';
    app.invalidateStaticCaches();
    render(true);
  };
})();
