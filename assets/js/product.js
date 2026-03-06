window.SP_APP = window.SP_APP || {};

const STORAGE_KEYS = {
  projects: 'studioPlannerProjectsV10',
  templates: 'studioPlannerTemplatesV10',
  variants: 'studioPlannerVariantsV10',
  welcome: 'studioPlannerWelcomeSeenV10',
  draft: 'studioPlannerDraftV10'
};

function getProjectMeta(){
  return {
    name: document.getElementById('projectName')?.value?.trim() || 'Projet sans titre',
    client: document.getElementById('projectClient')?.value?.trim() || '',
    shootType: document.getElementById('projectShootType')?.value || 'Portrait',
    brand: document.getElementById('projectBrand')?.value?.trim() || '',
    notes: document.getElementById('projectNotes')?.value?.trim() || '',
    frameRatio: window.currentFrameRatio || '3:2',
    updatedAt: new Date().toISOString()
  };
}

function setProjectMeta(meta={}){
  const setVal=(id,val)=>{ const el=document.getElementById(id); if(el) el.value = val ?? ''; };
  setVal('projectName', meta.name || '');
  setVal('projectClient', meta.client || '');
  setVal('projectShootType', meta.shootType || 'Portrait');
  setVal('projectBrand', meta.brand || '');
  setVal('projectNotes', meta.notes || '');
  window.currentFrameRatio = meta.frameRatio || window.currentFrameRatio || '3:2';
  const frSel=document.getElementById('frameRatioSelect'); if(frSel) frSel.value = window.currentFrameRatio;
  updateProjectHubSummary();
  updateTopProjectBar();
}

function escapeHtml(str=''){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s] || s));
}

function getLocalCollection(key){ try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch(e){ return []; } }
function setLocalCollection(key, data){ localStorage.setItem(key, JSON.stringify(data)); }

function serializeCurrentProject(){
  return {
    meta: getProjectMeta(),
    room: {RW, RH, PPX, GS},
    canvas: cv.toJSON(['ctype','hasBeam','beamLen','lblIdx','bmIdx','isSO','_grid','_room','_legend','_beam','lightTemp','__uid','realW','realH','realD','heightCm','elevCm','subjectVariant','genderVariant','powerWs','locked','realEqKey','viewOverride','elevOverride','focalMm'])
  };
}

function applyLockState(obj){
  if(!obj) return;
  const locked = !!(obj.locked || obj.__locked);
  obj.__locked = locked;
  obj.lockMovementX = locked;
  obj.lockMovementY = locked;
  obj.lockRotation = locked;
  obj.lockScalingX = locked;
  obj.lockScalingY = locked;
  obj.hasControls = !locked;
  obj.hoverCursor = locked ? 'not-allowed' : 'move';
}

function restoreSerializedProject(payload){
  if(!payload) return;
  const room = payload.room || {};
  RW = room.RW || RW; RH = room.RH || RH; PPX = room.PPX || PPX; GS = room.GS || GS;
  const setVal=(id,val)=>{ const el=document.getElementById(id); if(el) el.value = val; };
  setVal('rW', RW); setVal('rH', RH); setVal('scP', PPX); setVal('grS', GS);
  setProjectMeta(payload.meta || {});
  cv.loadFromJSON(payload.canvas, ()=>{
    refs();
    cv.getObjects().forEach(applyLockState);
    fitCanvas();
    cv.requestRenderAll();
    buildLayers();
    if (camOpen) drawCam();
    updateProjectHub();
    updateTopProjectBar();
    toast('Projet chargé');
  });
}

function saveCurrentProject(){
  const payload = serializeCurrentProject();
  const all = getLocalCollection(STORAGE_KEYS.projects);
  const idx = all.findIndex(x => (x.meta?.name || '') === payload.meta.name);
  if (idx >= 0) all[idx] = payload; else all.unshift(payload);
  setLocalCollection(STORAGE_KEYS.projects, all.slice(0, 50));
  updateProjectHub();
  updateTopProjectBar();
  toast('Projet sauvegardé');
}

