window.SP_APP = window.SP_APP || {};
// ═══════════════════════════════════════════════════════════════
// GLOBALS
// ═══════════════════════════════════════════════════════════════
const cv=new fabric.Canvas('c',{backgroundColor:'#fff',preserveObjectStacking:true,selection:true});
let RW=600,RH=400,PPX=20,GS=50;
let roomR=null,roomL=null,gridO=[];
let freeMove=false,spaceKey=false,panning=false,panPt={x:0,y:0};
let zoom=1,snapOn=true,showDist=false,camOpen=false,camTab='pos';
let undoSt=[],redoSt=[],undoLock=false;
let distLines={};

// Color palette per object category — clear visual identity
const PAL={
  light:   {fill:'#deeeff',stroke:'#4a8eff',beam:'rgba(74,142,255,.14)',hot:'rgba(255,255,255,.5)'},
  warm:    {fill:'#ffefd4',stroke:'#f5a623',beam:'rgba(245,166,35,.14)',hot:'rgba(255,255,255,.5)'},
  modifier:{fill:'#f0f0f4',stroke:'#8890a8',bg:'#e4e6ed'},
  subject: {fill:'#ff9040',stroke:'#e06820',shadow:'rgba(0,0,0,.18)'},
  camera:  {fill:'#2a2d3e',stroke:'#3d4158',lens:'#1a1c28'},
  accessory:{fill:'#70758a',stroke:'#505568'},
  background:{fill:'#dde0e8',stroke:'#9098b0'},
};

const REAL_EQ={
  godox_sk400ii:{kind:'light', base:'flash_studio', label:'Godox SK400II', powerWs:400, view:{w:25,h:18,elev:150,type:'flash'}},
  godox_ad200:{kind:'light', base:'flash_studio', label:'Godox AD200Pro', powerWs:200, view:{w:18,h:12,elev:145,type:'flash'}},
  godox_ad400:{kind:'light', base:'flash_studio', label:'Godox AD400Pro', powerWs:400, view:{w:24,h:16,elev:150,type:'flash'}},
  aputure_300d:{kind:'light', base:'fresnel', label:'Aputure 300D', powerWs:300, view:{w:28,h:28,elev:165,type:'spot'}},
  godox_octa120:{kind:'modifier', base:'octo_120', label:'Godox Octa 120', view:{w:120,h:120,elev:150,type:'octobox'}},
  godox_strip30120:{kind:'modifier', base:'stripbox_30x120', label:'Godox Stripbox 30×120', view:{w:30,h:120,elev:150,type:'stripbox'}},
  umbrella_silver105:{kind:'modifier', base:'umbrella_100', label:'Parapluie argent 105', view:{w:105,h:105,elev:150,type:'umbrella'}},
  umbrella_white105:{kind:'modifier', base:'umbrella_100', label:'Parapluie blanc 105', view:{w:105,h:105,elev:150,type:'umbrella'}}
};

const EQ={
  softbox_60x60:{t:'rect',lb:'Softbox 60×60',w:60,h:60,b:120},
  softbox_90x120:{t:'rect',lb:'Softbox 90×120',w:90,h:120,b:160},
  stripbox_30x120:{t:'rect',lb:'Stripbox 30×120',w:30,h:120,b:180},
  octo_90:{t:'oct',lb:'Octobox 90',d:90,b:140},
  octo_120:{t:'oct',lb:'Octobox 120',d:120,b:170},
  octo_150:{t:'oct',lb:'Octobox 150',d:150,b:200},
  umbrella_100:{t:'umb',lb:'Parapluie 100',d:100,b:160},
  umbrella_120:{t:'umb',lb:'Parapluie 120',d:120,b:180},
  beauty_dish_42:{t:'dish',lb:'Beauty Dish 42',d:42,b:110},
  beauty_dish_55:{t:'dish',lb:'Beauty Dish 55',d:55,b:130},
  flash_studio:{t:'flash',lb:'Flash studio',w:25,h:15,b:100},
  led_panel_small:{t:'rect',lb:'LED panel S',w:30,h:20,b:90},
  led_panel_large:{t:'rect',lb:'LED panel L',w:60,h:30,b:120},
  ring_light_45:{t:'ring',lb:'Ring light 45',d:45,b:100},
  fresnel:{t:'spot',lb:'Fresnel',d:25,b:120},
  snoot:{t:'spot',lb:'Snoot',d:12,b:80},
  bare_bulb:{t:'bare',lb:'Bare bulb',d:10,b:100},
  reflector_80:{t:'refl',lb:'Réflecteur 80',d:80},
  reflector_110x180:{t:'panel',lb:'Panneau 110×180',w:110,h:180},
  scrim_120x120:{t:'panel',lb:'Diffusion 120×120',w:120,h:120,fill:'rgba(180,200,255,.35)'},
  vflat_100x200:{t:'panel',lb:'V-Flat 100×200',w:100,h:200,fill:'#f5f5f5'},
  flag_60x90:{t:'panel',lb:'Drapeau 60×90',w:60,h:90,fill:'#181820'},
  barn_door:{t:'barn',lb:'Coupe-flux',w:24,h:18},
  grid_40:{t:'grid',lb:'Grid 40°',d:20},
  gel:{t:'gel',lb:'Gélatine',w:25,h:20}
};



// ═══════════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════════
const cm2px=c=>(c/10)*PPX;
const px2cm=p=>(p/PPX)*10;
const snap=v=>{if(!snapOn)return v;const g=cm2px(GS);return Math.round(v/g)*g;};
const poly=(n,r)=>{const p=[];for(let i=0;i<n;i++){const a=(Math.PI*2*i/n)-Math.PI/2;p.push({x:Math.cos(a)*r,y:Math.sin(a)*r});}return p;};
const dist2=(a,b)=>{const dx=a.left-b.left,dy=a.top-b.top;return Math.round(px2cm(Math.sqrt(dx*dx+dy*dy)));};
const set$=(id,v)=>{const e=document.getElementById(id);if(e){if(e.tagName==='INPUT')e.value=v;else e.textContent=v;}};
function getLbl(o){if(typeof o.lblIdx==='number'&&o._objects?.[o.lblIdx]?.text)return o._objects[o.lblIdx].text;if(o.text)return o.text;return o.ctype||'objet';}

let toastTimer=null;
function toast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1800);
}



// ═══════════════════════════════════════════════════════════════
// OBJECT FACTORY  —  identités visuelles distinctes
// ═══════════════════════════════════════════════════════════════

function mkLabel(txt,top=0){
  return new fabric.Text(txt,{
    left:0,top,originX:'center',fontSize:10,fontWeight:'600',
    fill:'#1a1b23',fontFamily:'"Inter","Segoe UI",Arial',
    shadow:new fabric.Shadow({color:'rgba(255,255,255,.9)',blur:3,offsetX:0,offsetY:0})
  });
}

/* ─── BEAM / FOV cones ─── */
function mkBeam(len,wid,color='rgba(74,142,255,.14)'){
  const b=new fabric.Polygon([{x:0,y:0},{x:len,y:-wid/2},{x:len,y:wid/2}],
    {originX:'center',originY:'center',fill:color,
     stroke:color.replace(/[\d.]+\)$/,'0.25)'),strokeWidth:1,selectable:false,evented:false});
  b._beam=true;return b;
}
function mkFOV(len,wid){
  const f=new fabric.Polygon([{x:0,y:0},{x:len,y:-wid/2},{x:len,y:wid/2}],
    {originX:'center',originY:'center',fill:'rgba(74,142,255,.06)',
     stroke:'rgba(74,142,255,.18)',strokeWidth:1,strokeDashArray:[5,3],selectable:false,evented:false});
  f._beam=true;return f;
}

/* ─── STAND ─── shared for all lights/modifiers */
function mkStand(h=36){
  const sh=new fabric.Shadow({color:'rgba(0,0,0,.15)',blur:4,offsetX:1,offsetY:2});
  return new fabric.Group([
    new fabric.Line([0,-h/2,0,h/2],{stroke:'#606070',strokeWidth:2.5,shadow:sh}),
    new fabric.Line([0,h/2,-10,h/2+8],{stroke:'#606070',strokeWidth:2}),
    new fabric.Line([0,h/2,10,h/2+8],{stroke:'#606070',strokeWidth:2}),
    new fabric.Line([0,h/2,0,h/2+11],{stroke:'#606070',strokeWidth:2}),
    new fabric.Circle({radius:2.5,left:-10,top:h/2+8,fill:'#404050',originX:'center',originY:'center'}),
    new fabric.Circle({radius:2.5,left:10,top:h/2+8,fill:'#404050',originX:'center',originY:'center'}),
    new fabric.Circle({radius:2.5,left:0,top:h/2+11,fill:'#404050',originX:'center',originY:'center'})
  ],{left:0,top:0,originX:'center',originY:'center'});
}

