window.SP_APP = window.SP_APP || {};
window.VIEW_STATE = window.VIEW_STATE || {
  studioMode: 'tech',
  debugLight: 'all',
  dominantOnly: false,
  isoAngle: 35,
  isoHeight: 0.55
};

function getLightDebugSet(lights){
  const mode=(window.VIEW_STATE&&window.VIEW_STATE.debugLight)||'all';
  if(mode==='all') return lights||[];
  return (lights||[]).filter(l=>String(l.__uid||'')===String(mode));
}

function getLightEmissionProfile(light){
  const lb=(getLbl(light)||'').toLowerCase();
  if(lb.includes('stripbox')) return {beamBonus:0.72, featherPow:1.8, softness:0.95, bgBoost:0.7};
  if(lb.includes('softbox')) return {beamBonus:0.95, featherPow:2.2, softness:1.08, bgBoost:0.9};
  if(lb.includes('octo')) return {beamBonus:1.05, featherPow:2.5, softness:1.12, bgBoost:0.95};
  if(lb.includes('parapluie')) return {beamBonus:1.15, featherPow:2.0, softness:1.0, bgBoost:1.0};
  if(lb.includes('beauty dish')) return {beamBonus:0.65, featherPow:1.35, softness:0.88, bgBoost:0.65};
  if(lb.includes('ring')) return {beamBonus:0.75, featherPow:1.6, softness:0.94, bgBoost:0.8};
  if(lb.includes('fresnel')||lb.includes('aputure')||lb.includes('snoot')) return {beamBonus:0.45, featherPow:1.15, softness:0.76, bgBoost:0.55};
  return {beamBonus:0.85, featherPow:1.7, softness:0.9, bgBoost:0.75};
}

// ═══════════════════════════════════════════════════════════════
// CAMERA PANEL — 2D positions view + lighting simulation
// ═══════════════════════════════════════════════════════════════