function saveCurrentTemplate(){
  const payload = serializeCurrentProject();
  payload.meta.template = true;
  const all = getLocalCollection(STORAGE_KEYS.templates);
  const idx = all.findIndex(x => (x.meta?.name || '') === payload.meta.name);
  if (idx >= 0) all[idx] = payload; else all.unshift(payload);
  setLocalCollection(STORAGE_KEYS.templates, all.slice(0, 50));
  updateProjectHub();
  toast('Template sauvegardé');
}

function saveShootTypeTemplate(){
  const payload = serializeCurrentProject();
  payload.meta.name = `Template ${payload.meta.shootType || 'Séance'} · ${new Date().toLocaleDateString('fr-FR')}`;
  payload.meta.template = true;
  const all = getLocalCollection(STORAGE_KEYS.templates);
  all.unshift(payload);
  setLocalCollection(STORAGE_KEYS.templates, all.slice(0,50));
  updateProjectHub();
  toast('Template de séance sauvegardé');
}

function saveCurrentVariant(){
  const payload = serializeCurrentProject();
  payload.meta.variantOf = getProjectMeta().name || 'Projet sans titre';
  payload.meta.variantLabel = `Variante ${new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}`;
  const all = getLocalCollection(STORAGE_KEYS.variants);
  all.unshift(payload);
  setLocalCollection(STORAGE_KEYS.variants, all.slice(0, 60));
  renderVariantList();
  toast('Variante sauvegardée');
}

function loadStoredVariant(index){
  const vars = getLocalCollection(STORAGE_KEYS.variants).filter(v => (v.meta?.variantOf || '') === (getProjectMeta().name || ''));
  if (!vars[index]) return;
  restoreSerializedProject(vars[index]);
}

function loadStoredItem(kind,index){
  const key = kind === 'template' ? STORAGE_KEYS.templates : STORAGE_KEYS.projects;
  const data = getLocalCollection(key);
  if (!data[index]) return;
  restoreSerializedProject(data[index]);
  closeProjectHub();
}

function deleteStoredItem(kind,index){
  const key = kind === 'template' ? STORAGE_KEYS.templates : STORAGE_KEYS.projects;
  const data = getLocalCollection(key);
  data.splice(index,1);
  setLocalCollection(key, data);
  updateProjectHub();
}

function openProjectHub(){ document.getElementById('projModal')?.classList.add('open'); updateProjectHub(); }
function closeProjectHub(){ document.getElementById('projModal')?.classList.remove('open'); }

function updateProjectHubSummary(){
  const m = getProjectMeta();
  const objs = cv.getObjects().filter(o=>o.isSO || o.ctype==='note' || o.ctype==='measure');
  const lights = objs.filter(o=>o.ctype==='light').length;
  const mods = objs.filter(o=>o.ctype==='modifier').length;
  const subs = objs.filter(o=>o.ctype==='subject').length;
  const el = document.getElementById('projectHubSummary');
  if (el) el.textContent = `${m.name} · ${m.shootType}${m.client ? ` · Client : ${m.client}` : ''} · ${subs} sujet(s), ${lights} lumière(s), ${mods} modificateur(s)`;
}

function renderVariantList(){
  const el=document.getElementById('variantList'); if(!el) return;
  const vars = getLocalCollection(STORAGE_KEYS.variants).filter(v => (v.meta?.variantOf || '') === (getProjectMeta().name || ''));
  el.innerHTML = vars.length ? vars.map((v,i)=>`<div class="proj-item"><div><strong>${escapeHtml(v.meta?.variantLabel || ('Variante '+(i+1)))}</strong><span>${new Date(v.meta?.updatedAt || Date.now()).toLocaleString('fr-FR')}</span></div><div class="proj-actions"><button class="small-btn b-blue" onclick="loadStoredVariant(${i});closeProjectHub();">Charger</button></div></div>`).join('') : '<div class="muted">Aucune variante pour ce projet.</div>';
}