/* ─── SOFTBOX — blue identity, visible grid ─── */
function mkSoftbox(w,h,p=PAL.light){
  const sh=new fabric.Shadow({color:'rgba(74,142,255,.2)',blur:10,offsetX:0,offsetY:0});
  const outer=new fabric.Rect({width:w,height:h,fill:p.stroke,stroke:'none',rx:3,ry:3,originX:'center',originY:'center',shadow:sh});
  const inner=new fabric.Rect({width:w-4,height:h-4,fill:p.fill,stroke:'none',rx:2,ry:2,originX:'center',originY:'center'});
  const lines=[];
  const nc=Math.min(5,Math.round(w/10)),nr=Math.min(5,Math.round(h/10));
  for(let i=1;i<nc;i++)lines.push(new fabric.Line([-w/2+i*(w/nc),-h/2+2,-w/2+i*(w/nc),h/2-2],{stroke:'rgba(74,142,255,.3)',strokeWidth:.6,selectable:false,evented:false}));
  for(let i=1;i<nr;i++)lines.push(new fabric.Line([-w/2+2,-h/2+i*(h/nr),w/2-2,-h/2+i*(h/nr)],{stroke:'rgba(74,142,255,.3)',strokeWidth:.6,selectable:false,evented:false}));
  const hotW=Math.min(w*.5,22),hotH=Math.min(h*.5,22);
  const hot=new fabric.Ellipse({rx:hotW/2,ry:hotH/2,fill:p.hot,stroke:'none',originX:'center',originY:'center'});
  return new fabric.Group([outer,inner,...lines,hot],{originX:'center',originY:'center'});
}

/* ─── OCTOBOX — teal/blue with 8 segments ─── */
function mkOcto(r,p=PAL.light){
  const sh=new fabric.Shadow({color:'rgba(74,142,255,.2)',blur:10});
  const outer=new fabric.Polygon(poly(8,r),{fill:p.stroke,stroke:'none',originX:'center',originY:'center',shadow:sh});
  const mid=new fabric.Polygon(poly(8,r*.92),{fill:p.fill,stroke:'none',originX:'center',originY:'center'});
  const segs=[];
  for(let i=0;i<8;i++){const a=(Math.PI*2*i/8)-Math.PI/2;segs.push(new fabric.Line([0,0,Math.cos(a)*(r*.88),Math.sin(a)*(r*.88)],{stroke:'rgba(74,142,255,.25)',strokeWidth:.8,selectable:false,evented:false}));}
  const hot=new fabric.Circle({radius:r*.22,fill:p.hot,stroke:'none',originX:'center',originY:'center'});
  return new fabric.Group([outer,mid,...segs,hot],{originX:'center',originY:'center'});
}

/* ─── UMBRELLA — arched ribs, distinct shape ─── */
function mkUmbrella(r,p=PAL.light){
  const sh=new fabric.Shadow({color:'rgba(74,142,255,.2)',blur:8});
  const ribs=[];
  for(let i=0;i<9;i++){const a=-Math.PI+(Math.PI*i/8);ribs.push(new fabric.Line([0,0,Math.cos(a)*r,Math.sin(a)*r],{stroke:p.stroke,strokeWidth:.9,selectable:false,evented:false}));}
  const canopy=new fabric.Circle({radius:r,fill:p.fill,stroke:p.stroke,strokeWidth:1.5,startAngle:180,endAngle:360,originX:'center',originY:'center',shadow:sh});
  const handle=new fabric.Line([0,0,r*.9,0],{stroke:'#808090',strokeWidth:2});
  const tip=new fabric.Circle({radius:2.5,left:r*.9,top:0,fill:'#606070',originX:'center',originY:'center'});
  return new fabric.Group([canopy,...ribs,handle,tip],{originX:'center',originY:'center'});
}

/* ─── BEAUTY DISH — silver rim + deflector ─── */
function mkDish(r,p=PAL.light){
  const sh=new fabric.Shadow({color:'rgba(74,142,255,.2)',blur:10});
  const rim=new fabric.Circle({radius:r,fill:'rgba(200,210,230,.4)',stroke:p.stroke,strokeWidth:2,originX:'center',originY:'center',shadow:sh});
  const bowl=new fabric.Circle({radius:r*.88,fill:p.fill,stroke:p.stroke,strokeWidth:1,originX:'center',originY:'center'});
  const rads=[];
  for(let i=0;i<12;i++){const a=Math.PI*2*i/12;rads.push(new fabric.Line([Math.cos(a)*r*.32,Math.sin(a)*r*.32,Math.cos(a)*r*.82,Math.sin(a)*r*.82],{stroke:'rgba(74,142,255,.15)',strokeWidth:.5,selectable:false,evented:false}));}
  const defl=new fabric.Circle({radius:r*.28,fill:'#e8eef8',stroke:p.stroke,strokeWidth:1.5,originX:'center',originY:'center'});
  const hot=new fabric.Circle({radius:r*.1,fill:p.hot,stroke:'none',originX:'center',originY:'center'});
  return new fabric.Group([rim,bowl,...rads,defl,hot],{originX:'center',originY:'center'});
}

/* ─── RING LIGHT — LED dots ring ─── */
function mkRingLight(r,p=PAL.light){
  const sw=Math.max(7,r*.2);
  const sh=new fabric.Shadow({color:'rgba(74,142,255,.25)',blur:12});
  const bg=new fabric.Circle({radius:r+sw*.6,fill:'rgba(200,220,255,.1)',stroke:'none',originX:'center',originY:'center'});
  const ring=new fabric.Circle({radius:r,fill:'transparent',stroke:p.stroke,strokeWidth:sw,originX:'center',originY:'center',shadow:sh});
  const cnt=Math.max(12,Math.floor(r*.6));
  const dots=[];
  for(let i=0;i<cnt;i++){const a=Math.PI*2*i/cnt;dots.push(new fabric.Circle({radius:1.8,left:Math.cos(a)*r,top:Math.sin(a)*r,fill:'rgba(240,250,255,.9)',stroke:'none',originX:'center',originY:'center'}));}
  const glass=new fabric.Circle({radius:r*.48,fill:'rgba(210,230,255,.06)',stroke:'rgba(74,142,255,.1)',strokeWidth:1,originX:'center',originY:'center'});
  return new fabric.Group([bg,...dots,ring,glass],{originX:'center',originY:'center'});
}

/* ─── FLASH / SPOT / BARE ─── */
function mkFlash(w,h,p=PAL.light){
  const sh=new fabric.Shadow({color:'rgba(74,142,255,.15)',blur:6,offsetX:1,offsetY:2});
  return new fabric.Group([
    new fabric.Rect({width:w,height:h,fill:'#2a2d3e',stroke:'#3d4158',strokeWidth:1,rx:3,originX:'center',originY:'center',shadow:sh}),
    new fabric.Ellipse({rx:w*.3,ry:h*.42,fill:p.fill,stroke:p.stroke,strokeWidth:1,originX:'center',originY:'center'}),
    new fabric.Ellipse({rx:w*.12,ry:h*.18,fill:p.hot,stroke:'none',originX:'center',originY:'center'})
  ],{originX:'center',originY:'center'});
}
function mkSpot(r,p=PAL.light){
  const sh=new fabric.Shadow({color:'rgba(74,142,255,.15)',blur:6});
  return new fabric.Group([
    new fabric.Circle({radius:r,fill:'#2a2d3e',stroke:'#3d4158',strokeWidth:1.5,shadow:sh}),
    new fabric.Circle({radius:r*.7,fill:'#1e2030',stroke:'#303450',strokeWidth:1}),
    new fabric.Circle({radius:r*.42,fill:p.fill,stroke:p.stroke,strokeWidth:1}),
    new fabric.Circle({radius:r*.16,fill:p.hot,stroke:'none'}),
    new fabric.Triangle({width:r*1.1,height:r*1.3,left:r*.7,fill:'rgba(74,142,255,.3)',stroke:'rgba(74,142,255,.2)',strokeWidth:.5,originX:'center',originY:'center',angle:90})
  ],{originX:'center',originY:'center'});
}
function mkBare(r){
  const sh=new fabric.Shadow({color:'rgba(245,166,35,.3)',blur:14});
  return new fabric.Group([
    new fabric.Circle({radius:r*2.2,fill:'rgba(255,220,80,.08)',stroke:'none',originX:'center',originY:'center'}),
    new fabric.Circle({radius:r,fill:'#fffce0',stroke:'#e8c870',strokeWidth:1.5,originX:'center',originY:'center',shadow:sh}),
    new fabric.Circle({radius:r*.55,fill:'rgba(255,248,180,.7)',stroke:'none',originX:'center',originY:'center'}),
    new fabric.Circle({radius:r*.2,fill:'rgba(255,255,255,.95)',stroke:'none',originX:'center',originY:'center'})
  ],{originX:'center',originY:'center'});
}