function toggleCam(){
  camOpen=!camOpen;
  document.getElementById('camPanel').classList.toggle('open',camOpen);
  document.getElementById('camBtn').classList.toggle('b-act',camOpen);
  if(camOpen)setTimeout(()=>{fitCamCv();drawCam();},320);
}
function setCamTab(tab){
  camTab=tab;
  document.getElementById('tab-pos').classList.toggle('on',tab==='pos');
  document.getElementById('tab-light').classList.toggle('on',tab==='light');
  const isoBtn=document.getElementById('tab-iso');
  if(isoBtn) isoBtn.classList.toggle('on',tab==='iso');
  drawCam();
}
function fitCamCv(){
  const p=document.getElementById('camPanel');
  const c=document.getElementById('camCanvas');
  c.width=Math.max(200,p.clientWidth);
  c.height=Math.max(180,p.clientHeight-document.getElementById('cam-hdr').offsetHeight);
}
function deg2rad(d){return d*Math.PI/180;}
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
function projectToCamera(obj, cam){
  const a=deg2rad(cam.angle||0);
  const dx=obj.left-cam.left;
  const dy=obj.top-cam.top;
  return {
    x:(-dx*Math.sin(a)+dy*Math.cos(a)),
    z:(dx*Math.cos(a)+dy*Math.sin(a))
  };
}
function getViewDims(obj){
  if(obj.viewOverride) return {...obj.viewOverride};
  const lb=(getLbl(obj)||'').toLowerCase();
  if(obj.ctype==='subject'){
    if(obj.subjectPose==='lying' || lb.includes('allongé')) return {w:obj.realWidth||160,h:obj.realHeight||38,elev:18,type:'subject_lying'};
    if(lb.includes('couple')) return {w:obj.realWidth||110,h:obj.realHeight||176,elev:0,type:'subject_group'};
    if(obj.subjectPose==='sit' || lb.includes('assis')) return {w:obj.realWidth||55,h:obj.realHeight||120,elev:0,type:'subject_sit'};
    if(lb.includes('table produit')) return {w:obj.realWidth||80,h:obj.realHeight||90,elev:0,type:'subject_table'};
    return {w:obj.realWidth||55,h:obj.realHeight||175,elev:0,type:'subject_stand'};
  }
  if(obj.ctype==='light'){
    if(lb.includes('stripbox'))return {w:30,h:120,elev:obj.elevOverride||145,type:'stripbox'};
    if(lb.includes('softbox 90×120'))return {w:90,h:120,elev:obj.elevOverride||145,type:'softbox'};
    if(lb.includes('softbox 60×60'))return {w:60,h:60,elev:obj.elevOverride||145,type:'softbox'};
    if(lb.includes('octobox 150'))return {w:150,h:150,elev:obj.elevOverride||150,type:'octobox'};
    if(lb.includes('octobox 120'))return {w:120,h:120,elev:obj.elevOverride||150,type:'octobox'};
    if(lb.includes('octobox 90'))return {w:90,h:90,elev:obj.elevOverride||150,type:'octobox'};
    if(lb.includes('parapluie 120'))return {w:120,h:120,elev:obj.elevOverride||150,type:'umbrella'};
    if(lb.includes('parapluie 100')||lb.includes('105'))return {w:105,h:105,elev:obj.elevOverride||150,type:'umbrella'};
    if(lb.includes('beauty dish 55'))return {w:55,h:55,elev:obj.elevOverride||155,type:'dish'};
    if(lb.includes('beauty dish 42'))return {w:42,h:42,elev:obj.elevOverride||155,type:'dish'};
    if(lb.includes('ring light'))return {w:45,h:45,elev:obj.elevOverride||150,type:'ring'};
    if(lb.includes('led panel l'))return {w:60,h:30,elev:obj.elevOverride||150,type:'panel'};
    if(lb.includes('led panel s'))return {w:30,h:20,elev:obj.elevOverride||150,type:'panel'};
    if(lb.includes('aputure 300d'))return {w:28,h:28,elev:obj.elevOverride||165,type:'spot'};
    if(lb.includes('ad200'))return {w:18,h:12,elev:obj.elevOverride||145,type:'flash'};
    if(lb.includes('ad400'))return {w:24,h:16,elev:obj.elevOverride||150,type:'flash'};
    if(lb.includes('sk400'))return {w:25,h:18,elev:obj.elevOverride||150,type:'flash'};
    if(lb.includes('flash studio'))return {w:25,h:15,elev:obj.elevOverride||150,type:'flash'};
    return {w:45,h:45,elev:obj.elevOverride||150,type:'panel'};
  }
  if(obj.ctype==='modifier'){
    if(lb.includes('110×180'))return {w:110,h:180,elev:obj.elevOverride||90,type:'modifier_panel'};
    if(lb.includes('120×120'))return {w:120,h:120,elev:obj.elevOverride||120,type:'modifier_panel'};
    if(lb.includes('100×200'))return {w:100,h:200,elev:obj.elevOverride||100,type:'modifier_panel'};
    if(lb.includes('60×90'))return {w:60,h:90,elev:obj.elevOverride||120,type:'modifier_panel'};
    if(lb.includes('réflecteur 80'))return {w:80,h:55,elev:obj.elevOverride||110,type:'reflector'};
    if(lb.includes('octa 120')||lb.includes('octobox')) return {w:120,h:120,elev:obj.elevOverride||150,type:'octobox'};
    if(lb.includes('stripbox')) return {w:30,h:120,elev:obj.elevOverride||150,type:'stripbox'};
    if(lb.includes('parapluie')) return {w:105,h:105,elev:obj.elevOverride||150,type:'umbrella'};
    return {w:60,h:120,elev:obj.elevOverride||120,type:'modifier_panel'};
  }
  if(obj.ctype==='background')return {w:obj.realWidth||272,h:obj.realHeight||220,elev:obj.elevOverride||110,type:'background'};
  if(obj.ctype==='accessory'){
    if(lb.includes('chaise'))return {w:45,h:85,elev:obj.elevOverride||42,type:'chair'};
    if(lb.includes('boom'))return {w:90,h:180,elev:obj.elevOverride||90,type:'boom'};
    if(lb.includes('trépied'))return {w:35,h:150,elev:obj.elevOverride||75,type:'tripod'};
    if(lb.includes('pied lumière'))return {w:30,h:180,elev:obj.elevOverride||90,type:'stand'};
    return {w:35,h:120,elev:obj.elevOverride||60,type:'stand'};
  }
  return {w:obj.realWidth||50,h:obj.realHeight||100,elev:obj.elevOverride||0,type:'generic'};
}
function roundRectPath(ctx,x,y,w,h,r){
  const rr=Math.min(r,w/2,h/2);
  ctx.beginPath();
  ctx.moveTo(x+rr,y);
  ctx.arcTo(x+w,y,x+w,y+h,rr);
  ctx.arcTo(x+w,y+h,x,y+h,rr);
  ctx.arcTo(x,y+h,x,y,rr);
  ctx.arcTo(x,y,x+w,y,rr);
  ctx.closePath();
}
function drawFloorShadow(ctx,x,y,w,h,dir=0.12,strength=0.28){
  ctx.save();
  ctx.translate(x,y+2);
  ctx.transform(1,0,dir,0.18,0,0);
  const g=ctx.createRadialGradient(0,0,0,0,0,Math.max(w*0.55,10));
  g.addColorStop(0,`rgba(0,0,0,${strength})`);
  g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g;
  ctx.beginPath();
  ctx.ellipse(0,0,Math.max(6,w*0.42),Math.max(3,h*0.045),0,0,Math.PI*2);
  ctx.fill();
  ctx.restore();
}
function drawStandingPerson(ctx,x,y,w,h,lighting=null){
  drawFloorShadow(ctx,x,y,w,h,0.1,0.34);
  ctx.save();ctx.translate(x,y);
  const amb={r:48,g:50,b:58};
  const warm={r:255,g:176,b:112};
  let left=warm,right={r:217,g:106,b:34},topA=0,rimA=0,rimSide='right';
  if(lighting){
    const lc=lighting.color||{r:200,g:215,b:255};
    const li=lighting.leftIntensity||0.08,ri=lighting.rightIntensity||0.08;
    left={r:Math.min(255,Math.round(amb.r+lc.r*li)),g:Math.min(255,Math.round(amb.g+lc.g*li)),b:Math.min(255,Math.round(amb.b+lc.b*li))};
    right={r:Math.min(255,Math.round(amb.r+lc.r*ri)),g:Math.min(255,Math.round(amb.g+lc.g*ri)),b:Math.min(255,Math.round(amb.b+lc.b*ri))};
    topA=clamp(lighting.topIntensity||0,0,0.85);
    rimA=clamp(lighting.rimIntensity||0,0,0.85);
    rimSide=lighting.rimSide||'right';
  }
  const grad=ctx.createLinearGradient(-w/2,0,w/2,0);
  grad.addColorStop(0,`rgb(${left.r},${left.g},${left.b})`);
  grad.addColorStop(0.48,`rgb(${left.r},${left.g},${left.b})`);
  grad.addColorStop(0.52,`rgb(${right.r},${right.g},${right.b})`);
  grad.addColorStop(1,`rgb(${right.r},${right.g},${right.b})`);
  ctx.fillStyle=grad;
  ctx.beginPath();ctx.ellipse(0,-h*0.84,w*0.14,h*0.10,0,0,Math.PI*2);ctx.fill();
  ctx.fillRect(-w*0.05,-h*0.72,w*0.10,h*0.06);
  ctx.beginPath();ctx.moveTo(-w*0.18,-h*0.66);ctx.lineTo(w*0.18,-h*0.66);ctx.lineTo(w*0.14,-h*0.28);ctx.lineTo(-w*0.14,-h*0.28);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-w*0.18,-h*0.62);ctx.lineTo(-w*0.34,-h*0.50);ctx.lineTo(-w*0.27,-h*0.24);ctx.lineTo(-w*0.14,-h*0.28);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(w*0.18,-h*0.62);ctx.lineTo(w*0.34,-h*0.50);ctx.lineTo(w*0.27,-h*0.24);ctx.lineTo(w*0.14,-h*0.28);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-w*0.13,-h*0.28);ctx.lineTo(0,-h*0.28);ctx.lineTo(-w*0.04,0);ctx.lineTo(-w*0.15,0);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(0,-h*0.28);ctx.lineTo(w*0.13,-h*0.28);ctx.lineTo(w*0.15,0);ctx.lineTo(w*0.04,0);ctx.closePath();ctx.fill();
  if(topA>0.04 && lighting){
    const tg=ctx.createLinearGradient(0,-h*0.96,0,-h*0.40);
    const c=lighting.color;
    tg.addColorStop(0,`rgba(${c.r},${c.g},${c.b},${topA})`);
    tg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=tg;
    ctx.beginPath();ctx.ellipse(0,-h*0.84,w*0.14,h*0.10,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.moveTo(-w*0.18,-h*0.66);ctx.lineTo(w*0.18,-h*0.66);ctx.lineTo(w*0.14,-h*0.28);ctx.lineTo(-w*0.14,-h*0.28);ctx.closePath();ctx.fill();
  }
  if(rimA>0.04 && lighting){
    const c=lighting.color;ctx.strokeStyle=`rgba(${c.r},${c.g},${c.b},${rimA})`;ctx.lineWidth=Math.max(2,w*0.035);
    ctx.beginPath();
    if(rimSide==='left'){
      ctx.moveTo(-w*0.17,-h*0.62);ctx.lineTo(-w*0.33,-h*0.50);ctx.lineTo(-w*0.26,-h*0.24);ctx.lineTo(-w*0.14,0);
    } else {
      ctx.moveTo(w*0.17,-h*0.62);ctx.lineTo(w*0.33,-h*0.50);ctx.lineTo(w*0.26,-h*0.24);ctx.lineTo(w*0.14,0);
    }
    ctx.stroke();
  }
  ctx.fillStyle='rgba(0,0,0,.14)';ctx.beginPath();ctx.ellipse(0,-h*0.56,w*0.08,h*0.02,0,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawSittingPerson(ctx,x,y,w,h,lighting=null){
  drawFloorShadow(ctx,x,y,w,h,0.08,0.30);
  ctx.save();ctx.translate(x,y);
  ctx.fillStyle='#7f8798';
  ctx.fillRect(-w*0.22,-h*0.18,w*0.44,h*0.07);
  ctx.fillRect(-w*0.22,-h*0.42,w*0.06,h*0.24);
  const grad=ctx.createLinearGradient(-w/2,0,w/2,0);
  grad.addColorStop(0,'#ffb070');grad.addColorStop(1,'#d96a22');ctx.fillStyle=grad;
  ctx.beginPath();ctx.ellipse(-w*0.02,-h*0.70,w*0.14,h*0.10,0,0,Math.PI*2);ctx.fill();
  ctx.beginPath();ctx.moveTo(-w*0.18,-h*0.58);ctx.lineTo(w*0.14,-h*0.58);ctx.lineTo(w*0.10,-h*0.28);ctx.lineTo(-w*0.13,-h*0.28);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(-w*0.10,-h*0.28);ctx.lineTo(w*0.12,-h*0.28);ctx.lineTo(w*0.28,-h*0.12);ctx.lineTo(w*0.06,-h*0.12);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(w*0.22,-h*0.12);ctx.lineTo(w*0.30,-h*0.12);ctx.lineTo(w*0.30,0);ctx.lineTo(w*0.22,0);ctx.closePath();ctx.fill();
  ctx.restore();
}
function drawLightStand(ctx,x,y,h){
  ctx.strokeStyle='#606070';ctx.lineWidth=Math.max(1,h*0.012);
  ctx.beginPath();ctx.moveTo(x,y-h*0.78);ctx.lineTo(x,y);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-h*0.08,y+h*0.08);ctx.moveTo(x,y);ctx.lineTo(x+h*0.08,y+h*0.08);ctx.moveTo(x,y);ctx.lineTo(x,y+h*0.10);ctx.stroke();
}
function drawSoftboxFront(ctx,x,y,w,h){
  drawLightStand(ctx,x,y,h*1.08);
  const by=y-h*1.02;ctx.save();ctx.translate(x,by);
  const glow=ctx.createRadialGradient(0,0,0,0,0,Math.max(w,h)*0.75);glow.addColorStop(0,'rgba(74,142,255,.16)');glow.addColorStop(1,'rgba(74,142,255,0)');
  ctx.fillStyle=glow;ctx.fillRect(-w*0.8,-h*0.8,w*1.6,h*1.6);
  ctx.fillStyle='#4a8eff';roundRectPath(ctx,-w/2,-h/2,w,h,6);ctx.fill();
  ctx.fillStyle='#deeeff';roundRectPath(ctx,-w/2+4,-h/2+4,w-8,h-8,4);ctx.fill();
  ctx.strokeStyle='rgba(74,142,255,.25)';ctx.lineWidth=1;
  for(let i=1;i<4;i++){const xx=-w/2+(w*i/4);ctx.beginPath();ctx.moveTo(xx,-h/2+4);ctx.lineTo(xx,h/2-4);ctx.stroke();}
  for(let i=1;i<4;i++){const yy=-h/2+(h*i/4);ctx.beginPath();ctx.moveTo(-w/2+4,yy);ctx.lineTo(w/2-4,yy);ctx.stroke();}
  ctx.restore();
}
function drawOctoboxFront(ctx,x,y,d){
  drawLightStand(ctx,x,y,d*1.05);const cy=y-d*0.85,r=d/2;ctx.save();ctx.translate(x,cy);
  ctx.fillStyle='rgba(74,142,255,.14)';ctx.beginPath();ctx.arc(0,0,r*1.22,0,Math.PI*2);ctx.fill();
  const poly=(rad,fill)=>{ctx.beginPath();for(let i=0;i<8;i++){const a=-Math.PI/2+Math.PI*2*i/8,px=Math.cos(a)*rad,py=Math.sin(a)*rad;if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.closePath();ctx.fillStyle=fill;ctx.fill();};
  poly(r,'#4a8eff');poly(r*0.9,'#deeeff');ctx.strokeStyle='rgba(74,142,255,.22)';ctx.lineWidth=1;
  for(let i=0;i<8;i++){const a=-Math.PI/2+Math.PI*2*i/8;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*r*0.82,Math.sin(a)*r*0.82);ctx.stroke();}
  ctx.restore();
}
function drawUmbrellaFront(ctx,x,y,d){
  drawLightStand(ctx,x,y,d*1.05);const cy=y-d*0.85,r=d/2;ctx.save();ctx.translate(x,cy);
  ctx.fillStyle='#deeeff';ctx.strokeStyle='#4a8eff';ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(0,0,r,Math.PI,0,false);ctx.lineTo(-r,0);ctx.fill();ctx.stroke();
  for(let i=0;i<=6;i++){const a=Math.PI-(Math.PI*i/6);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);ctx.stroke();}
  ctx.restore();
}
function drawDishFront(ctx,x,y,d){
  drawLightStand(ctx,x,y,d*1.05);const cy=y-d*0.72;ctx.save();ctx.translate(x,cy);const r=d/2;
  ctx.fillStyle='rgba(74,142,255,.10)';ctx.beginPath();ctx.arc(0,0,r*1.1,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#cfd7e8';ctx.strokeStyle='#4a8eff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#eef4ff';ctx.beginPath();ctx.arc(0,0,r*0.78,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.85)';ctx.beginPath();ctx.arc(0,0,r*0.2,0,Math.PI*2);ctx.fill();ctx.restore();
}
function drawRingFront(ctx,x,y,d){
  drawLightStand(ctx,x,y,d*1.1);const cy=y-d*0.75,r=d/2;ctx.save();ctx.translate(x,cy);
  ctx.strokeStyle='#4a8eff';ctx.lineWidth=Math.max(6,d*0.14);ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(0,0,r*0.56,0,Math.PI*2);ctx.stroke();ctx.restore();
}
function drawPanelFront(ctx,x,y,w,h,fill='#f0f0f4',stroke='#8890a8'){
  drawLightStand(ctx,x,y,h*1.05);const py=y-h*0.88;ctx.fillStyle=fill;ctx.strokeStyle=stroke;ctx.lineWidth=2;roundRectPath(ctx,x-w/2,py-h/2,w,h,4);ctx.fill();ctx.stroke();
}
function drawReflectorFront(ctx,x,y,w,h){
  drawLightStand(ctx,x,y,h*1.05);const cy=y-h*0.82;ctx.save();ctx.translate(x,cy);
  ctx.fillStyle='#f0f2f8';ctx.strokeStyle='#b0b8cc';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,w/2,h/2,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.ellipse(0,0,w*0.28,h*0.20,0,0,Math.PI*2);ctx.fill();ctx.restore();
}
function drawBackgroundFront(ctx,x,y,w,h){
  const gy=y-h;const g=ctx.createLinearGradient(0,gy,0,y);g.addColorStop(0,'#eef2f7');g.addColorStop(1,'#d9dfe8');ctx.fillStyle=g;ctx.strokeStyle='#9098b0';ctx.lineWidth=2;roundRectPath(ctx,x-w/2,gy,w,h,8);ctx.fill();ctx.stroke();
}
function drawChairFront(ctx,x,y,w,h){
  drawFloorShadow(ctx,x,y,w,h,0.08,0.22);ctx.save();ctx.translate(x,y);ctx.strokeStyle='#70758a';ctx.lineWidth=2;ctx.fillStyle='#9095a8';
  ctx.fillRect(-w*0.22,-h*0.22,w*0.44,h*0.08);ctx.fillRect(-w*0.22,-h*0.42,w*0.44,h*0.08);
  ctx.beginPath();ctx.moveTo(-w*0.18,-h*0.14);ctx.lineTo(-w*0.18,0);ctx.moveTo(w*0.18,-h*0.14);ctx.lineTo(w*0.18,0);ctx.moveTo(-w*0.18,-h*0.34);ctx.lineTo(-w*0.18,-h*0.14);ctx.moveTo(w*0.18,-h*0.34);ctx.lineTo(w*0.18,-h*0.14);ctx.stroke();ctx.restore();
}
function drawTripodFront(ctx,x,y,w,h){
  drawFloorShadow(ctx,x,y,w,h,0.06,0.2);ctx.strokeStyle='#505568';ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(x,y-h*0.82);ctx.lineTo(x,y-h*0.18);ctx.moveTo(x,y-h*0.18);ctx.lineTo(x-w*0.34,y);ctx.moveTo(x,y-h*0.18);ctx.lineTo(x+w*0.34,y);ctx.moveTo(x,y-h*0.18);ctx.lineTo(x,y);ctx.stroke();
  ctx.fillStyle='#2a2d3e';ctx.beginPath();ctx.arc(x,y-h*0.84,w*0.12,0,Math.PI*2);ctx.fill();
}
function drawStandFront(ctx,x,y,w,h){
  drawFloorShadow(ctx,x,y,w,h,0.06,0.18);ctx.strokeStyle='#606070';ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(x,y-h*0.88);ctx.lineTo(x,y);ctx.moveTo(x,y);ctx.lineTo(x-w*0.22,y+h*0.08);ctx.moveTo(x,y);ctx.lineTo(x+w*0.22,y+h*0.08);ctx.moveTo(x,y);ctx.lineTo(x,y+h*0.10);ctx.stroke();
}
function computeSubjectLighting(subject,lights){
  const zones={left:0.10,right:0.10,top:0.03,rim:0};
  let rimSide='right';
  const colorAcc={r:0,g:0,b:0,n:0};
  lights.forEach(light=>{
    if(light.visible===false)return;
    const beam=light._objects?.[light.bmIdx];
    if(beam&&beam.visible===false)return;
    const dx=subject.left-light.left,dy=subject.top-light.top;
    const distCm=Math.max(25,px2cm(Math.hypot(dx,dy)));
    let intensity=42000/(distCm*distCm);
    intensity=clamp(intensity,0,1.25);
    const toSub=Math.atan2(subject.top-light.top,subject.left-light.left);
    const aim=deg2rad(light.angle||0);
    const delta=Math.abs(Math.atan2(Math.sin(toSub-aim),Math.cos(toSub-aim)));
    const beamFactor=Math.max(0,1-delta/(Math.PI/2));
    intensity*=Math.pow(beamFactor,1.25);
    if(intensity<0.015)return;
    const relX=light.left-subject.left;
    const relY=light.top-subject.top;
    if(relX<-10)zones.left+=intensity*1.1;
    if(relX>10)zones.right+=intensity*1.1;
    if(Math.abs(relX)<=25){zones.left+=intensity*0.42;zones.right+=intensity*0.42;}
    if(relY<-10)zones.top+=intensity*0.8;
    if(Math.abs(relX)>35){zones.rim+=intensity*0.45;rimSide=relX<0?'left':'right';}
    const tc=getTempRGB(light.lightTemp||'5500K');
    colorAcc.r+=tc.r*intensity;colorAcc.g+=tc.g*intensity;colorAcc.b+=tc.b*intensity;colorAcc.n+=intensity;
  });
  const color=colorAcc.n>0?{r:Math.round(colorAcc.r/colorAcc.n),g:Math.round(colorAcc.g/colorAcc.n),b:Math.round(colorAcc.b/colorAcc.n)}:{r:200,g:215,b:255};
  return {leftIntensity:zones.left,rightIntensity:zones.right,topIntensity:zones.top,rimIntensity:zones.rim,rimSide,color};
}
function drawBeamGlow(ctx,lightItem,subjectItems){
  if(!subjectItems.length)return;
  const tc=getTempRGB(lightItem.obj.lightTemp||'5500K');
  const nearest=subjectItems.reduce((best,it)=>Math.abs(it.z-lightItem.z)<Math.abs(best.z-lightItem.z)?it:best,subjectItems[0]);
  const dx=nearest.x-lightItem.x,dy=(nearest.y-nearest.h*0.45)-(lightItem.y-lightItem.h*0.95);
  const len=Math.hypot(dx,dy);if(len<10)return;
  const angle=Math.atan2(dy,dx);const width=Math.max(18,lightItem.w*0.45);
  ctx.save();ctx.translate(lightItem.x,lightItem.y-lightItem.h*0.95);ctx.rotate(angle);
  const g=ctx.createLinearGradient(0,0,len,0);g.addColorStop(0,`rgba(${tc.r},${tc.g},${tc.b},0.18)`);g.addColorStop(1,`rgba(${tc.r},${tc.g},${tc.b},0)`);
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(len,-width);ctx.lineTo(len,width);ctx.closePath();ctx.fill();ctx.restore();
}
function drawFrontObject(ctx,it,lightingTab=false,lightingMap=null){
  const obj=it.obj,dims=it.dims,lb=(getLbl(obj)||'').toLowerCase();
  if(obj.ctype==='background'){drawBackgroundFront(ctx,it.x,it.y,it.w,it.h);return;}
  if(obj.ctype==='subject'){
    if(dims.type==='subject_sit')drawSittingPerson(ctx,it.x,it.y,it.w*0.7,it.h,lightingTab?lightingMap?.get(obj):null);
    else if(dims.type==='subject_lying'){drawFloorShadow(ctx,it.x,it.y,it.w,it.h,0.04,0.20);ctx.fillStyle='#c892d8';ctx.strokeStyle='#7d38aa';ctx.lineWidth=2;roundRectPath(ctx,it.x-it.w/2,it.y-it.h*0.20,it.w,it.h*0.20,10);ctx.fill();ctx.stroke();ctx.fillStyle='#f1c1a0';ctx.beginPath();ctx.arc(it.x-it.w*0.40,it.y-it.h*0.10,it.h*0.11,0,Math.PI*2);ctx.fill();}
    else if(dims.type==='subject_group'){drawStandingPerson(ctx,it.x-it.w*0.14,it.y,it.w*0.42,it.h,lightingTab?lightingMap?.get(obj):null);drawStandingPerson(ctx,it.x+it.w*0.14,it.y,it.w*0.38,it.h*0.96,lightingTab?lightingMap?.get(obj):null);}
    else if(dims.type==='subject_table'){
      drawFloorShadow(ctx,it.x,it.y,it.w,it.h,0.08,0.26);
      ctx.fillStyle='#e8eaf0';ctx.strokeStyle='#b0b8cc';ctx.lineWidth=2;roundRectPath(ctx,it.x-it.w/2,it.y-it.h*0.32,it.w,it.h*0.32,6);ctx.fill();ctx.stroke();
      ctx.fillStyle='#c8904a';ctx.strokeStyle='#a06830';roundRectPath(ctx,it.x-it.w*0.09,it.y-it.h*0.48,it.w*0.18,it.h*0.18,4);ctx.fill();ctx.stroke();
    } else drawStandingPerson(ctx,it.x,it.y,it.w*0.7,it.h,lightingTab?lightingMap?.get(obj):null);
    if(lightingTab){ const l=lightingMap?.get(obj); if(l){ ctx.save(); ctx.textAlign='left'; ctx.font='9px Inter,Segoe UI,Arial'; ctx.fillStyle='rgba(255,255,255,.65)'; ctx.fillText('Visage',it.x+it.w*0.38,it.y-it.h*0.80); ctx.fillText('Buste',it.x+it.w*0.38,it.y-it.h*0.48); ctx.fillText('Jambes',it.x+it.w*0.38,it.y-it.h*0.14); ctx.restore(); } }
    return;
  }
  if(obj.ctype==='light'){
    if(lightingTab)drawBeamGlow(ctx,it,[...lightingMap.keys()].map(s=>lightingMap.proj.get(s)).filter(Boolean));
    if(dims.type==='softbox'||dims.type==='stripbox')drawSoftboxFront(ctx,it.x,it.y,it.w,it.h);
    else if(dims.type==='octobox')drawOctoboxFront(ctx,it.x,it.y,Math.max(it.w,it.h));
    else if(dims.type==='umbrella')drawUmbrellaFront(ctx,it.x,it.y,Math.max(it.w,it.h));
    else if(dims.type==='dish')drawDishFront(ctx,it.x,it.y,Math.max(it.w,it.h));
    else if(dims.type==='ring')drawRingFront(ctx,it.x,it.y,Math.max(it.w,it.h));
    else if(dims.type==='flash'){drawPanelFront(ctx,it.x,it.y,Math.max(20,it.w*0.65),Math.max(14,it.h*0.9),'#2a2d3e','#4a8eff');}
    else drawPanelFront(ctx,it.x,it.y,it.w,it.h,'#deeeff','#4a8eff');
    return;
  }
  if(obj.ctype==='modifier'){
    if(dims.type==='reflector')drawReflectorFront(ctx,it.x,it.y,it.w,it.h);
    else {
      let fill='#f0f0f4',stroke='#8890a8';
      if(lb.includes('drapeau')){fill='#181820';stroke='#404050';}
      else if(lb.includes('diffusion')){fill='rgba(180,200,255,.35)';stroke='#8890a8';}
      else if(lb.includes('v-flat')){fill='#f5f5f5';stroke='#8890a8';}
      drawPanelFront(ctx,it.x,it.y,it.w,it.h,fill,stroke);
    }
    return;
  }
  if(obj.ctype==='accessory'){
    if(dims.type==='chair')drawChairFront(ctx,it.x,it.y,it.w,it.h);
    else if(dims.type==='tripod')drawTripodFront(ctx,it.x,it.y,it.w,it.h);
    else drawStandFront(ctx,it.x,it.y,it.w,it.h);
  }
}

function normDeg(d){d=((d%360)+360)%360;return d;}
function relYawToCamera(obj,cam){
  return deg2rad(normDeg((obj.angle||0)-(cam.angle||0)));
}
function widthFactorForObject(obj,cam,dims){
  const rel=Math.abs(Math.cos(relYawToCamera(obj,cam)));
  if(['octobox','umbrella','dish','ring','reflector','subject_stand','subject_sit'].includes(dims.type)) return clamp(0.62+0.38*rel,0.45,1);
  if(['background','softbox','stripbox','modifier_panel','panel','flash'].includes(dims.type)) return clamp(0.18+0.82*rel,0.16,1);
  return clamp(0.35+0.65*rel,0.25,1);
}
function hexToRgb(hex){
  hex=hex.replace('#','');
  if(hex.length===3)hex=hex.split('').map(c=>c+c).join('');
  const n=parseInt(hex,16);return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};
}
function rgbStr(c,a=1){return `rgba(${c.r},${c.g},${c.b},${a})`;}
function brighten(hex,f=0.16){const c=hexToRgb(hex);return `rgb(${Math.min(255,Math.round(c.r+(255-c.r)*f))},${Math.min(255,Math.round(c.g+(255-c.g)*f))},${Math.min(255,Math.round(c.b+(255-c.b)*f))})`;}
function darken(hex,f=0.18){const c=hexToRgb(hex);return `rgb(${Math.max(0,Math.round(c.r*(1-f)))},${Math.max(0,Math.round(c.g*(1-f)))},${Math.max(0,Math.round(c.b*(1-f)))})`;}
function sideColorForType(type){
  if(type==='light')return '#4a8eff';
  if(type==='modifier')return '#8890a8';
  if(type==='background')return '#a8afc3';
  if(type==='accessory')return '#6c7186';
  return '#dd7b2e';
}
function topColorForType(type){
  if(type==='light')return '#deeeff';
  if(type==='modifier')return '#f0f0f4';
  if(type==='background')return '#dde0e8';
  if(type==='accessory')return '#8b90a4';
  return '#ffb070';
}
function rectCorners(cx,cy,w,d,ang){
  const hw=w/2,hd=d/2,ca=Math.cos(ang),sa=Math.sin(ang);
  const pts=[[-hw,-hd],[hw,-hd],[hw,hd],[-hw,hd]].map(([x,y])=>({x:cx+x*ca-y*sa,y:cy+x*sa+y*ca}));
  return pts;
}
function isoProject(xCm,yCm,zCm,centerX,baseY,sx,sy,sz){
  return {x:centerX+(xCm-yCm)*sx,y:baseY+(xCm+yCm)*sy-zCm*sz};
}
function drawIsoPrism(ctx,corners,heightCm,opts){
  const {centerX,baseY,sx,sy,sz,topFill,sideFill,stroke}=opts;
  const bot=corners.map(p=>isoProject(p.x,p.y,0,centerX,baseY,sx,sy,sz));
  const top=corners.map(p=>isoProject(p.x,p.y,heightCm,centerX,baseY,sx,sy,sz));
  const edges=[
    {i:[0,1,2,3], shade:sideFill},
  ];
  // visible right side
  ctx.fillStyle=darken(sideFill||topFill||'#888',0.08);
  ctx.beginPath();ctx.moveTo(bot[1].x,bot[1].y);ctx.lineTo(bot[2].x,bot[2].y);ctx.lineTo(top[2].x,top[2].y);ctx.lineTo(top[1].x,top[1].y);ctx.closePath();ctx.fill();
  // visible left/front side
  ctx.fillStyle=darken(sideFill||topFill||'#888',0.18);
  ctx.beginPath();ctx.moveTo(bot[2].x,bot[2].y);ctx.lineTo(bot[3].x,bot[3].y);ctx.lineTo(top[3].x,top[3].y);ctx.lineTo(top[2].x,top[2].y);ctx.closePath();ctx.fill();
  ctx.fillStyle=topFill||'#ddd';
  ctx.beginPath();ctx.moveTo(top[0].x,top[0].y);top.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.closePath();ctx.fill();
  ctx.strokeStyle=stroke||'rgba(0,0,0,.18)';ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(top[0].x,top[0].y);top.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.closePath();ctx.stroke();
  [0,1,2,3].forEach(i=>{ctx.beginPath();ctx.moveTo(bot[i].x,bot[i].y);ctx.lineTo(top[i].x,top[i].y);ctx.stroke();});
  return {top,bot};
}
function drawIsoStand(ctx,xCm,yCm,heightCm,centerX,baseY,sx,sy,sz,color='#606070'){
  const b=isoProject(xCm,yCm,0,centerX,baseY,sx,sy,sz);
  const t=isoProject(xCm,yCm,heightCm,centerX,baseY,sx,sy,sz);
  ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(t.x,t.y);ctx.stroke();
  const feet=[[xCm-8,yCm+4],[xCm+8,yCm+4],[xCm,yCm+10]].map(([x,y])=>isoProject(x,y,0,centerX,baseY,sx,sy,sz));
  feet.forEach(f=>{ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(f.x,f.y);ctx.stroke();});
  return {b,t};
}
function drawIsoHuman(ctx,it,scene){
  const xCm=px2cm(it.obj.left-roomR.left),yCm=px2cm(it.obj.top-roomR.top);
  const ang=deg2rad(it.obj.angle||0);
  const dims=it.dims; const w=dims.w*0.34, d=28;
  const corners=rectCorners(xCm,yCm,w,d,ang);
  drawIsoPrism(ctx,corners,dims.h,{...scene,topFill:'#ffb070',sideFill:'#d96a22',stroke:'rgba(0,0,0,.18)'});
  const head=isoProject(xCm,yCm,dims.h+18,scene.centerX,scene.baseY,scene.sx,scene.sy,scene.sz);
  ctx.fillStyle='#ffc792';ctx.beginPath();ctx.arc(head.x,head.y,Math.max(3,scene.sx*6),0,Math.PI*2);ctx.fill();
}
function drawIsoChair(ctx,it,scene){
  const xCm=px2cm(it.obj.left-roomR.left),yCm=px2cm(it.obj.top-roomR.top),ang=deg2rad(it.obj.angle||0);
  const seat=rectCorners(xCm,yCm,36,34,ang); drawIsoPrism(ctx,seat,45,{...scene,topFill:'#9095a8',sideFill:'#6f7486',stroke:'rgba(0,0,0,.18)'});
  const back=rectCorners(xCm-10*Math.sin(ang),yCm+10*Math.cos(ang),36,8,ang); drawIsoPrism(ctx,back,80,{...scene,topFill:'#7f8798',sideFill:'#626879',stroke:'rgba(0,0,0,.18)'});
}
function drawIsoFlatPanel(ctx,it,scene,type='light'){
  const xCm=px2cm(it.obj.left-roomR.left),yCm=px2cm(it.obj.top-roomR.top),ang=deg2rad(it.obj.angle||0),dims=it.dims;
  const wf=dims.w, df=Math.max(8,dims.type==='stripbox'?10:Math.min(18,dims.w*0.18));
  if(type==='light'||type==='modifier'||type==='accessory')drawIsoStand(ctx,xCm,yCm,dims.elev,scene.centerX,scene.baseY,scene.sx,scene.sy,scene.sz);
  const corners=rectCorners(xCm,yCm,wf,df,ang);
  const topFill=topColorForType(type), sideFill=sideColorForType(type);
  drawIsoPrism(ctx,corners,dims.h*0.08+6,{...scene,topFill,sideFill,stroke:'rgba(0,0,0,.18)'});
}
function drawIsoBackground(ctx,it,scene){
  const xCm=px2cm(it.obj.left-roomR.left),yCm=px2cm(it.obj.top-roomR.top),ang=deg2rad(it.obj.angle||0),dims=it.dims;
  const corners=rectCorners(xCm,yCm,dims.w,10,ang);
  drawIsoPrism(ctx,corners,dims.h,{...scene,topFill:'#dde0e8',sideFill:'#aeb6c9',stroke:'rgba(0,0,0,.18)'});
}
function drawIsoObject(ctx,it,scene){
  if(it.obj.ctype==='subject') return drawIsoHuman(ctx,it,scene);
  if(it.obj.ctype==='background') return drawIsoBackground(ctx,it,scene);
  if(it.obj.ctype==='accessory' && it.dims.type==='chair') return drawIsoChair(ctx,it,scene);
  return drawIsoFlatPanel(ctx,it,scene,it.obj.ctype);
}
function drawIsoScene(ctx,W,H,projected,cam){
  const marginX=46, marginY=34;
  const sx=Math.min((W-marginX*2)/(RW+RH),1.35);
  const isoAngle=((window.VIEW_STATE&&window.VIEW_STATE.isoAngle)||35) * Math.PI/180;
  const isoHeight=clamp((window.VIEW_STATE&&window.VIEW_STATE.isoHeight)||0.55,0.25,1.2);
  const sy=Math.min((H-marginY*2)/(RH*0.55 + RW*0.26 + 180), sx*(0.16 + Math.sin(isoAngle)*0.30));
  const sz=Math.min(sy*isoHeight, 0.48);
  const centerX=W*0.5, baseY=H*0.72;
  const scene={centerX,baseY,sx,sy,sz};
  const bg=ctx.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,'rgba(255,255,255,.06)'); bg.addColorStop(1,'rgba(255,255,255,.015)');
  ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
  const roomPts=[[0,0],[RW,0],[RW,RH],[0,RH]].map(([x,y])=>isoProject(x,y,0,centerX,baseY,sx,sy,sz));
  ctx.fillStyle='rgba(220,228,244,.18)'; ctx.beginPath(); ctx.moveTo(roomPts[0].x,roomPts[0].y); roomPts.slice(1).forEach(p=>ctx.lineTo(p.x,p.y)); ctx.closePath(); ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.18)'; ctx.lineWidth=1; ctx.stroke();
  // grid
  ctx.strokeStyle='rgba(255,255,255,.06)';
  for(let gx=0; gx<=RW; gx+=50){ const a=isoProject(gx,0,0,centerX,baseY,sx,sy,sz), b=isoProject(gx,RH,0,centerX,baseY,sx,sy,sz); ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
  for(let gy=0; gy<=RH; gy+=50){ const a=isoProject(0,gy,0,centerX,baseY,sx,sy,sz), b=isoProject(RW,gy,0,centerX,baseY,sx,sy,sz); ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
  const items=projected.map(it=>{const xCm=px2cm(it.obj.left-roomR.left), yCm=px2cm(it.obj.top-roomR.top), dims=it.dims; return {...it, xCm,yCm, isoDepth:(xCm+yCm)+dims.elev+dims.h*0.5};}).sort((a,b)=>a.isoDepth-b.isoDepth);
  items.forEach(it=>drawIsoObject(ctx,it,scene));
  // camera direction
  const camX=px2cm(cam.left-roomR.left), camY=px2cm(cam.top-roomR.top);
  const cp=isoProject(camX,camY,0,centerX,baseY,sx,sy,sz); const a=deg2rad(cam.angle||0); const fp=isoProject(camX+38*Math.cos(a),camY+38*Math.sin(a),0,centerX,baseY,sx,sy,sz);
  ctx.strokeStyle='rgba(74,142,255,.85)'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cp.x,cp.y-6); ctx.lineTo(fp.x,fp.y-6); ctx.stroke();
  ctx.fillStyle='rgba(74,142,255,.95)'; ctx.beginPath(); ctx.arc(cp.x,cp.y-6,4,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.16)'; ctx.font='9px monospace'; ctx.textAlign='right'; ctx.fillText('Vue isométrique',W-10,H-10);
}