function updateProjectHub(){
  const projectList=document.getElementById('projectList');
  const templateList=document.getElementById('templateList');
  if(projectList){
    const projects=getLocalCollection(STORAGE_KEYS.projects);
    projectList.innerHTML = projects.length ? projects.map((p,i)=>`<div class="proj-item"><div><strong>${escapeHtml(p.meta?.name || 'Projet')}</strong><span>${escapeHtml(p.meta?.shootType || '')}${p.meta?.client ? ` · ${escapeHtml(p.meta.client)}`:''}<br>${new Date(p.meta?.updatedAt || Date.now()).toLocaleString('fr-FR')}</span></div><div class="proj-actions"><button class="small-btn b-blue" onclick="loadStoredItem('project',${i})">Ouvrir</button><button class="small-btn b-red" onclick="deleteStoredItem('project',${i})">Suppr.</button></div></div>`).join('') : '<div class="muted">Aucun projet sauvegardé.</div>';
  }
  if(templateList){
    const templates=getLocalCollection(STORAGE_KEYS.templates);
    templateList.innerHTML = templates.length ? templates.map((p,i)=>`<div class="proj-item"><div><strong>${escapeHtml(p.meta?.name || 'Template')}</strong><span>${escapeHtml(p.meta?.shootType || '')}<br>${new Date(p.meta?.updatedAt || Date.now()).toLocaleString('fr-FR')}</span></div><div class="proj-actions"><button class="small-btn b-blue" onclick="loadStoredItem('template',${i})">Charger</button><button class="small-btn b-red" onclick="deleteStoredItem('template',${i})">Suppr.</button></div></div>`).join('') : '<div class="muted">Aucun template sauvegardé.</div>';
  }
  updateProjectHubSummary();
  renderVariantList();
  if(document.getElementById('projectHubAudit')) renderAuditModal();
}

function collectEquipmentSummary(){
  const counts={};
  cv.getObjects().filter(o=>o.isSO).forEach(o=>{
    const n=getLbl(o)+(o.lightTemp?` (${o.lightTemp.split('–')[0].trim()})`:'' );
    counts[n]=(counts[n]||0)+1;
  });
  return Object.entries(counts).sort((a,b)=>a[0].localeCompare(b[0],'fr'));
}

function collectExecutiveSummary(){
  const objs=cv.getObjects().filter(o=>o.isSO);
  return `${objs.filter(o=>o.ctype==='subject').length} sujet(s), ${objs.filter(o=>o.ctype==='light').length} source(s), ${objs.filter(o=>o.ctype==='modifier').length} modificateur(s), ${objs.filter(o=>o.ctype==='camera').length} caméra(s). Grille ${GS} cm, échelle ${PPX}px / 10 cm.`;
}