/* ─── SUBJECT — warm orange, human silhouette ─── */
function mkHumanVariant(opts={}){
  const gender=opts.gender||'male';
  const pose=opts.pose||'stand';
  const scale=opts.scale||1;
  const skin=opts.skin||(gender==='female'?'#f3b18d':gender==='child'?'#f4c29e':'#e9a27c');
  const stroke=opts.stroke||(gender==='female'?'#c77854':'#b56742');
  const cloth=opts.cloth||(gender==='female'?'#8f5bd6':'#3f6bd9');
  const cloth2=opts.cloth2||(gender==='female'?'#5f3ca8':'#274b9e');
  const hair=opts.hair||(gender==='female'?'#6b4028':gender==='child'?'#8b5a3c':'#4d3326');
  const shoulder=gender==='female'?10.5:gender==='child'?8:12;
  const torsoH=gender==='female'?24:gender==='child'?18:23;
  const headR=gender==='child'?9.5:10.5;
  const sh=new fabric.Shadow({color:'rgba(0,0,0,.16)',blur:8,offsetX:2,offsetY:3});
  const items=[];
  if(pose==='stand'){
    items.push(new fabric.Circle({radius:headR,top:-42*scale,fill:skin,stroke,strokeWidth:.7,originX:'center',originY:'center'}));
    items.push(new fabric.Rect({width:7*scale,height:8*scale,top:-28*scale,fill:skin,stroke:'none',rx:2,originX:'center',originY:'center'}));
    items.push(new fabric.Ellipse({rx:shoulder*scale,ry:torsoH*0.55*scale,top:-9*scale,fill:cloth,stroke:cloth2,strokeWidth:.8,originX:'center',originY:'center'}));
    items.push(new fabric.Polygon([{x:0,y:0},{x:-9*scale,y:4*scale},{x:-8*scale,y:22*scale},{x:2*scale,y:22*scale}],{fill:cloth,stroke:'none',left:-shoulder*0.95*scale,top:-22*scale,originX:'center',originY:'center'}));
    items.push(new fabric.Polygon([{x:0,y:0},{x:9*scale,y:4*scale},{x:8*scale,y:22*scale},{x:-2*scale,y:22*scale}],{fill:cloth,stroke:'none',left:shoulder*0.95*scale,top:-22*scale,originX:'center',originY:'center'}));
    items.push(new fabric.Polygon([{x:-7*scale,y:0},{x:0,y:0},{x:-1*scale,y:27*scale},{x:-8*scale,y:27*scale}],{fill:'#28324d',stroke:'none',left:-3*scale,top:1*scale,originX:'center',originY:'center'}));
    items.push(new fabric.Polygon([{x:0,y:0},{x:7*scale,y:0},{x:8*scale,y:27*scale},{x:1*scale,y:27*scale}],{fill:'#28324d',stroke:'none',left:3*scale,top:1*scale,originX:'center',originY:'center'}));
    if(gender!=='child') items.push(new fabric.Ellipse({rx:(gender==='female'?12:11)*scale,ry:4.5*scale,top:-48*scale,fill:hair,stroke:'none',originX:'center',originY:'center'}));
  } else if(pose==='sit'){
    items.push(new fabric.Circle({radius:headR, left:-4*scale, top:-34*scale, fill:skin, stroke, strokeWidth:.7, originX:'center',originY:'center'}));
    items.push(new fabric.Rect({width:26*scale,height:10*scale,fill:'#9090a0',stroke:'#70708a',strokeWidth:1,rx:3,top:6*scale,originX:'center',originY:'center'}));
    items.push(new fabric.Rect({width:7*scale,height:24*scale,left:-11*scale,top:-10*scale,fill:'#7a8296',stroke:'none',rx:2,originX:'center',originY:'center'}));
    items.push(new fabric.Polygon([{x:-9*scale,y:0},{x:10*scale,y:0},{x:8*scale,y:21*scale},{x:-7*scale,y:21*scale}],{fill:cloth,stroke:'none',top:-22*scale,originX:'center',originY:'center'}));
    items.push(new fabric.Polygon([{x:-7*scale,y:0},{x:0,y:0},{x:15*scale,y:18*scale},{x:7*scale,y:18*scale}],{fill:'#28324d',stroke:'none',top:2*scale,originX:'center',originY:'center'}));
    items.push(new fabric.Polygon([{x:0,y:0},{x:8*scale,y:0},{x:8*scale,y:18*scale},{x:-2*scale,y:18*scale}],{fill:'#28324d',stroke:'none',left:4*scale,top:2*scale,originX:'center',originY:'center'}));
  } else if(pose==='lying'){
    items.push(new fabric.Ellipse({rx:22*scale,ry:8*scale,fill:cloth,stroke:cloth2,strokeWidth:1,originX:'center',originY:'center'}));
    items.push(new fabric.Circle({radius:headR*0.9, left:-25*scale, top:0, fill:skin, stroke, strokeWidth:.7, originX:'center',originY:'center'}));
    items.push(new fabric.Rect({width:18*scale,height:5*scale,left:22*scale,top:0,fill:'#28324d',stroke:'none',rx:2,originX:'center',originY:'center'}));
  }
  return new fabric.Group(items,{originX:'center',originY:'center',shadow:sh});
}

/* ─── CAMERA — dark body, distinct lens ─── */
function mkCamBody(){
  const p=PAL.camera;
  const sh=new fabric.Shadow({color:'rgba(0,0,0,.3)',blur:8,offsetX:2,offsetY:3});
  const body=new fabric.Rect({width:34,height:22,fill:p.fill,stroke:p.stroke,strokeWidth:1,rx:3,originX:'center',originY:'center',shadow:sh});
  const grip=new fabric.Rect({width:10,height:22,left:-12,fill:'#1e2030',stroke:'none',rx:3,originX:'center',originY:'center'});
  const vf=new fabric.Rect({width:10,height:6,top:-14,fill:'#181828',stroke:'#2a2c40',strokeWidth:1,rx:2,originX:'center',originY:'center'});
  const barrel=new fabric.Circle({radius:8,left:6,fill:'#141624',stroke:'#30324a',strokeWidth:2,originX:'center',originY:'center'});
  const inner=new fabric.Circle({radius:5.5,left:6,fill:'#0e101c',stroke:'#3a3c55',strokeWidth:1,originX:'center',originY:'center'});
  const glass=new fabric.Circle({radius:3.5,left:6,fill:'rgba(60,80,160,.65)',stroke:'none',originX:'center',originY:'center'});
  const refl=new fabric.Circle({radius:1.3,left:5,top:-1,fill:'rgba(255,255,255,.45)',stroke:'none',originX:'center',originY:'center'});
  const shutter=new fabric.Circle({radius:2.5,left:-12,top:-12,fill:'#cc3333',stroke:'none',originX:'center',originY:'center'});
  return new fabric.Group([body,grip,vf,barrel,inner,glass,refl,shutter],{originX:'center',originY:'center'});
}

function meta(g,m={}){
  g.ctype=m.ctype||'obj';g.hasBeam=!!m.hasBeam;g.beamLen=m.beamLen||140;
  g.lblIdx=m.lblIdx??null;g.bmIdx=m.bmIdx??null;g.isSO=true;
  g.lockScalingFlip=true;g.transparentCorners=false;g.cornerStyle='circle';
  g.borderColor='rgba(74,142,255,.7)';g.cornerColor='#4a8eff';
  g.cornerStrokeColor='#fff';g.cornerSize=7;g.padding=2;
  g.shadow=new fabric.Shadow({color:'rgba(0,0,0,.16)',blur:10,offsetX:2,offsetY:4});
  return g;
}
function addStudioMarker(obj){
  // Le marqueur d'angle n'est plus injecté dans le groupe Fabric.
  // Sinon il fausse la bounding box, le positionnement apparent et la taille de sélection.
  return obj;
}