function drawReactiveBackgroundGlow(ctx,W,H,floorY,projected,lightObjs){
  const activeLights=getLightDebugSet(lightObjs||[]);
  if(!activeLights.length) return;
  const backgrounds=projected.filter(it=>it.obj.ctype==='background');
  const targetX=backgrounds.length? backgrounds[0].x : W/2;
  const targetY=backgrounds.length? (backgrounds[0].y-backgrounds[0].h*0.65) : floorY*0.42;
  activeLights.forEach(light=>{
    const it=projected.find(p=>p.obj===light);
    if(!it) return;
    const tc=getTempRGB(light.lightTemp||'5500K');
    const prof=getLightEmissionProfile(light);
    const r=Math.max(80, (it.w+it.h)*0.9*prof.bgBoost + 120);
    const g=ctx.createRadialGradient(targetX,targetY,10,targetX,targetY,r);
    const alpha=Math.min(0.20,0.06 + ((+light.powerWs||300)/1200)*0.12);
    g.addColorStop(0,`rgba(${tc.r},${tc.g},${tc.b},${alpha})`);
    g.addColorStop(0.45,`rgba(${tc.r},${tc.g},${tc.b},${alpha*0.45})`);
    g.addColorStop(1,`rgba(${tc.r},${tc.g},${tc.b},0)`);
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.arc(targetX,targetY,r,0,Math.PI*2); ctx.fill();
  });
}