// premium enhancements
(function(){
  window.currentFrameRatio = window.currentFrameRatio || '3:2';

  function getSceneBlockers(){ return cv.getObjects().filter(o => o.visible !== false && ['modifier','background'].includes(o.ctype)); }
  function pointSegmentDistance(px,py,x1,y1,x2,y2){ const dx=x2-x1, dy=y2-y1; const len2=dx*dx+dy*dy||1; let t=((px-x1)*dx+(py-y1)*dy)/len2; t=Math.max(0,Math.min(1,t)); const sx=x1+t*dx, sy=y1+t*dy; return {dist:Math.hypot(px-sx,py-sy), t}; }
  function blockerRadiusCm(o){ const w=o.realW||o.widthCm||px2cm(o.getScaledWidth?.()||40), h=o.realH||o.heightCm||px2cm(o.getScaledHeight?.()||40); return Math.max(20,Math.max(w,h)*0.45); }
  function blockerFactor(o){ const name=(getLbl(o)||'').toLowerCase(); if(name.includes('diffusion')||name.includes('scrim')) return 0.72; if(name.includes('réflecteur')) return 0.92; if(name.includes('v-flat')||name.includes('drapeau')||name.includes('flag')||o.ctype==='background') return 0.28; return 0.55; }
  function occlusionFactor(light,subject){ let factor=1; const x1=light.left,y1=light.top,x2=subject.left,y2=subject.top; getSceneBlockers().forEach(o=>{ if(o===light||o===subject) return; const rpx=cm2px(blockerRadiusCm(o)); const hit=pointSegmentDistance(o.left,o.top,x1,y1,x2,y2); if(hit.t>0.12 && hit.t<0.9 && hit.dist<rpx) factor*=blockerFactor(o); }); return Math.max(0.12,factor); }

  window.computeSubjectLighting = function(subject, lights){
    const visible = getLightDebugSet(lights).map(light=>{
      const distCm=Math.max(20,px2cm(Math.hypot(subject.left-light.left, subject.top-light.top)));
      const powerWs=Math.max(20,+light.powerWs||300);
      const powerStops=+(Math.log2(powerWs/100)).toFixed(1);
      const beamLen=px2cm(light.beamLen||cm2px(120));
      const prof=getLightEmissionProfile(light);
      const beamSpread=Math.max(18, Math.min(75, beamLen/4)) * prof.beamBonus;
      const toSub=Math.atan2(subject.top-light.top, subject.left-light.left);
      const aim=deg2rad(light.angle||0);
      const delta=Math.abs(Math.atan2(Math.sin(toSub-aim), Math.cos(toSub-aim)));
      const angleFactor=Math.max(0, 1-delta/deg2rad(beamSpread));
      const feather=Math.pow(angleFactor, prof.featherPow);
      const occ=(typeof occlusionFactor==='function')?occlusionFactor(light,subject):1;
      const base=(powerWs*42)/(distCm*distCm);
      const intensity=clamp(base*feather*occ*prof.softness, 0, 1.7);
      return {light, distCm, intensity, delta, powerStops, beamSpread};
    }).filter(x=>x.intensity>0.01).sort((a,b)=>b.intensity-a.intensity);
    const active = VIEW_STATE.dominantOnly ? visible.slice(0,1) : visible;
    const zones={left:0.08,right:0.08,top:0.03,rim:0,background:0}; let dominant=''; let dominantStops='';
    const colorAcc={r:0,g:0,b:0,n:0}; let rimSide='right';
    active.forEach(({light,intensity,powerStops}, idx)=>{
      if(idx===0){ dominant=getLbl(light); dominantStops=powerStops; }
      const relX=light.left-subject.left, relY=light.top-subject.top;
      if(relX<-10) zones.left += intensity*1.06; if(relX>10) zones.right += intensity*1.06;
      if(Math.abs(relX)<=25){ zones.left += intensity*0.35; zones.right += intensity*0.35; }
      if(relY<-10) zones.top += intensity*0.88;
      if(Math.abs(relX)>35){ zones.rim += intensity*0.62; rimSide = relX<0 ? 'left' : 'right'; }
      if(relX>20 || relX<-20) zones.background += intensity*0.45;
      const tc=getTempRGB(light.lightTemp||'5500K'); colorAcc.r+=tc.r*intensity; colorAcc.g+=tc.g*intensity; colorAcc.b+=tc.b*intensity; colorAcc.n+=intensity;
    });
    const color=colorAcc.n>0?{r:Math.round(colorAcc.r/colorAcc.n),g:Math.round(colorAcc.g/colorAcc.n),b:Math.round(colorAcc.b/colorAcc.n)}:{r:200,g:215,b:255};
    return {leftIntensity:zones.left,rightIntensity:zones.right,topIntensity:zones.top,rimIntensity:zones.rim,backgroundIntensity:zones.background,color,dominantLabel:dominant,dominantStops, rimSide};
  };

  // ensure controls exist after UI install
  const oldInstall = window.install;
  setTimeout(()=>{ addViewQualitySection(); }, 120);
})();

function applyStudioMode(mode){
  if(!window.VIEW_STATE) window.VIEW_STATE={};
  VIEW_STATE.studioMode = mode || 'tech';
  const client = VIEW_STATE.studioMode === 'client';
  if(typeof gridO !== 'undefined') (gridO||[]).forEach(g=>g.visible=!client);
  cv.getObjects().forEach(o=>{
    if(o._legend) o.visible=!client;
    if(o===roomL) o.visible=!client;
    if(o.ctype==='note' || o.ctype==='measure') o.visible=!client;
    if(o._objects && Array.isArray(o._objects)){
      o._objects.forEach(child=>{
        if(child && (child.type==='text' || child.type==='i-text')) child.visible=!client;
      });
      if(typeof o.addWithUpdate==='function') o.addWithUpdate();
    }
  });
  cv.requestRenderAll();
}