function drawOrientationMarker(ctx,obj){
  if(!obj || !obj.visible || obj._room || obj._grid || obj._legend || obj.ctype==='note' || obj.ctype==='measure') return;
  const w=obj.getScaledWidth?obj.getScaledWidth():((obj.width||0)*(obj.scaleX||1));
  const h=obj.getScaledHeight?obj.getScaledHeight():((obj.height||0)*(obj.scaleY||1));
  const r=Math.max(10,Math.min(16,Math.max(w,h)*0.10));
  const oy=-(h/2)-r-6;
  ctx.save();
  ctx.translate(obj.left,obj.top);
  ctx.rotate(fabric.util.degreesToRadians(obj.angle||0));
  ctx.beginPath();
  ctx.fillStyle='rgba(255,255,255,.96)';
  ctx.strokeStyle='rgba(0,0,0,.14)';
  ctx.lineWidth=1;
  ctx.arc(0,oy,r,0,Math.PI*2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(r*0.72,oy);
  ctx.lineTo(-r*0.18,oy-r*0.56);
  ctx.lineTo(-r*0.18,oy+r*0.56);
  ctx.closePath();
  ctx.fillStyle='#4a8eff';
  ctx.strokeStyle='rgba(255,255,255,.9)';
  ctx.lineWidth=1;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}
function place(obj){
  obj.set({left:roomR.left+roomR.width/2,top:roomR.top+roomR.height/2,visible:true,opacity:1,scaleX:1,scaleY:1});
  obj.setCoords();cv.add(obj);cv.bringToFront(obj);cv.setActiveObject(obj);cv.requestRenderAll();
  syncSel();buildLayers();if(camOpen)drawCam();
}
const sel=()=>cv.getActiveObject();



// ═══════════════════════════════════════════════════════════════
// CANVAS INIT
// ═══════════════════════════════════════════════════════════════
function init(){fitCanvas();drawRoom();drawGrid();drawLegend();bindEvents();}
function fitCanvas(){
  const w2=document.getElementById('cvWrap');
  const w=Math.max(w2.clientWidth||900,cm2px(RW)+180);
  const h=Math.max(w2.clientHeight||700,cm2px(RH)+180);
  cv.setWidth(w);cv.setHeight(h);cv.calcOffset();cv.requestRenderAll();
}
function drawRoom(){
  const x=80,y=80,w=cm2px(RW),h=cm2px(RH);
  roomR=new fabric.Rect({left:x,top:y,width:w,height:h,fill:'#fafbfc',stroke:'#b0b8cc',strokeWidth:1.5,selectable:false,evented:false,rx:2});
  roomR._room=true;
  const wallN=new fabric.Rect({left:x,top:y,width:w,height:5,fill:'#c8d0e0',stroke:'none',selectable:false,evented:false});wallN._room=true;
  const wallW=new fabric.Rect({left:x,top:y,width:5,height:h,fill:'#d0d8e8',stroke:'none',selectable:false,evented:false});wallW._room=true;
  roomL=new fabric.Text(`${RW} × ${RH} cm`,{left:x+8,top:y-20,fontSize:11,fill:'#9098b0',selectable:false,evented:false,fontFamily:'"Inter","Segoe UI",Arial'});
  roomL._room=true;
  [roomR,wallN,wallW,roomL].forEach(o=>cv.add(o));roomR.sendToBack();
}
function drawGrid(){
  gridO.forEach(o=>cv.remove(o));gridO=[];
  const g=cm2px(GS),x0=roomR.left,y0=roomR.top,x1=x0+roomR.width,y1=y0+roomR.height;
  for(let x=x0;x<=x1;x+=g){
    const l=new fabric.Line([x,y0,x,y1],{stroke:'#e0e4ee',strokeWidth:.8,selectable:false,evented:false});
    l._grid=true;gridO.push(l);cv.add(l);
  }
  for(let y=y0;y<=y1;y+=g){
    const l=new fabric.Line([x0,y,x1,y],{stroke:'#e0e4ee',strokeWidth:.8,selectable:false,evented:false});
    l._grid=true;gridO.push(l);cv.add(l);
  }
  gridO.forEach(o=>o.sendToBack());if(roomR)roomR.sendToBack();
}
function drawLegend(){
  cv.getObjects().filter(o=>o._legend).forEach(o=>cv.remove(o));
  const lg=new fabric.Group([
    new fabric.Rect({left:0,top:0,width:155,height:36,fill:'rgba(255,255,255,.96)',stroke:'#c8d0e0',rx:5}),
    new fabric.Line([10,20,52,20],{stroke:'#4a8eff',strokeWidth:2}),
    new fabric.Text(`${GS} cm`,{left:60,top:5,fontSize:11,fill:'#2a3050',fontFamily:'"Inter","Segoe UI",Arial'}),
    new fabric.Text(`${PPX}px / 10cm`,{left:60,top:19,fontSize:9,fill:'#9098b0',fontFamily:'"Inter","Segoe UI",Arial'})
  ],{left:roomR.left+roomR.width-165,top:roomR.top+roomR.height+12,selectable:false,evented:false});
  lg._legend=true;cv.add(lg);
}
function applyRoom(){
  RW=+document.getElementById('rW').value;RH=+document.getElementById('rH').value;
  PPX=+document.getElementById('scP').value;GS=+document.getElementById('grS').value;
  const keep=cv.getObjects().filter(o=>o.isSO);
  cv.clear();cv.backgroundColor='#fff';fitCanvas();drawRoom();drawGrid();drawLegend();
  keep.forEach(o=>{cv.add(o);cv.bringToFront(o);});cv.requestRenderAll();toast('Studio mis à jour');
}
function recenter(){
  if(!roomR)return;
  const w2=document.getElementById('cvWrap');
  const vx=(w2.clientWidth-roomR.width)/2-roomR.left;
  const vy=(w2.clientHeight-roomR.height)/2-roomR.top;
  cv.setViewportTransform([1,0,0,1,Math.max(10,vx),Math.max(10,vy)]);zoom=1;updZoom();
}
function clearSceneObjs(){
  cv.getObjects().slice().forEach(o=>{if(!o._grid&&!o._room&&!o._legend)cv.remove(o);});
  gridO.forEach(g=>g.sendToBack());if(roomR)roomR.sendToBack();
  drawLegend();distLines={};cv.requestRenderAll();
}



// ═══════════════════════════════════════════════════════════════
// LIGHTS
// ═══════════════════════════════════════════════════════════════
function addLight(key){
  const d=EQ[key];if(!d)return;
  const blen=cm2px(d.b||120),bwid=cm2px(Math.max(35,(d.d||d.w||35)*.8));
  const beam=mkBeam(blen,bwid);let shape;
  if(d.t==='rect')shape=mkSoftbox(cm2px(d.w),cm2px(d.h));
  else if(d.t==='oct')shape=mkOcto(cm2px(d.d/2));
  else if(d.t==='umb')shape=mkUmbrella(cm2px(d.d/2));
  else if(d.t==='dish')shape=mkDish(cm2px(d.d/2));
  else if(d.t==='flash')shape=mkFlash(cm2px(d.w),cm2px(d.h));
  else if(d.t==='ring')shape=mkRingLight(cm2px(d.d/2));
  else if(d.t==='spot')shape=mkSpot(cm2px(d.d/2));
  else if(d.t==='bare')shape=mkBare(cm2px(d.d/2));
  else return;
  const stand=mkStand(36);stand.top=cm2px(16);
  const lbl=mkLabel(d.lb,cm2px((d.h||d.d||40)/2)+16);
  const g=new fabric.Group([beam,shape,stand,lbl],{left:160,top:160,angle:0,originX:'center',originY:'center'});
  meta(g,{ctype:'light',hasBeam:true,beamLen:blen,lblIdx:3,bmIdx:0});place(g);
}

function addRealLight(key){
  const d=REAL_EQ[key]; if(!d) return;
  addLight(d.base);
  const o=sel(); if(!o) return;
  setLabel(d.label); o.realEqKey=key; o.powerWs=d.powerWs||o.powerWs||300; o.viewOverride=d.view||null; o.elevOverride=d.view?.elev||o.elevOverride;
  cv.requestRenderAll(); if(camOpen) drawCam();
}
function addRealModifier(key){
  const d=REAL_EQ[key]; if(!d) return;
  if(d.base in EQ && EQ[d.base].t && ['rect','oct','umb','dish','ring','spot','flash','bare'].includes(EQ[d.base].t)) addLight(d.base);
  else addMod(d.base);
  const o=sel(); if(!o) return;
  o.ctype=(d.kind==='modifier'?'modifier':o.ctype); setLabel(d.label); o.realEqKey=key; o.viewOverride=d.view||null; o.elevOverride=d.view?.elev||o.elevOverride;
  cv.requestRenderAll(); if(camOpen) drawCam();
}



// ═══════════════════════════════════════════════════════════════
// MODIFIERS
// ═══════════════════════════════════════════════════════════════
function addMod(key){
  const d=EQ[key];if(!d)return;
  let shape,loff=28;
  if(d.t==='refl'){
    const r=cm2px(d.d/2);
    shape=new fabric.Group([
      new fabric.Ellipse({rx:r,ry:r*.65,fill:'#f0f2f8',stroke:'#b0b8cc',strokeWidth:1.5,originX:'center',originY:'center',shadow:new fabric.Shadow({color:'rgba(0,0,0,.1)',blur:5,offsetX:1,offsetY:2})}),
      new fabric.Ellipse({rx:r*.65,ry:r*.42,fill:'rgba(255,255,255,.5)',stroke:'none',originX:'center',originY:'center'}),
      new fabric.Ellipse({rx:r*.28,ry:r*.18,fill:'rgba(255,255,255,.8)',stroke:'none',originX:'center',originY:'center'})
    ],{originX:'center',originY:'center'});loff=r*.65+16;
  } else if(d.t==='panel'){
    const cf=d.fill||PAL.modifier.fill;
    shape=new fabric.Group([
      new fabric.Rect({width:cm2px(d.w)+4,height:cm2px(d.h)+4,fill:PAL.modifier.bg,stroke:'none',rx:3,originX:'center',originY:'center'}),
      new fabric.Rect({width:cm2px(d.w),height:cm2px(d.h),fill:cf,stroke:PAL.modifier.stroke,strokeWidth:1,rx:2,originX:'center',originY:'center',shadow:new fabric.Shadow({color:'rgba(0,0,0,.1)',blur:4,offsetX:1,offsetY:2})})
    ],{originX:'center',originY:'center'});loff=cm2px(d.h)/2+16;
  } else if(d.t==='barn'){
    const bw=cm2px(d.w),bh=cm2px(d.h);
    shape=new fabric.Group([
      new fabric.Rect({width:bw+5,height:bh+4,fill:'#606070',stroke:'none',rx:3,originX:'center',originY:'center'}),
      new fabric.Rect({width:bw,height:bh,fill:'#252530',stroke:'#3a3a50',strokeWidth:1,originX:'center',originY:'center'}),
      new fabric.Rect({left:-bw*.6,top:0,width:bw*.42,height:bh*.85,fill:'#181820',stroke:'#2a2a38',strokeWidth:.5,rx:1,originX:'center',originY:'center'}),
      new fabric.Rect({left:bw*.6,top:0,width:bw*.42,height:bh*.85,fill:'#181820',stroke:'#2a2a38',strokeWidth:.5,rx:1,originX:'center',originY:'center'})
    ],{originX:'center',originY:'center'});
  } else if(d.t==='grid'){
    const r=cm2px(d.d/2);const ls=[];
    ls.push(new fabric.Circle({radius:r,fill:'#d8dce8',stroke:PAL.modifier.stroke,strokeWidth:1.5}));
    for(let i=-r+3;i<r;i+=5){ls.push(new fabric.Line([i,-r,i,r],{stroke:'#8890a8',strokeWidth:.6}));ls.push(new fabric.Line([-r,i,r,i],{stroke:'#8890a8',strokeWidth:.6}));}
    shape=new fabric.Group(ls,{originX:'center',originY:'center'});loff=r+14;
  } else if(d.t==='gel'){
    shape=new fabric.Group([
      new fabric.Rect({width:cm2px(d.w)+3,height:cm2px(d.h)+3,fill:'#c02040',stroke:'none',rx:2,originX:'center',originY:'center'}),
      new fabric.Rect({width:cm2px(d.w),height:cm2px(d.h),fill:'rgba(255,80,100,.45)',stroke:'rgba(220,40,60,.7)',strokeWidth:1,rx:1,originX:'center',originY:'center'}),
      new fabric.Ellipse({rx:cm2px(d.w)*.22,ry:cm2px(d.h)*.28,fill:'rgba(255,200,210,.3)',stroke:'none',originX:'center',originY:'center'})
    ],{originX:'center',originY:'center'});
  } else return;
  const stand=mkStand(32);stand.top=cm2px(15);
  const g=new fabric.Group([shape,stand,mkLabel(d.lb,loff)],{left:220,top:200,originX:'center',originY:'center'});
  meta(g,{ctype:'modifier',hasBeam:false,lblIdx:2,bmIdx:null});place(g);
}



// ═══════════════════════════════════════════════════════════════
// SUBJECTS / CAMERAS / ACCESSORIES
// ═══════════════════════════════════════════════════════════════
function createSubject(label,opts={}){
  const body=mkHumanVariant(opts);
  const labelY=opts.pose==='lying'?24:(opts.pose==='sit'?38:44);
  const g=new fabric.Group([body,mkLabel(label,labelY)],{left:200,top:200,originX:'center',originY:'center'});
  meta(g,{ctype:'subject',lblIdx:1});
  g.subjectGender=opts.gender||'male';
  g.subjectPose=opts.pose||'stand';
  g.realHeight=opts.realHeight||175;
  g.eyeHeight=opts.eyeHeight||Math.round((opts.realHeight||175)*0.93);
  g.realWidth=opts.realWidth||55;
  if(opts.pose==='lying') g.angle=90;
  place(g);
}
function addSubjectStanding(){addMaleStanding();}
function addSubjectSitting(){addMaleSitting();}
function addMaleStanding(){createSubject('Homme debout',{gender:'male',pose:'stand',realHeight:178,eyeHeight:166,realWidth:56});}
function addFemaleStanding(){createSubject('Femme debout',{gender:'female',pose:'stand',realHeight:168,eyeHeight:157,realWidth:50,cloth:'#b061d1',cloth2:'#7d38aa'});}
function addMaleSitting(){createSubject('Homme assis',{gender:'male',pose:'sit',realHeight:126,eyeHeight:116,realWidth:60});}
function addFemaleSitting(){createSubject('Femme assise',{gender:'female',pose:'sit',realHeight:118,eyeHeight:110,realWidth:54,cloth:'#b061d1',cloth2:'#7d38aa'});}
function addChildStanding(){createSubject('Enfant',{gender:'child',pose:'stand',realHeight:122,eyeHeight:113,realWidth:38,cloth:'#3cb28a',cloth2:'#27876a'});}
function addLyingSubject(){createSubject('Modèle allongé',{gender:'female',pose:'lying',realHeight:38,eyeHeight:25,realWidth:160,cloth:'#b061d1',cloth2:'#7d38aa'});}
function addCoupleStanding(){
  const left=mkHumanVariant({gender:'male',pose:'stand'}); left.left=-16;
  const right=mkHumanVariant({gender:'female',pose:'stand',cloth:'#b061d1',cloth2:'#7d38aa'}); right.left=16;
  const g=new fabric.Group([left,right,mkLabel('Couple',48)],{left:200,top:200,originX:'center',originY:'center'});
  meta(g,{ctype:'subject',lblIdx:2}); g.subjectGender='group'; g.subjectPose='stand'; g.realHeight=176; g.eyeHeight=164; g.realWidth=110; place(g);
}
function addMannequin(){
  const c='#c8a882',cs='#9a7858';
  const sh=new fabric.Shadow({color:'rgba(0,0,0,.15)',blur:6,offsetX:2,offsetY:2});
  const body=new fabric.Group([
    new fabric.Circle({radius:10,top:-36,fill:c,stroke:cs,strokeWidth:.5,originX:'center',originY:'center'}),
    new fabric.Ellipse({rx:9,ry:15,top:0,fill:c,stroke:cs,strokeWidth:.5,originX:'center',originY:'center'}),
    new fabric.Ellipse({rx:7,ry:4,top:-14,fill:'#b09070',stroke:cs,strokeWidth:.5,originX:'center',originY:'center'})
  ],{originX:'center',originY:'center',shadow:sh});
  const g=new fabric.Group([body,mkLabel('Mannequin',36)],{left:200,top:200,originX:'center',originY:'center'});
  meta(g,{ctype:'subject',lblIdx:1});g.realHeight=182;g.eyeHeight=168;g.realWidth=48;place(g);
}
function addProductTable(){
  const sh=new fabric.Shadow({color:'rgba(0,0,0,.12)',blur:8,offsetX:2,offsetY:3});
  const g=new fabric.Group([
    new fabric.Rect({width:cm2px(80),height:cm2px(60),fill:'#e8eaf0',stroke:'#b0b8cc',strokeWidth:1.5,rx:4,originX:'center',originY:'center',shadow:sh}),
    new fabric.Rect({width:cm2px(80),height:3,top:-(cm2px(30)+1.5),fill:'#c0c8da',stroke:'none',originX:'center',originY:'center'}),
    new fabric.Rect({width:16,height:24,fill:'#c8904a',stroke:'#a06830',strokeWidth:1,rx:2,originX:'center',originY:'center',shadow:new fabric.Shadow({color:'rgba(0,0,0,.15)',blur:3,offsetX:1,offsetY:1})}),
    mkLabel('Table produit',cm2px(30)+16)
  ],{left:220,top:220,originX:'center',originY:'center'});
  meta(g,{ctype:'subject',lblIdx:3});g.realHeight=90;g.eyeHeight=70;g.realWidth=80;place(g);
}
function addCamera(lbl,hFov,bCm=240){
  const fovW=cm2px(hFov*2.55),fov=mkFOV(cm2px(bCm),fovW);
  const body=mkCamBody();const tri=mkStand(32);tri.top=20;
  const g=new fabric.Group([fov,body,tri,mkLabel(lbl,38)],{left:180,top:180,originX:'center',originY:'center'});
  meta(g,{ctype:'camera',hasBeam:true,beamLen:cm2px(bCm),lblIdx:3,bmIdx:0});place(g);
}
function addTripod(){
  const sh=new fabric.Shadow({color:'rgba(0,0,0,.15)',blur:4,offsetX:1,offsetY:2});
  const head=new fabric.Group([new fabric.Rect({width:16,height:11,fill:'#353545',stroke:'#4a4a5a',strokeWidth:1,rx:3,originX:'center',originY:'center'}),new fabric.Circle({radius:4,fill:'#252535',stroke:'#353545',strokeWidth:1,originX:'center',originY:'center'})],{originX:'center',originY:'center',top:-10,shadow:sh});
  const g=new fabric.Group([head,mkStand(50),mkLabel('Trépied',34)],{left:220,top:220,originX:'center',originY:'center'});
  meta(g,{ctype:'accessory',lblIdx:2});place(g);
}
function addChair(){
  const sh=new fabric.Shadow({color:'rgba(0,0,0,.12)',blur:5,offsetX:1,offsetY:2});
  const g=new fabric.Group([new fabric.Rect({width:28,height:28,fill:'#9095a8',stroke:'#70758a',strokeWidth:1.5,rx:4,shadow:sh}),new fabric.Rect({width:28,height:8,top:-20,fill:'#808090',stroke:'#70758a',strokeWidth:1.5,rx:3}),mkLabel('Chaise',28)],{left:220,top:220,originX:'center',originY:'center'});
  meta(g,{ctype:'accessory',lblIdx:2});place(g);
}
function addStand(){const g=new fabric.Group([mkStand(56),mkLabel('Pied lumière',42)],{left:220,top:220,originX:'center',originY:'center'});meta(g,{ctype:'accessory',lblIdx:1});place(g);}
function addBoomStand(){
  const g=new fabric.Group([mkStand(56),new fabric.Line([0,-18,46,-30],{stroke:'#505060',strokeWidth:3}),new fabric.Circle({radius:5.5,left:-12,top:-16,fill:'#353540',stroke:'#4a4a5a',strokeWidth:1}),mkLabel('Boom arm',44)],{left:220,top:220,originX:'center',originY:'center'});
  meta(g,{ctype:'accessory',lblIdx:3});place(g);
}
function addBackdrop(){
  const w=cm2px(272);
  const sh=new fabric.Shadow({color:'rgba(0,0,0,.15)',blur:5,offsetX:0,offsetY:2});
  const g=new fabric.Group([new fabric.Rect({width:w,height:14,fill:PAL.background.fill,stroke:PAL.background.stroke,strokeWidth:1.5,rx:3,originX:'center',originY:'center',shadow:sh}),new fabric.Line([-w/2+8,0,w/2-8,0],{stroke:'rgba(255,255,255,.3)',strokeWidth:1}),mkLabel('Fond papier 2.72m',20)],{left:250,top:140,originX:'center',originY:'center'});
  meta(g,{ctype:'background',lblIdx:2});place(g);
}
function addCyclo(){
  const g=new fabric.Group([new fabric.Rect({width:cm2px(250),height:cm2px(15),fill:'#ebebf0',stroke:'#b0b8cc',strokeWidth:1.5,originX:'center',originY:'center'}),mkLabel('Mur / Cyclo',20)],{left:260,top:120,originX:'center',originY:'center'});
  meta(g,{ctype:'background',lblIdx:1});place(g);
}
function addNote(){
  const t=new fabric.IText('Double-clic pour éditer',{left:roomR.left+40,top:roomR.top+40,fontSize:14,fill:'#2a2018',backgroundColor:'rgba(255,248,160,.9)',padding:5,fontFamily:'"Inter","Segoe UI",Arial'});
  t.ctype='note';t.isSO=true;cv.add(t);cv.bringToFront(t);cv.setActiveObject(t);cv.requestRenderAll();buildLayers();
}
function addMeasure(){
  const x1=roomR.left+40,y1=roomR.top+roomR.height+40,x2=x1+cm2px(100);
  const g=new fabric.Group([new fabric.Line([x1,y1,x2,y1],{stroke:'#4a8eff',strokeWidth:1.5}),new fabric.Line([x1,y1-7,x1,y1+7],{stroke:'#4a8eff',strokeWidth:1.5}),new fabric.Line([x2,y1-7,x2,y1+7],{stroke:'#4a8eff',strokeWidth:1.5}),new fabric.IText('100 cm',{left:(x1+x2)/2,top:y1-18,originX:'center',fontSize:11,fill:'#4a8eff',fontWeight:'600',backgroundColor:'rgba(255,255,255,.92)',fontFamily:'"Inter","Segoe UI",Arial'})],{left:0,top:0,originX:'left',originY:'top'});
  meta(g,{ctype:'measure',lblIdx:3});cv.add(g);cv.setActiveObject(g);cv.requestRenderAll();buildLayers();
}



// ═══════════════════════════════════════════════════════════════
// SELECTED PANEL
// ═══════════════════════════════════════════════════════════════
function syncSel(){
  const o=sel(),ns=document.getElementById('noSel'),sc=document.getElementById('selCtrl'),tr=document.getElementById('tempRow');
  if(!o||o._room||o._grid||o._legend){ns.style.display='';sc.style.display='none';return;}
  ns.style.display='none';sc.style.display='';
  const ang=Math.round(o.angle||0);set$('srAng',ang);set$('vAng',ang+'°');
  const op=Math.round((o.opacity??1)*100);set$('srOpac',op);set$('vOpac',op+'%');
  const dims=getViewDims(o); set$('srHeight',Math.round(dims.h)); set$('vHeight',Math.round(dims.h)+'cm'); set$('srElev',Math.round(dims.elev)); set$('vElev',Math.round(dims.elev)+'cm');
  if(o.beamLen){set$('srBeam',Math.round(o.beamLen));set$('vBeam',Math.round(px2cm(o.beamLen))+'cm');}
  else set$('vBeam','—');
  document.getElementById('lblIn').value=getLbl(o);
  tr.style.display=o.ctype==='light'?'':'none';
  buildLayers();if(camOpen)drawCam();
}
function setAngle(v){const o=sel();if(!o)return;o.rotate(+v);o.setCoords();cv.requestRenderAll();set$('vAng',v+'°');if(camOpen)drawCam();}
function setBeam(v){
  const o=sel();if(!o||!o.hasBeam||o.bmIdx==null)return;
  const bi=o.bmIdx,bo=o._objects[bi];if(!bo?._beam)return;
  const len=+v;o.beamLen=len;const isCam=o.ctype==='camera';
  const wid=isCam?Math.max(90,len*.7):Math.max(60,len*.55);
  const rep=isCam?mkFOV(len,wid):mkBeam(len,wid);
  rep.left=bo.left;rep.top=bo.top;o._objects[bi]=rep;o.addWithUpdate();cv.requestRenderAll();
  set$('vBeam',Math.round(px2cm(len))+'cm');
}
function setLabel(v){
  const o=sel();if(!o)return;
  if(typeof o.lblIdx==='number'&&o._objects?.[o.lblIdx]?.text!==undefined){o._objects[o.lblIdx].set({text:v||'—'});o.addWithUpdate();}
  else if(o.text!==undefined)o.set({text:v||'—'});
  cv.requestRenderAll();buildLayers();
}
function setOpacity(v){const o=sel();if(!o)return;o.set({opacity:+v/100});cv.requestRenderAll();set$('vOpac',v+'%');}
function setRealHeight(v){const o=sel();if(!o)return; o.realHeight=+v; if(o.ctype==='subject'&&!o.realWidth){o.realWidth=Math.round(+v*(o.subjectPose==='lying'?0.9:0.32));} if(o.ctype==='background')o.realWidth=o.realWidth||272; cv.requestRenderAll(); set$('vHeight',v+'cm'); if(camOpen)drawCam();}
function setElevation(v){const o=sel();if(!o)return; o.elevOverride=+v; cv.requestRenderAll(); set$('vElev',v+'cm'); if(camOpen)drawCam();}
function toggleBeam(){const o=sel();if(!o?.hasBeam||o.bmIdx==null)return;const b=o._objects[o.bmIdx];b.visible=!b.visible;o.addWithUpdate();cv.requestRenderAll();}
function setTemp(el,fill,stroke,lbl){
  const o=sel();if(!o||o.ctype!=='light')return;
  fillRec(o._objects[1],fill,stroke);
  // also update beam color
  if(o.bmIdx!=null&&o._objects[o.bmIdx]){
    const tKey=lbl.split('–')[0].trim().replace(/\s/g,'');
    const bc=({'2800K':'rgba(255,150,60,.18)','3200K':'rgba(255,185,90,.16)','3500K':'rgba(255,218,140,.14)',
      '5500K':'rgba(74,142,255,.14)','6500K':'rgba(100,155,255,.13)','7000K':'rgba(120,160,255,.12)',
      'Rose':'rgba(220,70,220,.14)','Vert':'rgba(60,210,80,.14)'})[tKey]||'rgba(74,142,255,.14)';
    o._objects[o.bmIdx].set({fill:bc,stroke:bc.replace(/[\d.]+\)$/,'0.22)')});
  }
  o.addWithUpdate();cv.requestRenderAll();
  document.querySelectorAll('.sw').forEach(s=>s.classList.remove('on'));el.classList.add('on');
  set$('tempLbl',lbl);o.lightTemp=lbl;
  if(camOpen)drawCam();
}
function fillRec(o,f,s){if(!o)return;if(o.type==='group'){o._objects.forEach(c=>fillRec(c,f,s));}else{if(o.fill&&o.fill!=='')o.set({fill:f});if(o.stroke&&o.stroke!=='')o.set({stroke:s});}}