function drawCam(){
  if(!camOpen)return;
  const c=document.getElementById('camCanvas');
  if(!c.width||!c.height)return;
  const x=c.getContext('2d');
  const W=c.width,H=c.height;
  x.clearRect(0,0,W,H);

  const isDark=document.documentElement.dataset.theme==='dark';
  const bg=x.createLinearGradient(0,0,0,H);
  bg.addColorStop(0,isDark?'#111420':'#1b2030');
  bg.addColorStop(0.62,isDark?'#0c1018':'#121827');
  bg.addColorStop(1,isDark?'#090c12':'#0c1018');
  x.fillStyle=bg;x.fillRect(0,0,W,H);

  const floorY=H*0.88;
  const cyclo=x.createLinearGradient(0,H*0.08,0,floorY);
  cyclo.addColorStop(0,'rgba(255,255,255,.07)');
  cyclo.addColorStop(1,'rgba(255,255,255,.02)');
  x.fillStyle=cyclo;x.fillRect(0,0,W,floorY);
  const floorG=x.createLinearGradient(0,floorY,0,H);
  floorG.addColorStop(0,'rgba(255,255,255,.06)');floorG.addColorStop(1,'rgba(255,255,255,.01)');
  x.fillStyle=floorG;x.fillRect(0,floorY,W,H-floorY);
  x.strokeStyle='rgba(255,255,255,.11)';x.lineWidth=1;x.beginPath();x.moveTo(0,floorY);x.lineTo(W,floorY);x.stroke();

  for(let i=0;i<=8;i++){
    const t=i/8;const gx=W*t;x.strokeStyle='rgba(255,255,255,.03)';x.lineWidth=.5;
    x.beginPath();x.moveTo(W/2,floorY);x.lineTo(gx,H);x.stroke();
  }
  for(let i=1;i<=4;i++){
    const gy=floorY+(H-floorY)*(i/5);x.strokeStyle='rgba(255,255,255,.025)';
    x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke();
  }

  const cam=cv.getObjects().find(o=>o.ctype==='camera'&&o.visible!==false);
  if(!cam){
    x.fillStyle='rgba(255,255,255,.38)';x.font='13px Inter,Segoe UI,Arial';x.textAlign='center';x.fillText('Ajoutez une caméra',W/2,H/2);return;
  }

  const sceneObjects=cv.getObjects().filter(o=>o.visible!==false&&o!==cam&&['subject','light','modifier','background','accessory'].includes(o.ctype));
  const focal=Math.max(640, W*1.15);
  const projected=[];
  sceneObjects.forEach(obj=>{
    const p=projectToCamera(obj,cam);if(p.z<=1)return;
    const zCm=px2cm(p.z),xCm=px2cm(p.x),dims=getViewDims(obj);
    const scale=focal/(zCm+90);
    const screenX=W/2+(xCm/zCm)*(focal*0.92);
    const angleFactor=widthFactorForObject(obj,cam,dims);
    const w=Math.max(8,dims.w*scale*angleFactor),h=Math.max(8,dims.h*scale),elevPx=dims.elev*scale;
    projected.push({obj,dims,z:zCm,x:screenX,y:floorY-elevPx,w,h,scale,angleFactor});
  });
  projected.sort((a,b)=>b.z-a.z);

  const lightingMap=new Map();
  lightingMap.proj=new Map();
  const lightObjs=getLightDebugSet(cv.getObjects().filter(o=>o.ctype==='light'&&o.visible!==false));
  projected.forEach(it=>{if(it.obj.ctype==='subject')lightingMap.proj.set(it.obj,it);});
  projected.forEach(it=>{if(it.obj.ctype==='subject')lightingMap.set(it.obj,computeSubjectLighting(it.obj,lightObjs));});

  if(!projected.length){
    x.fillStyle='rgba(255,255,255,.35)';x.font='13px Inter,Segoe UI,Arial';x.textAlign='center';x.fillText('Aucun objet visible dans le champ caméra',W/2,H/2);return;
  }

  if(camTab==='light') drawReactiveBackgroundGlow(x,W,H,floorY,projected,lightObjs);

  if(camTab==='iso'){
    drawIsoScene(x,W,H,projected,cam);
    x.fillStyle='rgba(74,142,255,.78)';x.font='11px Inter,sans-serif';x.textAlign='left';x.fillText(`📷 ${getLbl(cam)}`,10,H-10);
    return;
  }

  projected.forEach(it=>{
    drawFrontObject(x,it,camTab==='light',lightingMap);
    x.fillStyle='rgba(255,255,255,.78)';x.font=`${Math.max(9,Math.round(10*it.scale+8))}px Inter,Segoe UI,Arial`;x.textAlign='center';
    x.fillText(getLbl(it.obj),it.x,it.y+18);
    x.fillStyle='rgba(255,255,255,.42)';x.font='9px monospace';x.fillText(`${Math.round(it.z)} cm`,it.x,it.y+30);
  });

  if(window.currentFrameRatio){
    const ratios={'3:2':3/2,'4:5':4/5,'1:1':1,'16:9':16/9};
    const r=ratios[window.currentFrameRatio]||3/2;
    let fw=W*0.86, fh=fw/r; if(fh>H*0.76){ fh=H*0.76; fw=fh*r; }
    const fx=(W-fw)/2, fy=(H-fh)/2-8;
    x.strokeStyle='rgba(255,255,255,.22)'; x.lineWidth=1; x.strokeRect(fx,fy,fw,fh);
    x.strokeStyle='rgba(255,255,255,.10)';
    x.beginPath(); x.moveTo(fx+fw/3,fy); x.lineTo(fx+fw/3,fy+fh); x.moveTo(fx+2*fw/3,fy); x.lineTo(fx+2*fw/3,fy+fh); x.moveTo(fx,fy+fh/3); x.lineTo(fx+fw,fy+fh/3); x.moveTo(fx,fy+2*fh/3); x.lineTo(fx+fw,fy+2*fh/3); x.stroke();
    x.strokeStyle='rgba(255,255,255,.12)'; x.strokeRect(fx+fw*0.06,fy+fh*0.06,fw*0.88,fh*0.88);
  }

  const vign=x.createRadialGradient(W/2,H*0.48,Math.min(W,H)*0.18,W/2,H*0.48,Math.max(W,H)*0.68);
  vign.addColorStop(0,'rgba(0,0,0,0)');vign.addColorStop(1,'rgba(0,0,0,.24)');
  x.fillStyle=vign;x.fillRect(0,0,W,H);

  x.fillStyle='rgba(74,142,255,.75)';x.font='11px Inter,sans-serif';x.textAlign='left';x.fillText(`📷 ${getLbl(cam)}`,10,H-10);
  x.fillStyle='rgba(255,255,255,.16)';x.font='9px monospace';x.textAlign='right';x.fillText(camTab==='light'?'Vue de face · éclairage':'Vue de face · positions',W-10,H-10);
}
function getTempRGB(temp){
  const m={'2800K':{r:255,g:160,b:70},'3200K':{r:255,g:195,b:110},'3500K':{r:255,g:225,b:165},
    '5500K':{r:200,g:215,b:255},'6500K':{r:188,g:208,b:255},'7000K':{r:178,g:200,b:255},
    'Rose':{r:255,g:90,b:255},'Vert':{r:90,g:245,b:90}};
  for(const k in m)if(temp&&temp.startsWith(k.split('K')[0]+'K'))return m[k];
  if(temp&&temp.startsWith('Rose'))return m.Rose;
  if(temp&&temp.startsWith('Vert'))return m.Vert;
  return{r:200,g:215,b:255};
}