function refreshLightDebugOptions(){
  const sel=document.getElementById('debugLightSelect');
  if(!sel) return;
  const lights=cv.getObjects().filter(o=>o.ctype==='light'&&o.visible!==false);
  const current=(window.VIEW_STATE&&VIEW_STATE.debugLight)||'all';
  sel.innerHTML = `<option value="all">Toutes les sources</option>` + lights.map((l,i)=>`<option value="${escapeHtml(String(l.__uid||''))}">${escapeHtml(getLbl(l)||('Source '+(i+1)))}</option>`).join('');
  sel.value = lights.some(l=>String(l.__uid||'')===String(current)) ? current : 'all';
  if(window.VIEW_STATE) VIEW_STATE.debugLight = sel.value;
}

function addViewQualitySection(){
  if(document.getElementById('viewQualitySection')) return;
  const host=document.getElementById('sbar-scroll'); if(!host) return;
  const wrap=document.createElement('div');
  wrap.className='sec'; wrap.id='viewQualitySection';
  wrap.innerHTML = `
    <div class="sec-hdr" onclick="toggleSec(this)">
      <span class="sec-ico">🪄</span><span class="sec-ttl">Qualité des vues</span><span class="sec-arr o">›</span>
    </div>
    <div class="sec-body o">
      <div class="col" style="margin-bottom:8px">
        <label>Plan studio</label>
        <select id="studioModeSelect" onchange="applyStudioMode(this.value)">
          <option value="tech">Technique</option>
          <option value="client">Client</option>
        </select>
      </div>
      <div class="col" style="margin-bottom:8px">
        <label>Debug lumière</label>
        <select id="debugLightSelect" onchange="VIEW_STATE.debugLight=this.value; if(camOpen) drawCam();"></select>
      </div>
      <div class="sr"><label>Angle iso</label>
        <input type="range" id="isoAngleRange" min="20" max="60" value="35" oninput="VIEW_STATE.isoAngle=+this.value; document.getElementById('isoAngleVal').textContent=this.value+'°'; if(camOpen&&camTab==='iso') drawCam();">
        <span class="sv" id="isoAngleVal">35°</span></div>
      <div class="sr"><label>Hauteur iso</label>
        <input type="range" id="isoHeightRange" min="30" max="110" value="55" oninput="VIEW_STATE.isoHeight=(+this.value)/100; document.getElementById('isoHeightVal').textContent=this.value+'%'; if(camOpen&&camTab==='iso') drawCam();">
        <span class="sv" id="isoHeightVal">55%</span></div>
      <div class="g2">
        <button onclick="VIEW_STATE.dominantOnly=!VIEW_STATE.dominantOnly; this.classList.toggle('b-act',VIEW_STATE.dominantOnly); if(camOpen&&camTab==='light') drawCam();">☀ Source dominante</button>
        <button onclick="refreshLightDebugOptions(); if(camOpen) drawCam();">↺ Rafraîchir</button>
      </div>
    </div>`;
  host.insertBefore(wrap, host.firstElementChild.nextElementSibling);
  const sm=document.getElementById('studioModeSelect'); if(sm) sm.value=(window.VIEW_STATE&&VIEW_STATE.studioMode)||'tech';
  refreshLightDebugOptions();
}

(function patchBootstrap(){
  const prev=window.restoreSerializedProject;
  window.restoreSerializedProject=function(payload){ prev(payload); setTimeout(()=>{ applyStudioMode((window.VIEW_STATE&&VIEW_STATE.studioMode)||'tech'); refreshLightDebugOptions(); },80); };
  const bindRefresh=()=>{ setTimeout(refreshLightDebugOptions, 40); };
  if(window.cv){ cv.on('object:added', bindRefresh); cv.on('object:removed', bindRefresh); cv.on('object:modified', bindRefresh); }
  const oldInit=window.startBlankProject;
  window.startBlankProject=function(){ if(oldInit) oldInit(); setTimeout(()=>{ applyStudioMode('tech'); refreshLightDebugOptions(); },60); };
  setTimeout(()=>{ addViewQualitySection(); applyStudioMode((window.VIEW_STATE&&VIEW_STATE.studioMode)||'tech'); refreshLightDebugOptions(); }, 200);
})();