// ═══════════════════════════════════════════════════════════════
// LAYER LIST
// ═══════════════════════════════════════════════════════════════
const TICONS={light:'💡',modifier:'🔧',camera:'📷',subject:'👤',background:'🖼',accessory:'🎯',note:'📝',measure:'📏',obj:'◼'};
function buildLayers(){
  const el=document.getElementById('layerList');if(!el)return;
  const active=sel();
  const objs=cv.getObjects().filter(o=>o.isSO||o.ctype==='note'||o.ctype==='measure');
  if(!objs.length){el.innerHTML='<div class="sm" style="color:var(--text3)">Aucun élément</div>';return;}
  el.innerHTML='';
  [...objs].reverse().forEach(o=>{
    const div=document.createElement('div');div.className='ly';if(o===active)div.classList.add('sel');
    const eye=document.createElement('span');eye.className='ly-eye';eye.textContent=o.visible===false?'🙈':'👁';
    eye.onclick=ev=>{ev.stopPropagation();o.set({visible:!o.visible});cv.requestRenderAll();buildLayers();};
    const nm=document.createElement('span');nm.className='ly-name';nm.textContent=getLbl(o);
    const ic=document.createElement('span');ic.className='ly-ico';ic.textContent=TICONS[o.ctype]||'◼';
    div.appendChild(eye);div.appendChild(nm);div.appendChild(ic);
    div.onclick=()=>{cv.setActiveObject(o);cv.requestRenderAll();syncSel();};
    el.appendChild(div);
  });
}



