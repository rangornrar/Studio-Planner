window.SP_APP = window.SP_APP || {};
// ═══════════════════════════════════════════════════════════════
// EXPORT / SAVE / LOAD
// ═══════════════════════════════════════════════════════════════
function exportPNG(){cv.discardActiveObject();cv.requestRenderAll();const u=cv.toDataURL({format:'png',multiplier:2});const a=document.createElement('a');a.href=u;a.download='studio-setup.png';a.click();toast('PNG exporté');}
function exportLegend(){
  cv.discardActiveObject();cv.requestRenderAll();
  const objs=cv.getObjects().filter(o=>o.isSO);
  const counts={};
  objs.forEach(o=>{const n=getLbl(o)+(o.lightTemp?` (${o.lightTemp.split('–')[0].trim()})`:'');counts[n]=(counts[n]||0)+1;});
  const mainURL=cv.toDataURL({format:'png',multiplier:2});
  const img=new Image();img.onload=()=>{
    const lh=24,pad=20,th=36,items=Object.entries(counts),lH=th+items.length*lh+pad*2;
    const oc=document.createElement('canvas');oc.width=img.width;oc.height=img.height+lH;
    const x=oc.getContext('2d');
    x.fillStyle='#fff';x.fillRect(0,0,oc.width,oc.height);x.drawImage(img,0,0);
    x.fillStyle='#f5f6fa';x.fillRect(0,img.height,oc.width,lH);
    x.strokeStyle='#d0d4e0';x.lineWidth=1;x.beginPath();x.moveTo(0,img.height);x.lineTo(oc.width,img.height);x.stroke();
    x.fillStyle='#1a1b23';x.font='bold 18px Inter,Segoe UI,Arial';x.fillText('Matériel utilisé',pad,img.height+th);
    x.strokeStyle='#e0e4ee';x.lineWidth=1;x.beginPath();x.moveTo(pad,img.height+th+5);x.lineTo(oc.width-pad,img.height+th+5);x.stroke();
    x.font='13px Inter,Segoe UI,Arial';
    items.forEach(([name,count],i)=>{
      const y=img.height+th+pad+i*lh+lh/2+4;
      x.fillStyle='#9098b0';x.fillText(`×${count}`,pad,y);x.fillStyle='#1a1b23';x.fillText(name,pad+40,y);
    });
    x.font='10px monospace';x.fillStyle='#b0b8cc';
    x.fillText(new Date().toLocaleDateString('fr-FR',{year:'numeric',month:'long',day:'numeric'}),pad,oc.height-8);
    const a=document.createElement('a');a.href=oc.toDataURL('image/png');a.download='studio-legende.png';a.click();toast('PNG + légende exporté');
  };img.src=mainURL;
}
function saveJSON(){
  const p={RW,RH,PPX,GS,canvas:cv.toJSON(['ctype','hasBeam','beamLen','lblIdx','bmIdx','isSO','_grid','_room','_legend','_beam','lightTemp','__uid'])};
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(p,null,2)],{type:'application/json'}));a.download='studio-setup.json';a.click();URL.revokeObjectURL(a.href);toast('Sauvegardé');
}
function loadJSON(){
  const inp=document.createElement('input');inp.type='file';inp.accept='.json,application/json';
  inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{
    try{const p=JSON.parse(ev.target.result);RW=p.RW||600;RH=p.RH||400;PPX=p.PPX||20;GS=p.GS||50;
      document.getElementById('rW').value=RW;document.getElementById('rH').value=RH;
      document.getElementById('scP').value=PPX;document.getElementById('grS').value=GS;
      cv.loadFromJSON(p.canvas,()=>{refs();fitCanvas();cv.requestRenderAll();buildLayers();toast('Fichier chargé');});
    }catch(err){alert('JSON invalide.');console.error(err);}
  };r.readAsText(f);};inp.click();
}
function clearScene(){
  if(!confirm('Vider toute la scène ?'))return;
  cv.clear();cv.backgroundColor='#fff';gridO=[];roomR=null;roomL=null;distLines={};
  fitCanvas();drawRoom();drawGrid();drawLegend();cv.requestRenderAll();buildLayers();toast('Scène vidée');
}


