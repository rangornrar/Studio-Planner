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
    const zones={left:0.08,right:0.08,top:0.03,rim:0}; let rimSide='right'; const colorAcc={r:0,g:0,b:0,n:0};
    lights.forEach(light=>{
      if(light.visible===false) return;
      const beam=light._objects?.[light.bmIdx]; if(beam&&beam.visible===false) return;
      const distCm=Math.max(20,px2cm(Math.hypot(subject.left-light.left,subject.top-light.top)));
      const power=Math.max(30,+light.powerWs||300);
      let intensity=(power*35)/(distCm*distCm); intensity=clamp(intensity,0,1.4);
      const toSub=Math.atan2(subject.top-light.top,subject.left-light.left);
      const aim=deg2rad(light.angle||0);
      const delta=Math.abs(Math.atan2(Math.sin(toSub-aim),Math.cos(toSub-aim)));
      intensity*=Math.pow(Math.max(0,1-delta/(Math.PI/2)),1.35);
      intensity*=occlusionFactor(light,subject);
      if(intensity<0.01) return;
      const relX=light.left-subject.left, relY=light.top-subject.top;
      if(relX<-10) zones.left += intensity*1.08;
      if(relX>10) zones.right += intensity*1.08;
      if(Math.abs(relX)<=25){ zones.left += intensity*0.40; zones.right += intensity*0.40; }
      if(relY<-10) zones.top += intensity*0.82;
      if(Math.abs(relX)>35){ zones.rim += intensity*0.5; rimSide = relX<0 ? 'left' : 'right'; }
      const tc=getTempRGB(light.lightTemp||'5500K');
      colorAcc.r += tc.r*intensity; colorAcc.g += tc.g*intensity; colorAcc.b += tc.b*intensity; colorAcc.n += intensity;
    });
    const color=colorAcc.n>0 ? {r:Math.round(colorAcc.r/colorAcc.n),g:Math.round(colorAcc.g/colorAcc.n),b:Math.round(colorAcc.b/colorAcc.n)} : {r:200,g:215,b:255};
    return {leftIntensity:zones.left,rightIntensity:zones.right,topIntensity:zones.top,rimIntensity:zones.rim,rimSide,color};
  };

  const oldDrawCam = window.drawCam;
  function drawFrameOverlay(){
    if(!camOpen) return;
    const c=document.getElementById('camCanvas'); if(!c||!c.width) return; const ctx=c.getContext('2d');
    const W=c.width,H=c.height; let ratio=null;
    if(window.currentFrameRatio==='3:2') ratio=3/2; else if(window.currentFrameRatio==='4:5') ratio=4/5; else if(window.currentFrameRatio==='1:1') ratio=1; else if(window.currentFrameRatio==='16:9') ratio=16/9; else return;
    let fw=W*0.9, fh=fw/ratio; if(fh>H*0.84){ fh=H*0.84; fw=fh*ratio; }
    const fx=(W-fw)/2, fy=(H-fh)/2;
    ctx.save();
    ctx.strokeStyle='rgba(255,255,255,.75)'; ctx.lineWidth=1.2; ctx.strokeRect(fx,fy,fw,fh);
    ctx.strokeStyle='rgba(255,255,255,.18)'; ctx.setLineDash([5,5]);
    ctx.beginPath(); ctx.moveTo(fx+fw/3,fy); ctx.lineTo(fx+fw/3,fy+fh); ctx.moveTo(fx+2*fw/3,fy); ctx.lineTo(fx+2*fw/3,fy+fh); ctx.moveTo(fx,fy+fh/3); ctx.lineTo(fx+fw,fy+fh/3); ctx.moveTo(fx,fy+2*fh/3); ctx.lineTo(fx+fw,fy+2*fh/3); ctx.stroke();
    ctx.restore();
  }
  window.drawCam = function(){ oldDrawCam(); drawFrameOverlay(); };

  window.setLightPower = function(v){ const o=sel(); if(!o||o.ctype!=='light') return; o.powerWs=+v; const el=document.getElementById('vPower'); if(el) el.textContent=`${v} Ws`; if(camOpen) drawCam(); };

  // real gear
  const DETAILED_GEAR={
    godox_sk400ii:{cat:'light',label:'Godox SK400II',specs:'400 Ws · Bowens · flash studio',powerWs:400,base:'flash_studio'},
    godox_ad200:{cat:'light',label:'Godox AD200Pro',specs:'200 Ws · autonome · compact',powerWs:200,base:'flash_studio'},
    godox_ad400:{cat:'light',label:'Godox AD400Pro',specs:'400 Ws · autonome · puissant',powerWs:400,base:'flash_studio'},
    aputure_300d:{cat:'light',label:'Aputure 300D',specs:'LED COB · continu',powerWs:300,base:'fresnel'},
    godox_octa120:{cat:'modifier',label:'Octa 120',specs:'Ø120 cm · source ronde',base:'octo_120'},
    godox_strip30120:{cat:'modifier',label:'Stripbox 30×120',specs:'30×120 cm · rim / plein pied',base:'stripbox_30x120'},
    umbrella_silver105:{cat:'modifier',label:'Parapluie argent 105',specs:'Ø105 cm · contrasté',base:'umbrella_100'},
    umbrella_white105:{cat:'modifier',label:'Parapluie blanc 105',specs:'Ø105 cm · doux',base:'umbrella_100'}
  };
  window.addRealLight = function(key){ const d=DETAILED_GEAR[key]; if(!d) return; addLight(d.base); const o=sel(); if(o){ o.powerWs=d.powerWs||300; o.realEqKey=key; setLabel(d.label); } };
  window.addRealModifier = function(key){ const d=DETAILED_GEAR[key]; if(!d) return; if(['octo_120','stripbox_30x120','umbrella_100'].includes(d.base)){ addLight(d.base); } else { addMod(d.base); } const o=sel(); if(o){ o.realEqKey=key; setLabel(d.label); } };

  // catalog
  const catalogBase=[
    {cat:'subject',label:'Homme debout',desc:'Sujet masculin debout.',specs:'178 cm',run:()=>addMaleStanding()},
    {cat:'subject',label:'Femme debout',desc:'Sujet féminin debout.',specs:'168 cm',run:()=>addFemaleStanding()},
    {cat:'subject',label:'Couple',desc:'Deux sujets debout.',specs:'2 sujets',run:()=>addCoupleStanding()},
    {cat:'light',label:'Godox SK400II',desc:'Flash studio Bowens.',specs:'400 Ws',run:()=>addRealLight('godox_sk400ii')},
    {cat:'light',label:'Godox AD200Pro',desc:'Flash compact autonome.',specs:'200 Ws',run:()=>addRealLight('godox_ad200')},
    {cat:'light',label:'Godox AD400Pro',desc:'Flash autonome puissant.',specs:'400 Ws',run:()=>addRealLight('godox_ad400')},
    {cat:'light',label:'Aputure 300D',desc:'LED COB continu.',specs:'300 W',run:()=>addRealLight('aputure_300d')},
    {cat:'light',label:'Softbox 90×120',desc:'Source rectangulaire principale.',specs:'90×120 cm',run:()=>addLight('softbox_90x120')},
    {cat:'light',label:'Octobox 120',desc:'Source ronde polyvalente.',specs:'Ø120 cm',run:()=>addLight('octo_120')},
    {cat:'modifier',label:'V-Flat 100×200',desc:'Contraste, coupe et réflexion.',specs:'100×200 cm',run:()=>addMod('vflat_100x200')},
    {cat:'modifier',label:'Diffusion 120×120',desc:'Adoucit la lumière.',specs:'120×120 cm',run:()=>addMod('scrim_120x120')},
    {cat:'modifier',label:'Drapeau 60×90',desc:'Occlusion simple.',specs:'60×90 cm',run:()=>addMod('flag_60x90')},
    {cat:'background',label:'Fond papier 2.72 m',desc:'Fond studio classique.',specs:'272 cm',run:()=>addBackdrop()},
    {cat:'accessory',label:'Chaise',desc:'Accessoire de pose.',specs:'85 cm',run:()=>addChair()},
    {cat:'accessory',label:'Boom arm',desc:'Pied avec perche.',specs:'180 cm',run:()=>addBoomStand()},
    {cat:'preset',label:'Preset Corporate',desc:'Portrait business propre.',specs:'2 lumières',run:()=>presetCorporate()},
    {cat:'preset',label:'Preset Beauté Butterfly',desc:'Setup beauté frontal.',specs:'Beauty dish',run:()=>presetButterfly()},
    {cat:'preset',label:'Preset Packshot',desc:'Base produit e-commerce.',specs:'fond + diffusion',run:()=>presetPackshot()}
  ];
  window.PRODUCT_CATALOG = catalogBase;
  window.runCatalogItem = function(index){ const item = window.PRODUCT_CATALOG[index]; if(!item) return; item.run(); updateTopProjectBar(); renderCatalog(); if(camOpen) drawCam(); };
  window.renderCatalog = function(){
    const q=(document.getElementById('catalogSearch')?.value || '').toLowerCase().trim();
    const f=document.getElementById('catalogFilter')?.value || 'all';
    const list=document.getElementById('catalogList'); if(!list) return;
    const rows=window.PRODUCT_CATALOG.filter(x => (f==='all'||x.cat===f) && (!q || (x.label+' '+(x.desc||'')+' '+(x.specs||'')+' '+x.cat).toLowerCase().includes(q)));
    list.innerHTML = rows.length ? rows.map((x)=>`<div class="catalog-item"><div class="cat">${escapeHtml(x.cat)}</div><strong>${escapeHtml(x.label)}</strong><div class="desc">${escapeHtml(x.desc||'')}</div>${x.specs?`<div class="specs"><b>Specs</b> · ${escapeHtml(x.specs)}</div>`:''}<button class="b-blue" onclick="runCatalogItem(${window.PRODUCT_CATALOG.indexOf(x)})">Ajouter</button></div>`).join('') : '<div class="muted">Aucun résultat.</div>';
  };

  // dashboard / audit / modal actions
  function setModal(id, open){ const el=document.getElementById(id); if(el) el.classList.toggle('open', !!open); }
  window.openDashboard = function(){ renderDashboard(); setModal('dashboardModal', true); };
  window.closeDashboard = function(){ setModal('dashboardModal', false); };
  window.openCatalogModal = function(){ renderCatalog(); setModal('catalogModal', true); };
  window.closeCatalogModal = function(){ setModal('catalogModal', false); };
  window.openCatalog = window.openCatalogModal;
  window.openAuditModal = function(){ renderAuditModal(); setModal('auditModal', true); };
  window.closeAuditModal = function(){ setModal('auditModal', false); };
  window.openAudit = window.openAuditModal;
  window.closeWelcomeModal = function(){ setModal('welcomeModal', false); try{ localStorage.setItem(STORAGE_KEYS.welcome,'1'); }catch(e){} };
  window.maybeShowWelcome = function(){ try{ if(!localStorage.getItem(STORAGE_KEYS.welcome)) setModal('welcomeModal', true); }catch(e){} };
  window.startBlankProject = function(){ clearScene(); setProjectMeta({name:'Projet sans titre',client:'',shootType:'Portrait',brand:'',notes:''}); updateTopProjectBar(); closeDashboard(); };

  window.getSceneCounts = function(){
    const objs=cv.getObjects().filter(o=>o.isSO || o.ctype==='note' || o.ctype==='measure');
    return {
      total: objs.length,
      lights: objs.filter(o=>o.ctype==='light').length,
      modifiers: objs.filter(o=>o.ctype==='modifier').length,
      subjects: objs.filter(o=>o.ctype==='subject').length,
      cameras: objs.filter(o=>o.ctype==='camera').length,
      backgrounds: objs.filter(o=>o.ctype==='background').length,
      accessories: objs.filter(o=>o.ctype==='accessory').length
    };
  };

  window.computeSetupAudit = function(){
    const c=getSceneCounts(); const warnings=[]; const recos=[]; let score=100;
    if(c.subjects===0){ warnings.push('Aucun sujet dans la scène.'); score-=25; }
    if(c.cameras===0){ warnings.push('Aucune caméra placée.'); score-=20; }
    if(c.lights===0){ warnings.push('Aucune source de lumière placée.'); score-=30; }
    if(c.subjects>0 && c.lights===1){ warnings.push('Une seule lumière : setup potentiellement pauvre selon l’usage.'); score-=8; recos.push('Ajoute un fill, un rim ou un réflecteur.'); }
    if(c.subjects>0 && c.lights>0 && c.modifiers===0){ warnings.push('Aucun modificateur : contrôle lumière limité.'); score-=8; recos.push('Ajoute au moins un réflecteur, une diffusion ou un flag.'); }
    if(c.backgrounds===0){ recos.push('Ajoute un fond si le setup est destiné à un export client.'); score-=4; }
    const lights=cv.getObjects().filter(o=>o.ctype==='light');
    const avgPower = lights.length ? Math.round(lights.reduce((s,o)=>s+(+o.powerWs||300),0)/lights.length) : 0;
    if(lights.some(o=>(+o.powerWs||0)<80)){ warnings.push('Au moins une source est très faible.'); score-=5; }
    if(lights.some(o=>(o.elevOverride||0)>230)){ warnings.push('Au moins une source est placée très haut.'); score-=3; }
    score=Math.max(20,Math.min(100,score));
    const badge = score>=85 ? 'Très propre' : score>=70 ? 'Solide' : score>=55 ? 'À consolider' : 'Fragile';
    return { score, badge, warnings, recos, kpis:[['Sujets',c.subjects],['Lumières',c.lights],['Modificateurs',c.modifiers],['Caméras',c.cameras],['Puissance moy.', avgPower ? avgPower+' Ws' : '—']] };
  };

  window.renderAuditModal = function(){
    const audit=computeSetupAudit();
    const scoreLine=document.getElementById('auditScoreLine');
    const kpis=document.getElementById('auditKpis');
    const checklist=document.getElementById('auditChecklist');
    const warnings=document.getElementById('auditWarnings');
    if(scoreLine) scoreLine.innerHTML=`<div class="audit-badge ${audit.score>=85?'good':audit.score>=70?'warn':'bad'}">Score ${audit.score} · ${audit.badge}</div>`;
    if(kpis) kpis.innerHTML = audit.kpis.map(([k,v])=>`<div class="metric-pill" style="margin:4px 6px 0 0">${k} <strong>${v}</strong></div>`).join('');
    const counts=getSceneCounts();
    const checks=[[counts.subjects>0,'Sujet placé'],[counts.cameras>0,'Caméra placée'],[counts.lights>0,'Lumière(s) placée(s)'],[counts.modifiers>0,'Modificateur(s) présents'],[counts.backgrounds>0,'Fond studio présent']];
    if(checklist) checklist.innerHTML = checks.map(([ok,label])=>`<li>${ok?'✅':'⬜'} ${label}</li>`).join('');
    const notes = audit.warnings.length ? audit.warnings : (audit.recos.length ? audit.recos : ['Aucun signal rouge majeur.']);
    if(warnings) warnings.innerHTML = notes.map(t=>`<div class="report-note">• ${escapeHtml(t)}</div>`).join('');
    const pha=document.getElementById('projectHubAudit');
    if(pha) pha.innerHTML = `<div class="audit-badge ${audit.score>=85?'good':audit.score>=70?'warn':'bad'}">${audit.score} · ${audit.badge}</div>` + notes.slice(0,4).map(t=>`<div class="report-note">• ${escapeHtml(t)}</div>`).join('');
  };

  window.updateTopProjectBar = function(){
    const meta=getProjectMeta(); const counts=getSceneCounts(); const audit=computeSetupAudit();
    const setTxt=(id,val)=>{ const el=document.getElementById(id); if(el) el.textContent = val; };
    setTxt('tpName', meta.name || 'Projet sans titre');
    setTxt('tpClient', meta.client || '—');
    setTxt('tpType', meta.shootType || 'Portrait');
    setTxt('tpObjects', counts.total || 0);
    setTxt('tpScore', audit.score);
    updateProjectHubSummary();
  };

  window.renderDashboard = function(){
    const projects=getLocalCollection(STORAGE_KEYS.projects), templates=getLocalCollection(STORAGE_KEYS.templates);
    const projEl=document.getElementById('dashboardProjects'), tplEl=document.getElementById('dashboardTemplates'), sumEl=document.getElementById('dashboardSummary'), profEl=document.getElementById('dashboardProfiles');
    if(projEl) projEl.innerHTML = projects.slice(0,5).map((p,i)=>`<div class="recent-item"><div><strong>${escapeHtml(p.meta?.name || 'Projet')}</strong><small>${escapeHtml(p.meta?.shootType || '—')}${p.meta?.client ? ' · '+escapeHtml(p.meta.client):''}</small></div><button class="small-btn b-blue" onclick="loadStoredItem('project',${i});closeDashboard();">Ouvrir</button></div>`).join('') || '<div class="muted">Aucun projet récent.</div>';
    if(tplEl) tplEl.innerHTML = templates.slice(0,4).map((p,i)=>`<div class="recent-item"><div><strong>${escapeHtml(p.meta?.name || 'Template')}</strong><small>${escapeHtml(p.meta?.shootType || '—')}</small></div><button class="small-btn" onclick="loadStoredItem('template',${i});closeDashboard();">Charger</button></div>`).join('') || '<div class="muted">Aucun template récent.</div>';
    if(sumEl){ const a=computeSetupAudit(); const c=getSceneCounts(); sumEl.innerHTML=`Projet courant : <strong>${escapeHtml(getProjectMeta().name || 'Projet sans titre')}</strong><br>${c.total} élément(s) · score <strong>${a.score}</strong> · ${escapeHtml(a.badge)}`; }
    window.__dashboardProfiles=[
      {label:'Home studio',desc:'Petit espace polyvalent.',run:()=>{ document.getElementById('rW').value=450; document.getElementById('rH').value=350; applyRoom(); closeDashboard(); }},
      {label:'Portrait',desc:'Espace portrait confortable.',run:()=>{ document.getElementById('rW').value=600; document.getElementById('rH').value=400; applyRoom(); closeDashboard(); }},
      {label:'Fashion',desc:'Plein pied avec recul.',run:()=>{ document.getElementById('rW').value=900; document.getElementById('rH').value=600; applyRoom(); closeDashboard(); }},
      {label:'Packshot',desc:'Produit / table.',run:()=>{ document.getElementById('rW').value=500; document.getElementById('rH').value=350; applyRoom(); closeDashboard(); }}
    ];
    if(profEl) profEl.innerHTML = window.__dashboardProfiles.map((p,i)=>`<div class="profile-card" onclick="(__dashboardProfiles[${i}].run)()"><strong>${escapeHtml(p.label)}</strong><span>${escapeHtml(p.desc)}</span></div>`).join('');
  };

  // compare variants
  function createCompareModal(){ if(document.getElementById('compareModal')) return; const el=document.createElement('div'); el.id='compareModal'; el.className='modal'; el.innerHTML=`<div class="modal-dialog"><div class="modal-head"><div><h3 style="font-size:16px">🆚 Comparaison de variantes</h3><div class="muted">Compare deux variantes du même projet.</div></div><button class="small-btn b-ghost" onclick="closeCompareModal()">✕</button></div><div class="modal-grid"><div class="modal-card"><div class="rw"><div class="col"><label>Variante A</label><select id="compareA"></select></div><div class="col"><label>Variante B</label><select id="compareB"></select></div></div><div class="g2" style="margin-top:10px"><button class="b-blue" onclick="renderVariantCompare()">Comparer</button><button onclick="loadComparedVariant('A')">Charger A</button></div></div><div class="modal-card"><div id="compareBody" class="muted">Choisis deux variantes puis lance la comparaison.</div></div></div></div>`; document.body.appendChild(el); }
  function countPayload(p){ const objs=(p.canvas?.objects||[]).filter(o=>o.isSO||o.ctype==='note'||o.ctype==='measure'); return {total:objs.length, lights:objs.filter(o=>o.ctype==='light').length, mods:objs.filter(o=>o.ctype==='modifier').length, subjects:objs.filter(o=>o.ctype==='subject').length, cameras:objs.filter(o=>o.ctype==='camera').length}; }
  function summaryBox(p,c){ return `<div class="muted">${escapeHtml(p.meta?.shootType || '—')}${p.meta?.client ? ' · '+escapeHtml(p.meta.client):''}</div><ul><li>${c.subjects} sujet(s)</li><li>${c.lights} lumière(s)</li><li>${c.mods} modificateur(s)</li><li>${c.cameras} caméra(s)</li></ul>`; }
  window.openCompareModal=function(){ createCompareModal(); document.getElementById('compareModal').classList.add('open'); const vars=getLocalCollection(STORAGE_KEYS.variants).filter(v=>(v.meta?.variantOf||'')===(getProjectMeta().name||'')); const opts=vars.map((v,i)=>`<option value="${i}">${escapeHtml(v.meta?.variantLabel || ('Variante '+(i+1)))}</option>`).join(''); document.getElementById('compareA').innerHTML=opts; document.getElementById('compareB').innerHTML=opts; if(vars.length>1) document.getElementById('compareB').value='1'; renderVariantCompare(); };
  window.closeCompareModal=function(){ document.getElementById('compareModal')?.classList.remove('open'); };
  window.renderVariantCompare=function(){ const vars=getLocalCollection(STORAGE_KEYS.variants).filter(v=>(v.meta?.variantOf||'')===(getProjectMeta().name||'')); const a=vars[+document.getElementById('compareA').value||0], b=vars[+document.getElementById('compareB').value||0]; const body=document.getElementById('compareBody'); if(!a||!b){ body.innerHTML='<div class="muted">Il faut au moins deux variantes sauvegardées pour comparer.</div>'; return; } const ca=countPayload(a), cb=countPayload(b); body.innerHTML=`<div class="compare-grid"><div class="compare-box"><h5>A · ${escapeHtml(a.meta?.variantLabel || 'Variante A')}</h5>${summaryBox(a,ca)}</div><div class="compare-box"><h5>B · ${escapeHtml(b.meta?.variantLabel || 'Variante B')}</h5>${summaryBox(b,cb)}</div></div><div class="note" style="margin-top:12px"><strong>Différences clés</strong><ul><li>Δ lumières : <strong>${cb.lights-ca.lights>=0?'+':''}${cb.lights-ca.lights}</strong></li><li>Δ modificateurs : <strong>${cb.mods-ca.mods>=0?'+':''}${cb.mods-ca.mods}</strong></li><li>Δ sujets : <strong>${cb.subjects-ca.subjects>=0?'+':''}${cb.subjects-ca.subjects}</strong></li><li>Éléments A/B : <strong>${ca.total}</strong> vs <strong>${cb.total}</strong></li></ul></div>`; };
  window.loadComparedVariant=function(which){ const select=document.getElementById(which==='A'?'compareA':'compareB'); loadStoredVariant(+select.value||0); closeCompareModal(); };

  // share link
  window.copyShareLink = function(){ try{ const raw=encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(serializeCurrentProject()))))); const url=location.origin+location.pathname+'#sp='+raw; navigator.clipboard.writeText(url); toast('Lien de partage copié'); }catch(e){ console.error(e); alert('Impossible de générer le lien.'); } };
  window.loadFromShareHash = function(){ if(!location.hash.startsWith('#sp=')) return; try{ const raw=location.hash.slice(4); const payload=JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(raw))))); restoreSerializedProject(payload); toast('Projet chargé depuis le lien'); }catch(e){ console.warn('share hash invalid', e); } };

  // export
  window.exportSetupReport = function(){
    const meta=getProjectMeta(); cv.discardActiveObject(); cv.requestRenderAll(); if(camOpen) drawCam();
    const topUrl=cv.toDataURL({format:'png', multiplier:4});
    let camUrl=''; const camCanvas=document.getElementById('camCanvas'); try{ if(camCanvas&&camCanvas.width>0&&camCanvas.height>0) camUrl=camCanvas.toDataURL('image/png'); }catch(e){}
    const eq=collectEquipmentSummary(); const audit=computeSetupAudit(); const warnings=(audit.warnings||[]).slice(0,6); const recos=(audit.recos||[]).slice(0,6);
    const html=`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>${escapeHtml(meta.name)}</title><style>body{font-family:Inter,Arial,sans-serif;margin:0;background:#eef2f8;color:#111827}.page{max-width:1180px;margin:0 auto;padding:30px}.hero,.card{background:#fff;border:1px solid #d7deea;border-radius:18px;box-shadow:0 12px 40px rgba(15,23,42,.06)}.hero{padding:24px 28px;display:grid;grid-template-columns:1.2fr .8fr;gap:20px;margin-bottom:18px}.title{font-size:30px;font-weight:900;margin:6px 0 10px}.brand{font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:.08em}.meta{display:grid;grid-template-columns:repeat(2,1fr);gap:10px 16px;font-size:13px}.cards{display:grid;grid-template-columns:1.35fr .65fr;gap:18px}.views{display:grid;grid-template-columns:1fr .72fr;gap:16px}.card{padding:18px}.card img{width:100%;border-radius:14px;border:1px solid #d8deea;background:#fff}.studio-shot img{min-height:520px;object-fit:contain;background:#f7f9fc}.muted{color:#6b7280}.pill{display:inline-flex;padding:6px 10px;border-radius:999px;background:#eef6ff;color:#2563eb;border:1px solid #bfdbfe;font-size:11px;font-weight:800}.audit{display:flex;align-items:center;gap:10px;margin:12px 0 0}.score{font-size:34px;font-weight:900}.sectionTitle{font-size:16px;font-weight:800;margin:0 0 12px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}.note{padding:12px 14px;border-radius:12px;background:#f7f9fc;border:1px solid #e5eaf2;font-size:13px}.list{margin:0;padding-left:18px}.footer{margin-top:18px;color:#6b7280;font-size:11px}@media print{body{background:#fff}.page{max-width:none;padding:0}.hero,.card{box-shadow:none;break-inside:avoid;border-color:#d7deea}.cards,.views,.grid2{break-inside:avoid}}</style></head><body><div class="page"><div class="hero"><div><div class="brand">${escapeHtml(meta.brand||'Studio Planner Pro')}</div><div class="title">${escapeHtml(meta.name||'Projet sans titre')}</div><div class="muted">Fiche setup premium · prête pour assistant, client ou production</div><div class="audit"><span class="pill">Score audit</span><div class="score">${audit.score}</div><div class="muted">${escapeHtml(audit.badge||'Diagnostic')}</div></div></div><div class="meta"><div><strong>Client</strong><br>${escapeHtml(meta.client||'—')}</div><div><strong>Type de séance</strong><br>${escapeHtml(meta.shootType||'—')}</div><div><strong>Studio</strong><br>${RW} × ${RH} cm</div><div><strong>Date</strong><br>${new Date().toLocaleDateString('fr-FR',{year:'numeric',month:'long',day:'numeric'})}</div><div><strong>Cadre photo</strong><br>${escapeHtml(window.currentFrameRatio)}</div><div><strong>Objets</strong><br>${getSceneCounts().total}</div></div></div><div class="cards"><div class="card"><div class="sectionTitle">Vues du setup</div><div class="views"><div class="studio-shot"><div class="muted" style="margin-bottom:6px">Plan studio</div><img src="${topUrl}"></div>${camUrl?`<div><div class="muted" style="margin-bottom:6px">Vue caméra / iso</div><img src="${camUrl}"></div>`:''}</div>${meta.notes?`<div class="note" style="margin-top:14px"><strong>Notes projet</strong><br>${escapeHtml(meta.notes)}</div>`:''}</div><div class="card"><div class="sectionTitle">Matériel & recommandations</div><div class="grid2"><div><div class="muted" style="margin-bottom:6px">Matériel utilisé</div><ul class="list">${eq.map(([name,count])=>`<li><strong>×${count}</strong> ${escapeHtml(name)}</li>`).join('')||'<li>Aucun matériel.</li>'}</ul></div><div><div class="muted" style="margin-bottom:6px">Résumé exécutif</div><div class="note">${escapeHtml(collectExecutiveSummary())}</div></div></div><div class="grid2" style="margin-top:14px"><div><div class="muted" style="margin-bottom:6px">Points de vigilance</div><ul class="list">${warnings.length ? warnings.map(w=>`<li>${escapeHtml(w)}</li>`).join('') : '<li>Aucun signal rouge majeur.</li>'}</ul></div><div><div class="muted" style="margin-bottom:6px">Recommandations</div><ul class="list">${recos.length ? recos.map(r=>`<li>${escapeHtml(r)}</li>`).join('') : '<li>Le setup est déjà bien cadré.</li>'}</ul></div></div></div></div><div class="footer">Document généré depuis Studio Planner Pro. Pour obtenir le PDF final, utilise l’impression du navigateur puis “Enregistrer au format PDF”.</div></div><script>window.onload=()=>setTimeout(()=>window.print(),250);<\/script></body></html>`;
    const w=window.open('','_blank'); w.document.open(); w.document.write(html); w.document.close();
  };

  function enhanceUI(){
    const toolbar=document.getElementById('toolbar');
    if(toolbar && !document.getElementById('frameRatioSelect')){
      const sep=document.createElement('div'); sep.className='tsep';
      const wrap=document.createElement('div'); wrap.className='premium-inline';
      wrap.innerHTML=`<select id="frameRatioSelect" class="tb frame-select"><option value="free">Libre</option><option value="3:2">3:2</option><option value="4:5">4:5</option><option value="1:1">1:1</option><option value="16:9">16:9</option></select><button class="tb" onclick="copyShareLink()">🔗 Partager</button><button class="tb" onclick="openCompareModal()">🆚 Variantes</button>`;
      toolbar.appendChild(sep); toolbar.appendChild(wrap);
      document.getElementById('frameRatioSelect').addEventListener('change', e => { window.currentFrameRatio = e.target.value; if(camOpen) drawCam(); });
    }
    const projSec=document.querySelector('#projectNotes')?.closest('.sec-body');
    if(projSec && !document.getElementById('shootTypeTemplateBtn')){
      const row=document.createElement('div'); row.className='g2';
      row.innerHTML='<button id="shootTypeTemplateBtn" onclick="saveShootTypeTemplate()">🗂 Template séance</button><button onclick="copyShareLink()">🔗 Lien de partage</button>';
      projSec.appendChild(row);
    }
  }

  function install(){
    enhanceUI();
    createCompareModal();
    setTimeout(loadFromShareHash, 120);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

// lock helpers, command palette, draft
(function(){
  let autosaveTimer=null, commandItems=[], commandIndex=0;
  function updateDraftStatus(label, ok=true){ const el=document.getElementById('draftStatus'); if(el){ el.textContent='● '+label; el.style.color=ok?'var(--text2)':'var(--red)'; } }
  function safeScenePayload(){ try{ return serializeCurrentProject(); }catch(e){ return null; } }
  function saveDraft(){ const payload=safeScenePayload(); if(!payload) return; try{ payload.meta=payload.meta||{}; payload.meta.__draftSavedAt=Date.now(); localStorage.setItem(STORAGE_KEYS.draft, JSON.stringify(payload)); updateDraftStatus('Brouillon '+new Date(payload.meta.__draftSavedAt).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), true); }catch(e){ updateDraftStatus('Autosave indisponible', false); } }
  function scheduleDraft(){ clearTimeout(autosaveTimer); autosaveTimer=setTimeout(saveDraft, 600); }
  window.restoreDraftIfNeeded = function(force=false){ try{ const raw=localStorage.getItem(STORAGE_KEYS.draft); if(!raw) return false; const payload=JSON.parse(raw); if(!force){ const count=cv.getObjects().filter(o=>o.isSO || o.ctype==='note' || o.ctype==='measure').length; if(count>0) return false; } restoreSerializedProject(payload); updateDraftStatus('Brouillon restauré', true); return true; }catch(e){ return false; } };
  function setObjectLocked(o, locked){ if(!o) return; o.locked=!!locked; o.__locked=!!locked; applyLockState(o); o.setCoords(); }
  window.toggleLockSelected = function(){ const o=sel(); if(!o) return; setObjectLocked(o, !o.__locked); cv.requestRenderAll(); buildLayers(); syncSel(); toast(o.__locked ? 'Objet verrouillé' : 'Objet déverrouillé'); };
  window.toggleLockSel = window.toggleLockSelected;
  window.unlockAllObjects = function(){ cv.getObjects().forEach(o=>{ if(o.isSO || o.ctype==='note' || o.ctype==='measure') setObjectLocked(o, false); }); cv.requestRenderAll(); buildLayers(); syncSel(); toast('Tous les objets sont déverrouillés'); };
  window.togglePresentationMode = function(){ document.body.classList.toggle('presentation-mode'); const on=document.body.classList.contains('presentation-mode'); const btn=document.getElementById('presentBtn'); if(btn) btn.classList.toggle('b-act', on); setTimeout(()=>{ try{ fitCanvas(); if(typeof fitCamCv==='function') fitCamCv(); if(camOpen) drawCam(); recenter(); }catch(e){} },120); toast(on ? 'Mode présentation activé' : 'Mode présentation désactivé'); };
  function commandData(){ return [
    {label:'Ajouter un sujet homme',hint:'Sujet',run:()=>addMaleStanding()},
    {label:'Ajouter un sujet femme',hint:'Sujet',run:()=>addFemaleStanding()},
    {label:'Ajouter une softbox 90×120',hint:'Lumière',run:()=>addLight('softbox_90x120')},
    {label:'Ajouter un octobox 120',hint:'Lumière',run:()=>addLight('octo_120')},
    {label:'Ajouter un réflecteur',hint:'Modificateur',run:()=>addMod('reflector_80')},
    {label:'Preset corporate',hint:'Preset',run:()=>presetCorporate()},
    {label:'Preset butterfly',hint:'Preset',run:()=>presetButterfly()},
    {label:'Preset packshot',hint:'Preset',run:()=>presetPackshot()},
    {label:'Ouvrir dashboard',hint:'Navigation',run:()=>openDashboard()},
    {label:'Ouvrir le hub projet',hint:'Navigation',run:()=>openProjectHub()},
    {label:'Ouvrir le catalogue matériel',hint:'Navigation',run:()=>openCatalogModal()},
    {label:'Ouvrir l’audit setup',hint:'Qualité',run:()=>openAuditModal()},
    {label:'Exporter la fiche setup',hint:'Export',run:()=>exportSetupReport()},
    {label:'Sauvegarder une variante',hint:'Projet',run:()=>saveCurrentVariant()},
    {label:'Partager par lien',hint:'Projet',run:()=>copyShareLink()},
    {label:'Vue caméra / isométrique',hint:'Affichage',run:()=>toggleCam()},
    {label:'Mode présentation',hint:'Affichage',run:()=>togglePresentationMode()},
    {label:'Recentrer la scène',hint:'Affichage',run:()=>recenter()},
    {label:'Tout déverrouiller',hint:'Objet',run:()=>unlockAllObjects()}
  ]; }
  function renderCommandList(filter=''){ const list=document.getElementById('commandList'); if(!list) return; const q=filter.trim().toLowerCase(); commandItems=commandData().filter(item=>!q || (item.label+' '+item.hint).toLowerCase().includes(q)); commandIndex=Math.min(commandIndex, Math.max(0, commandItems.length-1)); list.innerHTML = commandItems.length ? commandItems.map((item,i)=>`<div class="command-item ${i===commandIndex?'active':''}" data-index="${i}"><div><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.hint)}</small></div><span class="command-kbd">↵</span></div>`).join('') : '<div class="command-item"><div><strong>Aucun résultat</strong><small>Essaie un autre mot-clé.</small></div></div>'; list.querySelectorAll('.command-item[data-index]').forEach(el=>el.onclick=()=>{ commandIndex=+el.dataset.index; runCommandSelection(); }); }
  function runCommandSelection(){ const item=commandItems[commandIndex]; if(!item) return; closeCommandPalette(); setTimeout(()=>item.run(), 40); }
  window.openCommandPalette = function(){ const palette=document.getElementById('commandPalette'); if(!palette) return; palette.classList.add('open'); palette.setAttribute('aria-hidden','false'); const input=document.getElementById('commandInput'); commandIndex=0; renderCommandList(''); setTimeout(()=>input?.focus(),20); };
  window.closeCommandPalette = function(){ const palette=document.getElementById('commandPalette'); if(!palette) return; palette.classList.remove('open'); palette.setAttribute('aria-hidden','true'); };
  document.addEventListener('keydown', e=>{ const inputFocused=['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName); const paletteOpen=document.getElementById('commandPalette')?.classList.contains('open'); if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openCommandPalette(); return; } if(paletteOpen){ if(e.key==='Escape'){ e.preventDefault(); closeCommandPalette(); return; } if(e.key==='ArrowDown'){ e.preventDefault(); commandIndex=Math.min(commandIndex+1, commandItems.length-1); renderCommandList(document.getElementById('commandInput')?.value||''); return; } if(e.key==='ArrowUp'){ e.preventDefault(); commandIndex=Math.max(commandIndex-1, 0); renderCommandList(document.getElementById('commandInput')?.value||''); return; } if(e.key==='Enter'){ e.preventDefault(); runCommandSelection(); return; } } if(!inputFocused && e.key.toLowerCase()==='l' && !e.ctrlKey && !e.metaKey){ e.preventDefault(); toggleLockSelected(); } if(!inputFocused && e.key.toLowerCase()==='p' && !e.ctrlKey && !e.metaKey){ e.preventDefault(); togglePresentationMode(); } });
  document.addEventListener('click', e=>{ if(e.target?.id==='commandPalette') closeCommandPalette(); });
  ['object:modified','object:added','object:removed','selection:created','selection:updated','selection:cleared'].forEach(evt=>cv.on(evt, scheduleDraft));
  document.addEventListener('input', e=>{ if(['projectName','projectClient','projectShootType','projectBrand','projectNotes'].includes(e.target.id)) scheduleDraft(); if(e.target?.id==='commandInput'){ commandIndex=0; renderCommandList(e.target.value||''); } });
  window.addEventListener('beforeunload', saveDraft);
  setTimeout(()=>{ restoreDraftIfNeeded(false); updateDraftStatus('Brouillon local', true); },350);
})();


document.addEventListener('input', e=>{ if(['projectName','projectClient','projectShootType','projectBrand','projectNotes'].includes(e.target.id)) { updateProjectHubSummary(); updateTopProjectBar(); } });
['selection:created','selection:updated','selection:cleared','object:modified','object:added','object:removed'].forEach(evt=>cv.on(evt,()=>{ updateTopProjectBar(); if(document.getElementById('auditModal')?.classList.contains('open')) renderAuditModal(); }));

function bootstrapStudioPlanner(){
  try{
    init();
    const sceneObjects=cv.getObjects().filter(o=>o.isSO || o.ctype==='note' || o.ctype==='measure');
    if(!sceneObjects.length) presetRembrandt();
    recenter();
    cv.requestRenderAll();
    setTimeout(()=>{
      try{
        const objs=cv.getObjects().filter(o=>o.isSO || o.ctype==='note' || o.ctype==='measure');
        if(!roomR || !objs.length){ clearScene(); presetRembrandt(); recenter(); }
        saveState(); buildLayers(); updateProjectHub(); updateTopProjectBar(); renderDashboard(); maybeShowWelcome();
      }catch(err){ console.error('Bootstrap post-init error', err); }
    }, 200);
  }catch(err){ console.error('Bootstrap init error', err); }
}

if(document.readyState==='loading'){
  window.addEventListener('load', bootstrapStudioPlanner, {once:true});
}else{
  bootstrapStudioPlanner();
}