// ═══════════════════════════════════════════════════════════════
// DIST LINES
// ═══════════════════════════════════════════════════════════════
function toggleDistLine(){
  const o=sel();if(!o||o.ctype!=='light')return;
  const id=o.__uid||(o.__uid=Math.random().toString(36).slice(2,8));
  if(distLines[id]){cv.remove(distLines[id]);delete distLines[id];}else mkDistLine(o,id);
  cv.requestRenderAll();
}
function mkDistLine(lo,id){
  const sub=cv.getObjects().find(o=>o.ctype==='subject');
  if(!sub){toast('Ajoutez un sujet d\'abord');return;}
  const x1=lo.left,y1=lo.top,x2=sub.left,y2=sub.top;
  const d=dist2(lo,sub),mx=(x1+x2)/2,my=(y1+y2)/2;
  const grp=new fabric.Group([
    new fabric.Line([x1,y1,x2,y2],{stroke:'#f5a623',strokeWidth:1.5,strokeDashArray:[5,4]}),
    new fabric.Text(`${d} cm`,{left:mx,top:my-13,originX:'center',fontSize:10,fill:'#f5a623',fontWeight:'700',backgroundColor:'rgba(255,255,255,.95)',fontFamily:'"Inter","Segoe UI",Arial'})
  ],{left:0,top:0,selectable:false,evented:false});
  grp._distLine=true;grp._uid=id;cv.add(grp);cv.bringToFront(grp);distLines[id]=grp;
}
function refreshDistLines(){
  Object.keys(distLines).forEach(id=>{cv.remove(distLines[id]);delete distLines[id];const o=cv.getObjects().find(x=>x.__uid===id);if(o)mkDistLine(o,id);});
}
function toggleDistances(){showDist=!showDist;document.getElementById('distBtn').classList.toggle('b-act',showDist);document.getElementById('sDist').style.display=showDist?'':'none';document.getElementById('distSep').style.display=showDist?'':'none';}



// ═══════════════════════════════════════════════════════════════
// OBJECT OPS
// ═══════════════════════════════════════════════════════════════
function delSel(){const a=cv.getActiveObjects();if(!a.length)return;cv.discardActiveObject();a.forEach(o=>cv.remove(o));cv.requestRenderAll();buildLayers();if(camOpen)drawCam();}
function dupSel(){const o=sel();if(!o)return;o.clone(c=>{c.left+=26;c.top+=26;c.setCoords();cv.add(c);cv.bringToFront(c);cv.setActiveObject(c);cv.requestRenderAll();buildLayers();});}
function bringFwd(){const o=sel();if(o){cv.bringForward(o);cv.requestRenderAll();}}
function sendBwd(){const o=sel();if(!o)return;cv.sendBackwards(o);if(roomR)cv.sendToBack(roomR);gridO.forEach(g=>cv.sendToBack(g));cv.requestRenderAll();}
function rot45(dir=1){const o=sel();if(!o)return;o.rotate(((o.angle||0)+dir*45+360)%360);o.setCoords();cv.requestRenderAll();set$('srAng',Math.round(o.angle));set$('vAng',Math.round(o.angle)+'°');}

function cx(cmd){
  if(cmd==='dup')dupSel();else if(cmd==='beam')toggleBeam();else if(cmd==='dist')toggleDistLine();
  else if(cmd==='front')bringFwd();else if(cmd==='back')sendBwd();else if(cmd==='r45')rot45(1);else if(cmd==='rm45')rot45(-1);else if(cmd==='del')delSel();
  document.getElementById('ctx').style.display='none';
}
document.addEventListener('click',e=>{if(!e.target.closest('#ctx'))document.getElementById('ctx').style.display='none';});



// ═══════════════════════════════════════════════════════════════
// ZOOM / PAN / SNAP
// ═══════════════════════════════════════════════════════════════
const updZoom=()=>{const p=Math.round(zoom*100);set$('zLbl',p+'%');set$('sZoom',p);};
function zoomIn(){doZ(zoom*1.2);}function zoomOut(){doZ(zoom/1.2);}
function zoomReset(){cv.setViewportTransform([1,0,0,1,0,0]);zoom=1;updZoom();}
function doZ(z,pt){z=Math.min(8,Math.max(.06,z));const c=pt||new fabric.Point(cv.width/2,cv.height/2);cv.zoomToPoint(c,z);zoom=z;updZoom();}
function toggleSnap(){snapOn=!snapOn;document.getElementById('snapBtn').textContent=snapOn?'⊞ Snap':'⊟ Off';document.getElementById('snapBtn').classList.toggle('b-act',snapOn);}



// ═══════════════════════════════════════════════════════════════
// UNDO / REDO
// ═══════════════════════════════════════════════════════════════
function saveState(){
  if(undoLock)return;
  const s=JSON.stringify(cv.toJSON(['ctype','hasBeam','beamLen','lblIdx','bmIdx','isSO','_grid','_room','_legend','_beam','lightTemp','__uid']));
  undoSt.push(s);if(undoSt.length>50)undoSt.shift();redoSt=[];
}
function undo(){if(undoSt.length<2)return;undoLock=true;redoSt.push(undoSt.pop());cv.loadFromJSON(JSON.parse(undoSt[undoSt.length-1]),()=>{refs();cv.requestRenderAll();undoLock=false;buildLayers();if(camOpen)drawCam();});}
function redo(){if(!redoSt.length)return;undoLock=true;const s=redoSt.pop();undoSt.push(s);cv.loadFromJSON(JSON.parse(s),()=>{refs();cv.requestRenderAll();undoLock=false;buildLayers();if(camOpen)drawCam();});}
function refs(){const o=cv.getObjects();gridO=o.filter(x=>x._grid);roomR=o.find(x=>x._room&&x.type==='rect')||null;roomL=o.find(x=>x._room&&x.type==='text')||null;ensureStudioMarkers();}
function ensureStudioMarkers(){cv.getObjects().forEach(o=>{if(o?.isSO && o.type==='group' && !o._angleMarker)addStudioMarker(o);});}




// ═══════════════════════════════════════════════════════════════
// STATUS BAR
// ═══════════════════════════════════════════════════════════════
function updStatus(o){
  if(!o)return;
  set$('sX',Math.round(px2cm(o.left)));set$('sY',Math.round(px2cm(o.top)));set$('sAng',Math.round(o.angle||0));
  if(showDist&&o.ctype==='light'){const sub=cv.getObjects().find(x=>x.ctype==='subject');if(sub){set$('sDistV',dist2(o,sub));document.getElementById('sDist').style.display='';document.getElementById('distSep').style.display='';}}
}



// ═══════════════════════════════════════════════════════════════
// BIND EVENTS
// ═══════════════════════════════════════════════════════════════
function bindEvents(){
  cv.on('object:moving',e=>{
    const o=e.target;if(!o)return;
    if(!freeMove){o.left=snap(o.left);o.top=snap(o.top);}
    updStatus(o);if(Object.keys(distLines).length)refreshDistLines();if(camOpen)drawCam();
  });
  cv.on('object:modified',e=>{syncSel();saveState();if(e.target)updStatus(e.target);if(Object.keys(distLines).length)refreshDistLines();if(camOpen)drawCam();});
  cv.on('object:added',e=>{if(e.target&&(e.target._grid||e.target._room||e.target._legend||e.target._beam||e.target._distLine))return;saveState();});
  cv.on('object:removed',e=>{if(e.target&&(e.target._grid||e.target._room||e.target._legend||e.target._distLine))return;saveState();});
  cv.on('selection:created',e=>{syncSel();if(e.selected?.[0])updStatus(e.selected[0]);});
  cv.on('selection:updated',e=>{syncSel();if(e.selected?.[0])updStatus(e.selected[0]);});
  cv.on('selection:cleared',()=>syncSel());
  cv.on('after:render',()=>{
    const ctx=cv.contextContainer;
    if(!ctx) return;
    ctx.save();
    const v=cv.viewportTransform||fabric.iMatrix.concat();
    ctx.transform(v[0],v[1],v[2],v[3],v[4],v[5]);
    cv.getObjects().forEach(o=>drawOrientationMarker(ctx,o));
    ctx.restore();
  });

  // Right-click context menu
  cv.on('mouse:down',e=>{
    if(e.e.button===2){e.e.preventDefault();
      if(e.target?.isSO){cv.setActiveObject(e.target);syncSel();
        const m=document.getElementById('ctx');m.style.display='block';
        let mx=e.e.clientX,my=e.e.clientY;m.style.left=mx+'px';m.style.top=my+'px';
        requestAnimationFrame(()=>{const r=m.getBoundingClientRect();if(r.right>window.innerWidth)m.style.left=(mx-r.width)+'px';if(r.bottom>window.innerHeight)m.style.top=(my-r.height)+'px';});
      }
    }
  });
  cv.getElement().parentElement.addEventListener('contextmenu',e=>e.preventDefault());

  // Wheel zoom
  cv.getElement().parentElement.addEventListener('wheel',e=>{
    e.preventDefault();let z=cv.getZoom()*(e.deltaY>0?.9:1.1);
    z=Math.min(8,Math.max(.06,z));cv.zoomToPoint(new fabric.Point(e.offsetX,e.offsetY),z);zoom=z;updZoom();
  },{passive:false});

  // Pan with space
  cv.getElement().addEventListener('mousedown',e=>{if(spaceKey){panning=true;panPt={x:e.clientX,y:e.clientY};cv.defaultCursor='grabbing';cv.selection=false;}});
  window.addEventListener('mousemove',e=>{if(!panning)return;const dx=e.clientX-panPt.x,dy=e.clientY-panPt.y;panPt={x:e.clientX,y:e.clientY};const v=cv.viewportTransform.slice();v[4]+=dx;v[5]+=dy;cv.setViewportTransform(v);});
  window.addEventListener('mouseup',()=>{if(panning){panning=false;cv.defaultCursor=spaceKey?'grab':'default';cv.selection=true;}});
}

document.addEventListener('keydown',e=>{
  const inI=document.activeElement.tagName==='INPUT'||document.activeElement.tagName==='TEXTAREA';
  if(e.key==='Alt')freeMove=true;
  if(e.key===' '&&!inI){e.preventDefault();spaceKey=true;cv.defaultCursor='grab';}
  if((e.key==='Delete'||e.key==='Backspace')&&!inI){e.preventDefault();delSel();}
  if(e.ctrlKey&&e.key.toLowerCase()==='z'){e.preventDefault();undo();}
  if(e.ctrlKey&&(e.key.toLowerCase()==='y'||(e.shiftKey&&e.key.toLowerCase()==='z'))){e.preventDefault();redo();}
  if(e.ctrlKey&&e.key.toLowerCase()==='d'){e.preventDefault();dupSel();}
  if(e.ctrlKey&&e.key.toLowerCase()==='s'){e.preventDefault();saveJSON();}
  if(e.ctrlKey&&e.key.toLowerCase()==='o'){e.preventDefault();loadJSON();}
  if(e.key.toLowerCase()==='r'&&!inI&&!e.ctrlKey){e.preventDefault();rot45(e.shiftKey?-1:1);}
});
document.addEventListener('keyup',e=>{if(e.key==='Alt')freeMove=false;if(e.key===' '){spaceKey=false;cv.defaultCursor='default';}});



// ═══════════════════════════════════════════════════════════════
// SIDEBAR / THEME
// ═══════════════════════════════════════════════════════════════
function toggleSec(hdr){
  const a=hdr.querySelector('.sec-arr'),b=hdr.nextElementSibling;
  const o=b.classList.toggle('o');a.classList.toggle('o',o);
}
function collapseBar(){
  const sb=document.getElementById('sidebar');
  const c=sb.classList.toggle('collapsed');
  document.getElementById('collapse-btn').textContent=c?'›':'‹';
}
function toggleTheme(){
  const h=document.documentElement;const light=h.dataset.theme==='light';
  h.dataset.theme=light?'dark':'light';
  document.getElementById('th-ico').textContent=light?'☀️':'🌙';
  document.getElementById('th-lbl').textContent=light?'Mode clair':'Mode sombre';
  if(camOpen)drawCam();
}



// ═══════════════════════════════════════════════════════════════
// PRESETS
// ═══════════════════════════════════════════════════════════════
function pat(o,rx,ry,angle=null){o.set({left:roomR.left+roomR.width*rx,top:roomR.top+roomR.height*ry});if(angle!==null)o.angle=angle;o.setCoords();}
function runPreset(fn){clearSceneObjs();fn();cv.requestRenderAll();saveState();if(camOpen)drawCam();toast('Preset chargé');}

function presetRembrandt(){runPreset(()=>{addSubjectStanding();pat(sel(),.55,.50);addCamera('85mm',29,280);pat(sel(),.12,.50,0);addLight('softbox_90x120');pat(sel(),.32,.22,35);addMod('reflector_80');pat(sel(),.44,.74,-20);});}
function presetClamshell(){runPreset(()=>{addSubjectStanding();pat(sel(),.55,.50);addCamera('85mm',29,280);pat(sel(),.12,.50,0);addLight('beauty_dish_42');pat(sel(),.30,.24,30);addLight('reflector_80');pat(sel(),.30,.76,-30);});}
function presetThreeLights(){runPreset(()=>{addSubjectStanding();pat(sel(),.55,.50);addCamera('85mm',29,280);pat(sel(),.12,.50,0);addLight('softbox_60x60');pat(sel(),.30,.22,40);addLight('softbox_60x60');pat(sel(),.30,.78,-40);addLight('stripbox_30x120');pat(sel(),.78,.50,180);});}
function presetHighKey(){runPreset(()=>{addBackdrop();pat(sel(),.80,.50,90);addSubjectStanding();pat(sel(),.50,.50);addCamera('85mm',29,280);pat(sel(),.12,.50,0);addLight('softbox_90x120');pat(sel(),.30,.22,30);addLight('softbox_90x120');pat(sel(),.30,.78,-30);addLight('stripbox_30x120');pat(sel(),.86,.26,180);addLight('stripbox_30x120');pat(sel(),.86,.74,180);});}
function presetLowKey(){runPreset(()=>{addBackdrop();pat(sel(),.80,.50,90);addSubjectStanding();pat(sel(),.55,.50);addCamera('85mm',29,280);pat(sel(),.12,.50,0);addLight('beauty_dish_42');pat(sel(),.35,.26,28);addMod('flag_60x90');pat(sel(),.42,.40,18);addLight('stripbox_30x120');pat(sel(),.76,.26,150);});}
function presetPackshot(){runPreset(()=>{addProductTable();pat(sel(),.55,.50);addCamera('85mm',29,280);pat(sel(),.12,.50,0);addLight('softbox_60x60');pat(sel(),.38,.26,30);addLight('softbox_60x60');pat(sel(),.38,.74,-25);addMod('scrim_120x120');pat(sel(),.52,.24,0);addBackdrop();pat(sel(),.82,.50,90);});}
function presetButterfly(){runPreset(()=>{addFemaleStanding();pat(sel(),.55,.50);addCamera('85mm',29,260);pat(sel(),.15,.50,0);addLight('beauty_dish_55');pat(sel(),.34,.50,0);sel().elevOverride=185;addMod('reflector_80');pat(sel(),.40,.64,0);});}
function presetSplitLight(){runPreset(()=>{addMaleStanding();pat(sel(),.57,.50);addCamera('85mm',29,240);pat(sel(),.16,.50,0);addLight('softbox_60x60');pat(sel(),.52,.20,90);sel().elevOverride=165;addMod('flag_60x90');pat(sel(),.46,.50,90);});}
function presetCorporate(){runPreset(()=>{addMaleStanding();pat(sel(),.56,.52);addCamera('85mm',29,270);pat(sel(),.14,.52,0);addRealLight('godox_sk400ii');pat(sel(),.30,.30,30);addRealModifier('godox_octa120');pat(sel(),.30,.30,30);addLight('stripbox_30x120');pat(sel(),.80,.60,180);addBackdrop();pat(sel(),.86,.52,90);});}
function presetBoudoir(){runPreset(()=>{addFemaleSitting();pat(sel(),.56,.58);addCamera('85mm',29,250);pat(sel(),.16,.58,0);addLight('stripbox_30x120');pat(sel(),.34,.26,28);sel().elevOverride=155;addLight('bare_bulb');pat(sel(),.74,.64,190);sel().elevOverride=110;addBackdrop();pat(sel(),.86,.56,90);addChair();pat(sel(),.54,.60,0);});}
function presetCouple(){runPreset(()=>{addCoupleStanding();pat(sel(),.57,.54);addCamera('50mm',47,260);pat(sel(),.12,.54,0);addLight('softbox_90x120');pat(sel(),.30,.28,25);addLight('softbox_90x120');pat(sel(),.30,.78,-25);addBackdrop();pat(sel(),.86,.54,90);});}
function presetFullBodyFashion(){runPreset(()=>{addFemaleStanding();pat(sel(),.60,.54);sel().realHeight=172;addCamera('50mm',47,330);pat(sel(),.10,.54,0);addLight('stripbox_30x120');pat(sel(),.34,.24,18);sel().elevOverride=170;addLight('stripbox_30x120');pat(sel(),.34,.78,-18);sel().elevOverride=170;addBackdrop();pat(sel(),.86,.54,90);});}

