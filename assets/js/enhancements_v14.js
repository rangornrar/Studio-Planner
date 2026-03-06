
(function(){
  const SK = {
    favGear:'studioPlannerFavGearV14',
    recentGear:'studioPlannerRecentGearV14',
    compareHistory:'studioPlannerCompareHistoryV14'
  };
  const byId = id => document.getElementById(id);
  const getJSON = (k, d=[]) => { try { return JSON.parse(localStorage.getItem(k) || JSON.stringify(d)); } catch(e){ return d; } };
  const setJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const uniq = arr => [...new Set(arr)];
  const esc = s => String(s??'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));

  const GEAR = [
    {id:'godox_sk400ii', cat:'light', brand:'Godox', model:'SK400II', label:'Godox SK400II', dimensions:'23×13×18 cm', mount:'Bowens', power:'400 Ws', beam:'flash nu ~65°', weight:'2.1 kg', footprint:'studio', compatibility:'Bowens S, boîtes à lumière, parapluies', use:['portrait','corporate','beauty'], recentKey:'godox_sk400ii', action:()=>window.addRealLight&&addRealLight('godox_sk400ii'), presets:['Corporate','Rembrandt']},
    {id:'godox_ad200pro', cat:'light', brand:'Godox', model:'AD200Pro', label:'Godox AD200Pro', dimensions:'17×7.5×5 cm', mount:'accessoires dédiés / adapt. Bowens', power:'200 Ws', beam:'variable selon tête', weight:'590 g', footprint:'mobile', compatibility:'tête Fresnel, tête bare bulb, support S2', use:['portrait','couple','location'], action:()=>window.addRealLight&&addRealLight('godox_ad200pro'), presets:['Couple','Corporate']},
    {id:'godox_ad400pro', cat:'light', brand:'Godox', model:'AD400Pro', label:'Godox AD400Pro', dimensions:'22×10×12 cm', mount:'Bowens (adaptateur)', power:'400 Ws', beam:'variable', weight:'2.1 kg', footprint:'mobile/studio', compatibility:'Bowens, Fresnel, lanternes, octa', use:['fashion','fullbody','corporate'], action:()=>window.addRealLight&&addRealLight('godox_ad400pro'), presets:['Mode plein pied','Fond blanc']},
    {id:'aputure_300d', cat:'light', brand:'Aputure', model:'LS 300D', label:'Aputure LS 300D', dimensions:'29×23×21 cm', mount:'Bowens', power:'350 W LED', beam:'55° standard', weight:'2.1 kg tête', footprint:'continu', compatibility:'Fresnel 2X, Light Dome, lanternes', use:['video','portrait','product'], action:()=>window.addRealLight&&addRealLight('aputure_300d'), presets:['Packshot e-commerce']},
    {id:'godox_octa120', cat:'modifier', brand:'Godox', model:'Octa 120', label:'Octa 120', dimensions:'Ø120 cm', mount:'Bowens', power:'—', beam:'diffusion large', weight:'2.1 kg', footprint:'large', compatibility:'SK400II, AD400Pro, Aputure 300D', use:['beauty','portrait','corporate'], action:()=>window.addRealModifier&&addRealModifier('godox_octa120'), presets:['Corporate','Butterfly','Clamshell']},
    {id:'strip_30x120', cat:'modifier', brand:'Generic', model:'Strip 30×120', label:'Stripbox 30×120', dimensions:'30×120 cm', mount:'Bowens', power:'—', beam:'étroit / plein pied', weight:'1.6 kg', footprint:'vertical', compatibility:'flashes Bowens', use:['fashion','rim','lowkey'], action:()=>window.addRealModifier&&addRealModifier('strip_30x120_real'), presets:['Mode plein pied','Boudoir','Low key dramatique']},
    {id:'beauty_55', cat:'modifier', brand:'Godox', model:'Beauty Dish 55', label:'Beauty Dish 55', dimensions:'Ø55 cm', mount:'Bowens', power:'—', beam:'contrôlé', weight:'1.2 kg', footprint:'compact', compatibility:'Bowens, grid 40°', use:['beauty','portrait'], action:()=>window.addLight&&addLight('beauty_dish_55'), presets:['Butterfly','Clamshell']},
    {id:'reflector_110x180', cat:'modifier', brand:'Lastolite', model:'Panel 110×180', label:'Panneau réflecteur 110×180', dimensions:'110×180 cm', mount:'support/pied', power:'—', beam:'fill passif', weight:'1.8 kg', footprint:'grand', compatibility:'pinces, C-stand', use:['portrait','corporate','family'], action:()=>window.addMod&&addMod('reflector_110x180'), presets:['Corporate','Famille']},
    {id:'scrim_120', cat:'modifier', brand:'Generic', model:'Scrim 120×120', label:'Diffusion 120×120', dimensions:'120×120 cm', mount:'cadre/pied', power:'—', beam:'adoucissement', weight:'1.4 kg', footprint:'carré', compatibility:'C-stand, boom', use:['packshot','beauty','ecommerce'], action:()=>window.addMod&&addMod('scrim_120x120'), presets:['Packshot bouteille','Packshot e-commerce']},
    {id:'vflat_100x200', cat:'modifier', brand:'V-Flat World', model:'V-Flat 100×200', label:'V-Flat 100×200', dimensions:'100×200 cm', mount:'au sol', power:'—', beam:'cut/fill', weight:'8 kg', footprint:'très grand', compatibility:'studio fond uni', use:['lowkey','fashion','corporate'], action:()=>window.addMod&&addMod('vflat_100x200'), presets:['Low key dramatique','Corporate']},
    {id:'flag_60x90', cat:'modifier', brand:'Generic', model:'Flag 60×90', label:'Drapeau 60×90', dimensions:'60×90 cm', mount:'C-stand', power:'—', beam:'cut précis', weight:'1.1 kg', footprint:'moyen', compatibility:'C-stand, grip head', use:['lowkey','split','control'], action:()=>window.addMod&&addMod('flag_60x90'), presets:['Split light','Low key dramatique']},
    {id:'paper_272', cat:'background', brand:'Colorama', model:'Fond papier 2.72', label:'Fond papier 2.72m', dimensions:'272×1100 cm', mount:'support fond', power:'—', beam:'—', weight:'6 kg', footprint:'fond', compatibility:'support fond standard', use:['corporate','white','ecommerce','family'], action:()=>window.addBackdrop&&addBackdrop(), presets:['Fond blanc','Corporate','Packshot e-commerce']},
    {id:'cyclo_wall', cat:'background', brand:'Studio', model:'Cyclo compact', label:'Mur / cyclo', dimensions:'250×220 cm', mount:'fixe', power:'—', beam:'—', weight:'fixe', footprint:'fond', compatibility:'studio fixe', use:['fashion','beauty','fullbody'], action:()=>window.addCyclo&&addCyclo(), presets:['Mode plein pied','Beauté']},
    {id:'tripod_pro', cat:'accessory', brand:'Manfrotto', model:'Trépied photo pro', label:'Trépied photo pro', dimensions:'160 cm max', mount:'1/4" / 3/8"', power:'—', beam:'—', weight:'2.3 kg', footprint:'trépied', compatibility:'boîtiers photo, rotules', use:['all'], action:()=>window.addTripod&&addTripod(), presets:['Tous']},
    {id:'cstand', cat:'accessory', brand:'Avenger', model:'C-Stand', label:'C-Stand grip', dimensions:'max 328 cm', mount:'baby pin', power:'—', beam:'—', weight:'8.3 kg', footprint:'grip', compatibility:'flags, scrims, boom', use:['beauty','lowkey','product'], action:()=>window.addStand&&addStand(), presets:['Split light','Packshot bouteille']},
    {id:'male_model', cat:'subject', brand:'Sujet', model:'Homme debout', label:'Homme debout', dimensions:'185 cm', mount:'—', power:'—', beam:'—', weight:'—', footprint:'sujet', compatibility:'portrait, corporate, mode', use:['portrait','corporate','fashion'], action:()=>window.addMaleStanding&&addMaleStanding(), presets:['Corporate','Rembrandt']},
    {id:'female_model', cat:'subject', brand:'Sujet', model:'Femme debout', label:'Femme debout', dimensions:'172 cm', mount:'—', power:'—', beam:'—', weight:'—', footprint:'sujet', compatibility:'beauty, mode, boudoir', use:['beauty','fashion','portrait'], action:()=>window.addFemaleStanding&&addFemaleStanding(), presets:['Butterfly','Clamshell','Boudoir']},
    {id:'couple_subject', cat:'subject', brand:'Sujet', model:'Couple', label:'Couple', dimensions:'2 sujets', mount:'—', power:'—', beam:'—', weight:'—', footprint:'sujet multiple', compatibility:'couple, famille', use:['couple','family'], action:()=>window.addCoupleStanding&&addCoupleStanding(), presets:['Couple','Famille']},
  ];

  const TEMPLATES = [
    {id:'corporate', title:'Corporate', category:'Corporate', level:'Intermédiaire', style:'Propre / éditorial sobre', expected:'Rendu équilibré, propre, fond discret', recommended:['Godox SK400II','Octa 120','Stripbox 30×120','Fond papier 2.72m'], notes:'Clé à 45°, rim light légère, fond séparé.', apply:()=>window.presetCorporate&&presetCorporate()},
    {id:'beauty', title:'Beauté', category:'Beauté', level:'Intermédiaire', style:'Peau lissée / source frontale', expected:'Visage très lisible, ombres douces', recommended:['Beauty Dish 55','Panneau réflecteur 110×180'], notes:'Source frontale haute, fill sous le menton.', apply:()=>window.presetButterfly&&presetButterfly()},
    {id:'fullbody', title:'Mode plein pied', category:'Mode', level:'Avancé', style:'Plein pied / silhouette', expected:'Volume du corps net, jambes lisibles', recommended:['2× Stripbox 30×120','Fond papier 2.72m'], notes:'Deux bandes verticales légèrement en avant du sujet.', apply:()=>window.presetFullBodyFashion&&presetFullBodyFashion()},
    {id:'packshot_bottle', title:'Packshot bouteille', category:'Packshot', level:'Avancé', style:'Produit brillant contrôlé', expected:'Reflets propres, étiquettes lisibles', recommended:['2× SK400II','Diffusion 120×120','Fond papier 2.72m'], notes:'Diffusion près du produit, fond séparé, flags utiles.', apply:()=>window.presetPackshot&&presetPackshot()},
    {id:'packshot_ecom', title:'Packshot e-commerce', category:'Packshot', level:'Débutant', style:'Fond blanc simple', expected:'Produit isolé, rendu propre et rapide', recommended:['2× Softbox 60×60','Fond papier 2.72m'], notes:'Uniformité > créativité. Préférer des sources symétriques.', apply:()=>window.presetPackshot&&presetPackshot()},
    {id:'white_bg', title:'Fond blanc', category:'Corporate', level:'Intermédiaire', style:'Sujet décollé du fond', expected:'Fond très clair sans manger les contours', recommended:['2× softbox 90×120','2× strip sur fond'], notes:'Éclairer le fond séparément du sujet.', apply:()=>window.presetHighKey&&presetHighKey()},
    {id:'couple', title:'Couple', category:'Couple', level:'Intermédiaire', style:'Deux sujets équilibrés', expected:'Deux visages lisibles et homogènes', recommended:['2× softbox 90×120','Fond papier 2.72m'], notes:'Garder une source assez large pour couvrir les deux.', apply:()=>window.presetCouple&&presetCouple()},
    {id:'family', title:'Famille', category:'Famille', level:'Avancé', style:'Large couverture', expected:'Groupe homogène, fond propre', recommended:['2× softbox 90×120','Panneau réflecteur 110×180','Fond papier 2.72m'], notes:'Mieux vaut large et haut que contrasté.', apply:()=>window.presetCouple&&presetCouple()},
    {id:'boudoir', title:'Boudoir', category:'Beauté', level:'Avancé', style:'Doux / intime / enveloppant', expected:'Peau douce, ombres élégantes', recommended:['Stripbox 30×120','Bare bulb','Chaise'], notes:'Varier la hauteur pour modeler le corps.', apply:()=>window.presetBoudoir&&presetBoudoir()},
    {id:'lowkey', title:'Low key dramatique', category:'Portrait', level:'Avancé', style:'Contraste fort / contrôle', expected:'Forte séparation ombre-lumière', recommended:['Beauty Dish 55','Flag 60×90','Stripbox 30×120'], notes:'Travailler la coupure, pas juste baisser l’expo.', apply:()=>window.presetLowKey&&presetLowKey()},
    {id:'clamshell', title:'Clamshell', category:'Beauté', level:'Débutant', style:'Beauté classique', expected:'Visage très flatteur', recommended:['Beauty Dish 55','Réflecteur 80'], notes:'Source principale haute, fill bas, angle neutre.', apply:()=>window.presetClamshell&&presetClamshell()},
    {id:'rembrandt', title:'Rembrandt', category:'Portrait', level:'Intermédiaire', style:'Portrait classique contrasté', expected:'Triangle lumineux côté ombre', recommended:['Softbox 90×120','Réflecteur 80'], notes:'Monter la clé un peu au-dessus du regard.', apply:()=>window.presetRembrandt&&presetRembrandt()},
    {id:'butterfly', title:'Butterfly', category:'Beauté', level:'Intermédiaire', style:'Beauté frontale', expected:'Ombre papillon sous le nez', recommended:['Beauty Dish 55','Réflecteur'], notes:'Excellent pour mode/beauty.', apply:()=>window.presetButterfly&&presetButterfly()},
    {id:'split', title:'Split light', category:'Portrait', level:'Avancé', style:'Graphique / dramatique', expected:'Moitié visage éclairée', recommended:['Softbox 60×60','Flag 60×90'], notes:'Aligner précisément la source au profil.', apply:()=>window.presetSplitLight&&presetSplitLight()},
  ];

  function ensureEnhancementStyles(){
    if(byId('v14-styles')) return;
    const s=document.createElement('style'); s.id='v14-styles'; s.textContent=`
      .toolbar-group{display:inline-flex;gap:4px;align-items:center}
      .tiny{font-size:11px}
      .tagrow{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
      .tag{display:inline-flex;padding:3px 8px;border-radius:999px;background:var(--surface3);border:1px solid var(--border);font-size:11px;color:var(--text2)}
      .favstar{cursor:pointer;font-size:16px;line-height:1}
      .catalog-item .row{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}
      .catalog-item .desc{margin-top:4px;color:var(--text2);font-size:12px}
      .catalog-item .meta{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px;font-size:11px;color:var(--text2)}
      .detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 12px;font-size:12px}
      .detail-grid strong{display:block;color:var(--text);font-size:11px;text-transform:uppercase;letter-spacing:.04em}
      .toolbar-sep{width:1px;height:20px;background:var(--border);margin:0 4px}
      .compare-shot{width:100%;border:1px solid var(--border);border-radius:12px;background:#fff}
      .quick-kbd{display:inline-flex;align-items:center;justify-content:center;min-width:22px;height:22px;padding:0 6px;border:1px solid var(--border2);border-radius:6px;background:var(--surface2);font-size:11px;font-family:monospace;color:var(--text2)}
      .gallery-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
      .gallery-card{padding:10px;border:1px solid var(--border);border-radius:12px;background:var(--surface2)}
      .gallery-card h5{margin:0 0 4px;font-size:13px}
      @media (max-width:900px){.detail-grid,.gallery-grid{grid-template-columns:1fr}}
    `; document.head.appendChild(s);
  }

  function favorites(){ return getJSON(SK.favGear, []); }
  function recents(){ return getJSON(SK.recentGear, []); }
  function isFav(id){ return favorites().includes(id); }
  function toggleFav(id){ const vals=favorites(); const next=vals.includes(id)?vals.filter(x=>x!==id):uniq([id,...vals]).slice(0,30); setJSON(SK.favGear,next); renderCatalogEnhanced(); }
  function pushRecent(id){ const next=uniq([id,...recents()]).slice(0,15); setJSON(SK.recentGear,next); }

  function getCatalogRows(){
    const base = GEAR.map(x=>({...x, kind:'gear'}));
    const presetItems = TEMPLATES.map(t=>({id:'tpl-'+t.id, cat:'preset', label:t.title, title:t.title, desc:t.expected, brand:'Template', model:t.category, use:[(t.category||'').toLowerCase()], presets:[t.title], kind:'template', ref:t}));
    return [...base, ...presetItems];
  }

  function runCatalogItemById(id){
    const item = GEAR.find(x=>x.id===id) || null;
    if(item && typeof item.action==='function'){ item.action(); pushRecent(id); if(window.saveState) saveState(); if(window.buildLayers) buildLayers(); if(window.updateProjectHub) updateProjectHub(); if(window.updateTopProjectBar) updateTopProjectBar(); if(window.toast) toast(item.label+' ajouté'); return; }
    const tpl = TEMPLATES.find(t=>'tpl-'+t.id===id || t.id===id);
    if(tpl && typeof tpl.apply==='function'){ tpl.apply(); pushRecent(id); if(window.toast) toast('Template chargé'); return; }
  }

  function renderCatalogDetail(item){
    const el=byId('catalogDetail'); if(!el) return;
    if(!item){ el.innerHTML='<div class="muted">Sélectionne un élément pour afficher sa fiche détaillée.</div>'; return; }
    const isTemplate = item.kind==='template';
    const title = item.label || item.title;
    el.innerHTML = isTemplate ? `
      <div class="premium-inline" style="justify-content:space-between;align-items:flex-start"><div><h4 style="margin:0 0 6px">${esc(title)}</h4><div class="muted">Template métier · ${esc(item.ref.category||'—')}</div></div><button class="b-blue" onclick="window.SP_ENH.runCatalog('${esc(item.id)}')">Charger</button></div>
      <div class="note" style="margin-top:12px"><strong>Rendu attendu</strong><br>${esc(item.ref.expected||'—')}</div>
      <div class="detail-grid" style="margin-top:12px"><div><strong>Niveau</strong>${esc(item.ref.level||'—')}</div><div><strong>Style</strong>${esc(item.ref.style||'—')}</div></div>
      <div class="note" style="margin-top:12px"><strong>Matériel recommandé</strong><br>${esc((item.ref.recommended||[]).join(' · '))}</div>
      <div class="note" style="margin-top:12px"><strong>Notes terrain</strong><br>${esc(item.ref.notes||'—')}</div>
    ` : `
      <div class="premium-inline" style="justify-content:space-between;align-items:flex-start"><div><h4 style="margin:0 0 6px">${esc(title)}</h4><div class="muted">${esc(item.brand)} · ${esc(item.model)}</div></div><div class="premium-inline"><span class="favstar" title="Favori" onclick="window.SP_ENH.toggleFav('${esc(item.id)}')">${isFav(item.id)?'★':'☆'}</span><button class="b-blue" onclick="window.SP_ENH.runCatalog('${esc(item.id)}')">Ajouter</button></div></div>
      <div class="detail-grid" style="margin-top:14px">
        <div><strong>Dimensions</strong>${esc(item.dimensions||'—')}</div><div><strong>Monture</strong>${esc(item.mount||'—')}</div>
        <div><strong>Puissance</strong>${esc(item.power||'—')}</div><div><strong>Angle diffusion</strong>${esc(item.beam||'—')}</div>
        <div><strong>Poids</strong>${esc(item.weight||'—')}</div><div><strong>Encombrement</strong>${esc(item.footprint||'—')}</div>
      </div>
      <div class="note" style="margin-top:12px"><strong>Compatibilités</strong><br>${esc(item.compatibility||'—')}</div>
      <div class="tagrow">${(item.use||[]).map(u=>`<span class="tag">${esc(u)}</span>`).join('')}${(item.presets||[]).map(p=>`<span class="tag">Preset : ${esc(p)}</span>`).join('')}</div>
    `;
  }

  function augmentCatalogControls(){
    const tools=byId('catalogModal')?.querySelector('.catalog-tools');
    if(!tools || byId('catalogQuickFilter')) return;
    const sel=document.createElement('select'); sel.id='catalogQuickFilter'; sel.innerHTML='<option value="all">Catalogue complet</option><option value="favorites">Favoris</option><option value="recent">Récents</option>'; sel.onchange=()=>renderCatalogEnhanced();
    tools.appendChild(sel);
  }

  function renderCatalogEnhanced(){
    const list=byId('catalogList'); if(!list) return;
    augmentCatalogControls();
    const q=(byId('catalogSearch')?.value||'').toLowerCase().trim();
    const cat=(byId('catalogFilter')?.value||'all');
    const use=(byId('catalogUseCase')?.value||'all').toLowerCase();
    const quick=(byId('catalogQuickFilter')?.value||'all');
    const fav = favorites(); const rec = recents();
    let rows=getCatalogRows().filter(x => (cat==='all'||x.cat===cat) && (use==='all'||(x.use||[]).map(String).map(s=>s.toLowerCase()).includes(use)));
    if(quick==='favorites') rows = rows.filter(x => fav.includes(x.id));
    if(quick==='recent') rows = rows.filter(x => rec.includes(x.id));
    if(q) rows = rows.filter(x => JSON.stringify(x).toLowerCase().includes(q));
    rows.sort((a,b)=> (fav.includes(b.id)-fav.includes(a.id)) || (rec.indexOf(a.id)>=0?rec.indexOf(a.id):999) - (rec.indexOf(b.id)>=0?rec.indexOf(b.id):999) || String(a.label||a.title).localeCompare(String(b.label||b.title),'fr'));
    list.innerHTML = rows.length ? rows.map(item=>`
      <div class="catalog-item">
        <div class="row"><div><div class="cat">${esc(item.cat)}</div><strong>${esc(item.label||item.title)}</strong></div><span class="favstar" onclick="event.stopPropagation();window.SP_ENH.toggleFav('${esc(item.id)}')">${fav.includes(item.id)?'★':'☆'}</span></div>
        <div class="desc">${esc(item.desc || item.expected || '')}</div>
        <div class="meta"><div><strong>Marque</strong>${esc(item.brand||'—')}</div><div><strong>Modèle</strong>${esc(item.model||item.category||'—')}</div></div>
        <div class="premium-inline" style="margin-top:10px"><button class="small-btn" onclick="window.SP_ENH.showCatalog('${esc(item.id)}')">Fiche</button><button class="small-btn b-blue" onclick="window.SP_ENH.runCatalog('${esc(item.id)}')">Ajouter</button></div>
      </div>`).join('') : '<div class="muted">Aucun résultat. Cette bibliothèque est pro, pas clairvoyante.</div>';
    renderCatalogDetail(rows[0]||null);
  }

  function renderTemplateLibraryEnhanced(){
    const list=byId('templateLibraryList'); if(!list) return;
    const q=(byId('templateSearch')?.value||'').toLowerCase().trim();
    const f=(byId('templateFilter')?.value||'all');
    let rows=TEMPLATES.filter(t => (f==='all'||t.category===f));
    if(q) rows = rows.filter(t => JSON.stringify(t).toLowerCase().includes(q));
    list.innerHTML = rows.length ? rows.map(t=>`
      <div class="catalog-item">
        <div class="cat">${esc(t.category)}</div>
        <strong>${esc(t.title)}</strong>
        <div class="desc">${esc(t.expected)}</div>
        <div class="specs"><b>Matériel recommandé</b> · ${esc((t.recommended||[]).join(' · '))}</div>
        <div class="premium-inline" style="margin-top:10px"><button class="small-btn" onclick="window.SP_ENH.showTemplate('${esc(t.id)}')">Fiche</button><button class="small-btn b-blue" onclick="window.SP_ENH.applyTemplate('${esc(t.id)}')">Charger</button></div>
      </div>`).join('') : '<div class="muted">Aucun template trouvé.</div>';
    showTemplate(rows[0]?.id || null);
  }

  function showTemplate(id){
    const t=TEMPLATES.find(x=>x.id===id); const el=byId('templateDetail'); if(!el) return; if(!t){ el.innerHTML='<div class="muted">Choisis un template pour afficher sa fiche complète.</div>'; return; }
    el.innerHTML=`<h4 style="margin:0 0 6px">${esc(t.title)}</h4><div class="muted">${esc(t.category)} · ${esc(t.level)} · ${esc(t.style)}</div><div class="note" style="margin-top:12px"><strong>Rendu attendu</strong><br>${esc(t.expected)}</div><div class="note" style="margin-top:12px"><strong>Matériel recommandé</strong><br>${esc((t.recommended||[]).join(' · '))}</div><div class="detail-grid" style="margin-top:12px"><div><strong>Distances</strong>Selon preset métier</div><div><strong>Hauteurs</strong>Réglées par le preset</div></div><div class="note" style="margin-top:12px"><strong>Notes</strong><br>${esc(t.notes)}</div><div class="premium-inline" style="margin-top:12px"><button class="b-blue" onclick="window.SP_ENH.applyTemplate('${esc(t.id)}')">Appliquer ce template</button><button onclick="saveShootTypeTemplate&&saveShootTypeTemplate()">Sauver comme base</button></div>`;
  }

  function applyTemplateById(id){ const t=TEMPLATES.find(x=>x.id===id); if(!t) return; if(typeof t.apply==='function') t.apply(); if(window.setProjectMeta) setProjectMeta({...getProjectMeta(), shootType:t.category}); if(window.updateProjectHub) updateProjectHub(); if(window.updateTopProjectBar) updateTopProjectBar(); toast('Template chargé : '+t.title); }

  function getDetailedEquipmentSummary(){
    const counts={};
    (cv.getObjects().filter(o=>o.isSO) || []).forEach(o=>{
      const key = o.realEqKey; let row = key && GEAR.find(x=>x.id===key);
      const name = row ? `${row.brand} ${row.model}` : getLbl(o);
      counts[name] = counts[name] || {count:0, power:[], dims: row?.dimensions || '', mount: row?.mount || '', beam: row?.beam || ''};
      counts[name].count += 1;
      if(o.ctype==='light' && o.powerWs) counts[name].power.push(o.powerWs+' Ws');
    });
    return Object.entries(counts).map(([name,v])=>({name,...v})).sort((a,b)=>a.name.localeCompare(b.name,'fr'));
  }

  function getLightSettingsDetails(){
    return cv.getObjects().filter(o=>o.ctype==='light').map((o,i)=>({
      name:getLbl(o),
      power:o.powerWs||'—',
      temp:o.lightTemp||'5500K',
      height:o.elevCm||o.elevOverride||'—',
      beam:Math.round(px2cm(o.beamLen||0)||0)
    }));
  }

  async function captureIsoDataURL(){
    const prev = window.camOpen, prevTab = window.camTab;
    if(!window.camOpen && window.toggleCam) toggleCam();
    if(window.setCamTab) setCamTab('iso');
    if(window.fitCamCv) fitCamCv();
    if(window.drawCam) drawCam();
    const c = byId('camCanvas');
    const url = c && c.width ? c.toDataURL('image/png') : '';
    if(prevTab && window.setCamTab) setCamTab(prevTab);
    if(!prev && window.toggleCam) toggleCam();
    return url;
  }

  async function exportPremium(mode='client'){
    const meta = getProjectMeta ? getProjectMeta() : {};
    cv.discardActiveObject(); cv.requestRenderAll();
    const topUrl = cv.toDataURL({format:'png', multiplier:4});
    const isoUrl = await captureIsoDataURL();
    const gear = getDetailedEquipmentSummary();
    const lights = getLightSettingsDetails();
    const audit = window.computeSetupAudit ? computeSetupAudit() : {score:'—',warnings:[],recos:[],checklist:[]};
    const title = mode==='assistant' ? 'PDF technique' : 'PDF présentation';
    const subtle = mode==='assistant' ? 'Version assistant / montage' : 'Version client / présentation';
    const gearRows = gear.map(g=>`<tr><td>${esc(g.name)}</td><td>${g.count}</td><td>${esc(g.dims||'—')}</td><td>${esc(g.mount||'—')}</td><td>${esc((g.power||[]).join(', ')||'—')}</td></tr>`).join('');
    const lightRows = lights.map(l=>`<tr><td>${esc(l.name)}</td><td>${esc(String(l.power))}</td><td>${esc(String(l.temp))}</td><td>${esc(String(l.height))}</td><td>${esc(String(l.beam))} cm</td></tr>`).join('');
    const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>${esc(meta.name||'Projet')}</title><style>
      body{font-family:Inter,Arial,sans-serif;margin:0;background:#eef2f8;color:#0f172a}.page{max-width:1180px;margin:0 auto;padding:28px}.hero,.card{background:#fff;border:1px solid #d8dfeb;border-radius:20px;box-shadow:0 10px 30px rgba(15,23,42,.06)}
      .hero{padding:30px;margin-bottom:18px;display:grid;grid-template-columns:1.1fr .9fr;gap:24px}.eyebrow{font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.08em}.title{font-size:34px;font-weight:900;margin:6px 0 10px}.sub{color:#475569}.meta{display:grid;grid-template-columns:repeat(2,1fr);gap:12px 18px;font-size:13px}.cards{display:grid;grid-template-columns:1.2fr .8fr;gap:18px}.views{display:grid;grid-template-columns:1fr 1fr;gap:14px}.card{padding:18px}.card img{width:100%;border-radius:14px;border:1px solid #d8deea;background:#fff}.big img{min-height:560px;object-fit:contain;background:#f8fafc}.pill{display:inline-flex;padding:6px 10px;border-radius:999px;background:#eef6ff;border:1px solid #bfdbfe;color:#2563eb;font-size:11px;font-weight:800}.score{font-size:36px;font-weight:900}.audit{display:flex;align-items:center;gap:10px;margin-top:12px}.section{font-size:16px;font-weight:800;margin:0 0 12px}.note{padding:12px 14px;border-radius:14px;background:#f8fafc;border:1px solid #e5eaf2;font-size:13px}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px}.table{width:100%;border-collapse:collapse;font-size:12px}.table th,.table td{border-bottom:1px solid #e5e7eb;padding:8px 6px;text-align:left;vertical-align:top}.muted{color:#64748b}.footer{margin-top:16px;color:#64748b;font-size:11px}@media print{body{background:#fff}.page{max-width:none;padding:0}.hero,.card{box-shadow:none;break-inside:avoid}}</style></head><body>
      <div class="page"><div class="hero"><div><div class="eyebrow">${esc(meta.brand||'Studio Planner Pro')} · ${esc(title)}</div><div class="title">${esc(meta.name||'Projet sans titre')}</div><div class="sub">${esc(subtle)}</div><div class="audit"><span class="pill">Score audit</span><div class="score">${esc(audit.score||'—')}</div><div class="muted">${esc(meta.shootType||'—')} ${meta.client?('· '+esc(meta.client)):''}</div></div></div><div class="meta"><div><strong>Client</strong><br>${esc(meta.client||'—')}</div><div><strong>Type de séance</strong><br>${esc(meta.shootType||'—')}</div><div><strong>Studio</strong><br>${RW} × ${RH} cm</div><div><strong>Cadre</strong><br>${esc(window.currentFrameRatio||'3:2')}</div><div><strong>Date</strong><br>${new Date().toLocaleDateString('fr-FR',{year:'numeric',month:'long',day:'numeric'})}</div><div><strong>Mode</strong><br>${esc(mode==='assistant'?'Technique':'Présentation')}</div></div></div>
      <div class="cards"><div class="card big"><div class="section">Vues du setup</div><div class="views"><div><div class="muted" style="margin-bottom:6px">Plan studio grand format</div><img src="${topUrl}"></div><div><div class="muted" style="margin-bottom:6px">Vue isométrique</div><img src="${isoUrl}"></div></div>${meta.notes?`<div class="note" style="margin-top:12px"><strong>Notes projet</strong><br>${esc(meta.notes)}</div>`:''}</div>
      <div class="card"><div class="section">Matériel détaillé</div><table class="table"><thead><tr><th>Matériel</th><th>Qté</th><th>Dimensions</th><th>Monture</th><th>Puissance</th></tr></thead><tbody>${gearRows||'<tr><td colspan="5">Aucun matériel</td></tr>'}</tbody></table>
      <div class="section" style="margin-top:16px">Réglages lumière</div><table class="table"><thead><tr><th>Source</th><th>Puissance</th><th>Temp.</th><th>Hauteur</th><th>Faisceau</th></tr></thead><tbody>${lightRows||'<tr><td colspan="5">Aucune source</td></tr>'}</tbody></table>
      <div class="grid2" style="margin-top:14px"><div><div class="section">Checklist</div><ul>${(audit.checklist||[]).map(x=>`<li>${esc(x)}</li>`).join('')||'<li>—</li>'}</ul></div><div><div class="section">Recommandations</div><ul>${(audit.recos||[]).map(x=>`<li>${esc(x)}</li>`).join('')||'<li>—</li>'}</ul></div></div>
      ${mode==='assistant' ? `<div class="note" style="margin-top:12px"><strong>Version assistant</strong><br>Privilégie le montage, les hauteurs, les distances et la cohérence du matériel.</div>` : `<div class="note" style="margin-top:12px"><strong>Version client</strong><br>Met l’accent sur la lecture du setup et la qualité de présentation.</div>`}
      </div></div><div class="footer">Document généré depuis Studio Planner Pro. Utilise l’impression du navigateur puis “Enregistrer au format PDF”.</div></div></body></html>`;
    const w = window.open('', '_blank');
    w.document.open(); w.document.write(html); w.document.close();
  }

  function addToolbarButtons(){
    const toolbar=byId('toolbar');
    if(toolbar && !byId('v14-toolbar-group')){
      const wrap=document.createElement('div'); wrap.id='v14-toolbar-group'; wrap.className='toolbar-group';
      wrap.innerHTML = '<div class="toolbar-sep"></div><button class="tb" onclick="openTemplatesModal&&openTemplatesModal()">🗂 Templates</button><button class="tb" onclick="window.SP_ENH.exportMode(\'assistant\')">🛠 PDF tech</button><button class="tb" onclick="window.SP_ENH.exportMode(\'client\')">🎯 PDF client</button><button class="tb" onclick="window.SP_ENH.openProductivity()">⚙ Productivité</button>';
      toolbar.appendChild(wrap);
    }
  }



  function ensureVisiblePremiumUI(){
    const host = byId('topProjectBar') || byId('toolbar');
    if(!host || byId('premiumFeatureBar')) return;
    const bar=document.createElement('div');
    bar.id='premiumFeatureBar';
    bar.className='premium-feature-bar';
    bar.innerHTML = `
      <div class="premium-inline">
        <span class="tag">Bibliothèque premium</span>
        <button class="small-btn" onclick="openCatalogModal&&openCatalogModal()">🧰 Catalogue</button>
        <button class="small-btn" onclick="openTemplatesModal&&openTemplatesModal()">🗂 Templates métier</button>
        <button class="small-btn" onclick="openAuditModal&&openAuditModal()">🩺 Audit</button>
        <button class="small-btn b-green" onclick="window.SP_ENH.exportMode('assistant')">🛠 PDF tech</button>
        <button class="small-btn b-green" onclick="window.SP_ENH.exportMode('client')">🎯 PDF client</button>
        <button class="small-btn" onclick="window.SP_ENH.openProductivity()">⚙ Productivité</button>
      </div>
      <div class="muted tiny" style="margin-top:6px">Templates disponibles : Corporate · Beauté · Mode plein pied · Packshot bouteille · Packshot e-commerce · Fond blanc · Couple · Famille · Boudoir · Low key dramatique · Clamshell · Rembrandt · Butterfly · Split light.</div>`;
    if(host.nextSibling) host.parentNode.insertBefore(bar, host.nextSibling); else host.parentNode.appendChild(bar);
  }

  function ensureProductivityModal(){
    if(byId('productivityModal')) return;
    const m=document.createElement('div'); m.id='productivityModal'; m.className='modal';
    m.innerHTML = `<div class="modal-dialog"><div class="modal-head"><div><h3 style="font-size:16px">⚙ Productivité</h3><div class="muted">Outils rapides pour travailler sans déplacer les objets à la main comme en 1998.</div></div><button class="small-btn b-ghost" onclick="document.getElementById('productivityModal').classList.remove('open')">✕</button></div><div class="modal-card"><div class="g2"><button onclick="window.SP_ENH.lockSelected(true)">🔒 Verrouiller sélection</button><button onclick="window.SP_ENH.lockSelected(false)">🔓 Déverrouiller sélection</button><button onclick="window.SP_ENH.groupSelection()">🧩 Grouper</button><button onclick="window.SP_ENH.ungroupSelection()">🪄 Dégrouper</button><button onclick="window.SP_ENH.alignSelection('left')">⬅ Aligner à gauche</button><button onclick="window.SP_ENH.alignSelection('center')">↔ Centrer</button><button onclick="window.SP_ENH.alignSelection('right')">➡ Aligner à droite</button><button onclick="window.SP_ENH.alignSelection('middle')">↕ Aligner milieu</button><button onclick="window.SP_ENH.mirrorDuplicate()">🪞 Dupliquer miroir</button><button onclick="window.SP_ENH.autoDistances()">📏 Distances auto</button><button onclick="window.SP_ENH.autoGuides()">🎯 Repères auto</button><button onclick="window.SP_ENH.openVariantVisualCompare()">🆚 Variantes visuelles</button></div><div class="note" style="margin-top:12px"><strong>Raccourcis</strong> <span class="quick-kbd">L</span> verrouiller · <span class="quick-kbd">Ctrl/Cmd + K</span> palette · <span class="quick-kbd">R</span> rotation</div></div></div>`;
    document.body.appendChild(m);
  }

  function getSelectedMany(){ return cv.getActiveObjects && cv.getActiveObjects().length ? cv.getActiveObjects() : (sel() ? [sel()] : []); }
  function lockSelected(flag){ const objs=getSelectedMany(); if(!objs.length) return toast('Sélectionne au moins un objet'); objs.forEach(o=>{ o.locked=flag; if(window.applyLockState) applyLockState(o); else { o.lockMovementX=flag; o.lockMovementY=flag; o.lockRotation=flag; o.lockScalingX=flag; o.lockScalingY=flag; o.hasControls=!flag; } }); cv.requestRenderAll(); saveState&&saveState(); toast(flag?'Sélection verrouillée':'Sélection déverrouillée'); }
  function groupSelection(){ const active=cv.getActiveObject(); if(active && active.type==='activeSelection'){ active.toGroup(); cv.requestRenderAll(); saveState&&saveState(); toast('Groupe créé'); } else toast('Sélection multiple requise'); }
  function ungroupSelection(){ const active=sel(); if(active && active.type==='group'){ active.toActiveSelection(); cv.requestRenderAll(); saveState&&saveState(); toast('Groupe dissocié'); } else toast('Sélectionne un groupe'); }
  function alignSelection(mode){ const objs=getSelectedMany(); if(objs.length<2) return toast('Sélection multiple requise'); const xs=objs.map(o=>o.left), ys=objs.map(o=>o.top); const left=Math.min(...xs), right=Math.max(...xs), center=(left+right)/2, top=Math.min(...ys), bottom=Math.max(...ys), middle=(top+bottom)/2; objs.forEach(o=>{ if(mode==='left') o.left=left; if(mode==='center') o.left=center; if(mode==='right') o.left=right; if(mode==='top') o.top=top; if(mode==='middle') o.top=middle; if(mode==='bottom') o.top=bottom; o.setCoords(); }); cv.requestRenderAll(); saveState&&saveState(); }
  function mirrorDuplicate(){ const o=sel(); if(!o) return toast('Sélectionne un objet ou un groupe'); const centerX=roomR.left+roomR.width/2; o.clone(cl=>{ cl.left = centerX + (centerX - o.left); cl.top = o.top; cl.angle = (360-(o.angle||0))%360; cl.setCoords(); cv.add(cl); cv.setActiveObject(cl); cv.requestRenderAll(); saveState&&saveState(); toast('Copie miroir créée'); }); }
  function autoDistances(){ const objs=getSelectedMany(); if(!objs.length) return toast('Sélectionne un ou plusieurs objets'); const subject=cv.getObjects().find(o=>o.ctype==='subject'); if(!subject) return toast('Ajoute un sujet d’abord'); objs.forEach((o,i)=>{ if(o===subject) return; const d=window.dist2?dist2(o,subject):0; const n=new fabric.IText(`${getLbl(o)} → sujet : ${d} cm`,{left:o.left+18, top:o.top+18+(i*14), fontSize:11, fill:'#2563eb', backgroundColor:'rgba(255,255,255,.92)', padding:4}); n.ctype='note'; n.isSO=true; cv.add(n); }); cv.requestRenderAll(); toast('Distances annotées'); }
  function autoGuides(){ const objs=cv.getObjects().filter(o=>o.isSO); const sub=objs.find(o=>o.ctype==='subject'); const cam=objs.find(o=>o.ctype==='camera'); if(!sub||!cam) return toast('Ajoute au moins un sujet et une caméra'); const lines=[new fabric.Line([cam.left,cam.top,sub.left,sub.top],{stroke:'#f59e0b',strokeWidth:1.5,strokeDashArray:[6,4],selectable:false,evented:false})]; objs.filter(o=>o.ctype==='light').forEach(l=>lines.push(new fabric.Line([l.left,l.top,sub.left,sub.top],{stroke:'rgba(74,142,255,.55)',strokeWidth:1,strokeDashArray:[5,4],selectable:false,evented:false}))); lines.forEach(l=>{ l._guide=true; cv.add(l); cv.sendToBack(l); }); toast('Repères automatiques ajoutés'); }

  function makeVariantThumb(payload){
    return new Promise(resolve=>{
      try{
        const tmp = document.createElement('canvas'); tmp.width=520; tmp.height=340;
        const sc = new fabric.StaticCanvas(tmp, {backgroundColor:'#fff'});
        sc.loadFromJSON(payload.canvas, ()=>{ sc.renderAll(); resolve(tmp.toDataURL('image/png')); });
      }catch(e){ resolve(''); }
    });
  }

  async function openVariantVisualCompare(){
    let modal=byId('variantVisualModal');
    if(!modal){ modal=document.createElement('div'); modal.id='variantVisualModal'; modal.className='modal'; modal.innerHTML='<div class="modal-dialog modal-dialog-wide"><div class="modal-head"><div><h3 style="font-size:16px">🆚 Comparaison visuelle des variantes</h3><div class="muted">Miniatures studio pour comparer rapidement les directions retenues.</div></div><button class="small-btn b-ghost" onclick="document.getElementById(\'variantVisualModal\').classList.remove(\'open\')">✕</button></div><div id="variantVisualBody" class="gallery-grid"></div></div>'; document.body.appendChild(modal);} 
    modal.classList.add('open');
    const vars=(getLocalCollection?getLocalCollection(STORAGE_KEYS.variants):[]).filter(v=>(v.meta?.variantOf||'')===(getProjectMeta().name||''));
    window.__variantVisualCompareStore = vars.slice(0,6);
    const body=byId('variantVisualBody');
    if(!vars.length){ body.innerHTML='<div class="muted">Aucune variante à comparer.</div>'; return; }
    body.innerHTML='<div class="muted">Génération des miniatures…</div>';
    const cards=[]; for(let i=0;i<Math.min(vars.length,6);i++){ const v=vars[i]; const img=await makeVariantThumb(v); cards.push(`<div class="gallery-card"><h5>${esc(v.meta?.variantLabel||'Variante')}</h5><div class="muted">${esc(v.meta?.shootType||'')}</div>${img?`<img class="compare-shot" src="${img}">`:''}<div class="premium-inline" style="margin-top:8px"><button class="small-btn b-blue" onclick="window.SP_ENH.loadVariantVisual(${i})">Charger</button></div></div>`); }
    body.innerHTML=cards.join('');
  }

  function enhanceDashboard(){
    const summary=byId('dashboardSummary'); if(summary){ summary.innerHTML = `<div class="gallery-grid"><div class="gallery-card"><h5>Exemples prêts à tester</h5><div class="muted">Corporate, beauté, couple, packshot, low key.</div><div class="premium-inline" style="margin-top:8px"><button class="small-btn b-blue" onclick="openTemplatesModal&&openTemplatesModal()">Voir les templates</button></div></div><div class="gallery-card"><h5>Raccourcis utiles</h5><div class="muted"><span class="quick-kbd">Ctrl/Cmd + K</span> palette · <span class="quick-kbd">L</span> verrouiller · <span class="quick-kbd">R</span> rotation</div></div><div class="gallery-card"><h5>Mode démo</h5><div class="muted">Charge un template métier puis exporte une fiche client.</div><div class="premium-inline" style="margin-top:8px"><button class="small-btn" onclick="presetCorporate&&presetCorporate()">Démo corporate</button></div></div><div class="gallery-card"><h5>Galerie setups</h5><div class="muted">Utilise les templates comme galerie de départ pour montrer la valeur en moins de 30 secondes.</div></div><div class="gallery-card"><h5>Exports premium</h5><div class="muted">Deux PDF distincts : technique pour l’assistant, présentation pour le client.</div><div class="premium-inline" style="margin-top:8px"><button class="small-btn" onclick="window.SP_ENH.exportMode('assistant')">PDF tech</button><button class="small-btn b-green" onclick="window.SP_ENH.exportMode('client')">PDF client</button></div></div></div>`; }
  }

  function patchRenderDashboard(){
    if(typeof window.renderDashboard === 'function'){
      const prev=window.renderDashboard;
      window.renderDashboard=function(){ try{ prev(); }catch(e){ console.warn(e); } enhanceDashboard(); };
    } else {
      window.renderDashboard=enhanceDashboard;
    }
  }


  function sceneCounts(){
    const objs=(cv.getObjects().filter(o=>o.isSO || o.ctype==='note' || o.ctype==='measure'))||[];
    return {
      total: objs.length,
      subjects: objs.filter(o=>o.ctype==='subject').length,
      lights: objs.filter(o=>o.ctype==='light').length,
      modifiers: objs.filter(o=>o.ctype==='modifier').length,
      cameras: objs.filter(o=>o.ctype==='camera').length,
      accessories: objs.filter(o=>o.ctype==='accessory').length,
      backgrounds: objs.filter(o=>o.ctype==='background').length
    };
  }

  function computeSetupAuditImpl(){
    const c=sceneCounts();
    const warnings=[]; const recos=[]; const checklist=[];
    let score=55;
    if(c.subjects>0){ score+=8; checklist.push('Sujet présent'); } else warnings.push('Aucun sujet dans la scène.');
    if(c.cameras>0){ score+=8; checklist.push('Caméra placée'); } else warnings.push('Aucune caméra placée.');
    if(c.lights>0){ score+=8; checklist.push('Au moins une source'); } else warnings.push('Aucune lumière présente.');
    if(c.backgrounds>0){ score+=4; checklist.push('Fond présent'); }
    if(c.modifiers>0){ score+=5; checklist.push('Modificateur(s) présent(s)'); }
    if(c.lights>=2){ score+=5; recos.push('Le setup propose une base clé + fill / rim plus souple.'); }
    if(c.lights===1) recos.push('Ajoute une deuxième source ou un réflecteur pour mieux modeler.');
    if(c.subjects>1 && c.lights<2) warnings.push('Plusieurs sujets avec peu de sources : homogénéité à surveiller.');
    if(c.cameras===0 || c.subjects===0 || c.lights===0) score-=10;
    if(c.backgrounds===0) recos.push('Ajoute un fond pour rendre la fiche plus exploitable.');
    const badge=score>=85?'Très solide':score>=70?'Propre':score>=55?'À consolider':'Fragile';
    return {score:Math.max(0,Math.min(100,score)), badge, warnings, recos, checklist};
  }

  function renderAuditModalImpl(){
    const audit=computeSetupAuditImpl();
    const counts=sceneCounts();

    const hubEl=byId('projectHubAudit');
    if(hubEl){
      hubEl.innerHTML=`<div class="gallery-grid">
        <div class="gallery-card"><h5>Score global</h5><div class="metric-score" style="font-size:30px">${audit.score}</div><div class="muted">${esc(audit.badge)}</div></div>
        <div class="gallery-card"><h5>KPI scène</h5><div class="muted">${counts.subjects} sujet(s) · ${counts.lights} lumière(s) · ${counts.modifiers} modificateur(s) · ${counts.cameras} caméra(s)</div></div>
      </div>
      <div class="grid2" style="margin-top:12px">
        <div class="note"><strong>Checklist</strong><ul class="list">${(audit.checklist.length?audit.checklist:['Aucune étape validée']).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
        <div class="note"><strong>Points de vigilance</strong><ul class="list">${(audit.warnings.length?audit.warnings:['Aucun signal rouge majeur.']).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      </div>
      <div class="note" style="margin-top:12px"><strong>Recommandations</strong><ul class="list">${(audit.recos.length?audit.recos:['Le setup est déjà bien cadré.']).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
    }

    const scoreLine=byId('auditScoreLine');
    if(scoreLine){
      scoreLine.innerHTML=`<div class="gallery-grid">
        <div class="gallery-card"><h5>Score global</h5><div class="metric-score" style="font-size:30px">${audit.score}</div><div class="muted">${esc(audit.badge)}</div></div>
        <div class="gallery-card"><h5>Diagnostic</h5><div class="muted">${esc(audit.warnings[0]||audit.recos[0]||'Aucun point critique détecté.')}</div></div>
      </div>`;
    }

    const kpis=byId('auditKpis');
    if(kpis){
      kpis.innerHTML=`
        <div class="gallery-card"><h5>Sujets</h5><div class="metric-score">${counts.subjects}</div></div>
        <div class="gallery-card"><h5>Lumières</h5><div class="metric-score">${counts.lights}</div></div>
        <div class="gallery-card"><h5>Modificateurs</h5><div class="metric-score">${counts.modifiers}</div></div>
        <div class="gallery-card"><h5>Caméras</h5><div class="metric-score">${counts.cameras}</div></div>`;
    }

    const checklist=byId('auditChecklist');
    if(checklist){
      checklist.innerHTML=(audit.checklist.length?audit.checklist:['Aucune étape validée']).map(x=>`<li>${esc(x)}</li>`).join('');
    }

    const warnings=byId('auditWarnings');
    if(warnings){
      warnings.innerHTML=`<div class="note"><strong>Points de vigilance</strong><ul class="list">${(audit.warnings.length?audit.warnings:['Aucun signal rouge majeur.']).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
      <div class="note" style="margin-top:12px"><strong>Recommandations</strong><ul class="list">${(audit.recos.length?audit.recos:['Le setup est déjà bien cadré.']).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`;
    }

    const scoreEl=byId('tpScore'); if(scoreEl) scoreEl.textContent=String(audit.score);
  }

  function renderDashboardImpl(){
    const recent=typeof getLocalCollection==='function' && typeof STORAGE_KEYS!=='undefined' ? getLocalCollection(STORAGE_KEYS.projects).slice(0,4) : [];
    const temps=typeof getLocalCollection==='function' && typeof STORAGE_KEYS!=='undefined' ? getLocalCollection(STORAGE_KEYS.templates).slice(0,4) : [];
    const summary=byId('dashboardSummary');
    if(summary){
      summary.innerHTML=`<div class="gallery-grid">
        <div class="gallery-card"><h5>Projets récents</h5>${recent.length?recent.map(p=>`<div class="muted">• ${esc(p.meta?.name||'Projet')}</div>`).join(''):'<div class="muted">Aucun projet récent.</div>'}</div>
        <div class="gallery-card"><h5>Templates récents</h5>${temps.length?temps.map(p=>`<div class="muted">• ${esc(p.meta?.name||'Template')}</div>`).join(''):'<div class="muted">Aucun template récent.</div>'}</div>
        <div class="gallery-card"><h5>Valeur immédiate</h5><div class="muted">Choisis un template métier, ajuste le matériel, exporte une fiche client ou assistant.</div></div>
      </div>`;
    }
    enhanceDashboard();
  }

  function updateTopProjectBarImpl(){
    const meta=window.getProjectMeta?getProjectMeta():{name:'Projet sans titre',client:'',shootType:'Portrait'};
    const counts=sceneCounts();
    const nameEl=byId('tpName'); if(nameEl) nameEl.textContent=meta.name||'Projet sans titre';
    const metaEl=byId('tpMeta'); if(metaEl) metaEl.textContent=`${meta.shootType||'Portrait'}${meta.client?` · ${meta.client}`:''}`;
    const objEl=byId('tpObjects'); if(objEl) objEl.textContent=String(counts.total);
    const scoreEl=byId('tpScore'); if(scoreEl) scoreEl.textContent=String(computeSetupAuditImpl().score);
  }

  function init(){
    ensureEnhancementStyles();
    addToolbarButtons();
    ensureProductivityModal();
    patchRenderDashboard();
    window.computeSetupAudit = computeSetupAuditImpl;
    window.renderAuditModal = renderAuditModalImpl;
    window.openAuditModal = function(){ byId('auditModal')?.classList.add('open'); renderAuditModalImpl(); };
    window.closeAuditModal = function(){ byId('auditModal')?.classList.remove('open'); };
    window.renderDashboard = renderDashboardImpl;
    window.openDashboard = function(){ byId('dashboardModal')?.classList.add('open'); renderDashboardImpl(); };
    window.closeDashboard = function(){ byId('dashboardModal')?.classList.remove('open'); };
    window.updateTopProjectBar = updateTopProjectBarImpl;
    window.SP_ENH = {
      toggleFav, runCatalog:runCatalogItemById, showCatalog:(id)=>renderCatalogDetail(getCatalogRows().find(x=>x.id===id)),
      applyTemplate:applyTemplateById, showTemplate, exportMode:exportPremium,
      openProductivity:()=>byId('productivityModal').classList.add('open'), lockSelected, groupSelection, ungroupSelection, alignSelection, mirrorDuplicate, autoDistances, autoGuides, openVariantVisualCompare,
      loadVariantVisual:(i)=>{ const v=(window.__variantVisualCompareStore||[])[i]; if(v && window.restoreSerializedProject) restoreSerializedProject(v); byId('variantVisualModal')?.classList.remove('open'); }
    };
    window.renderCatalog = renderCatalogEnhanced;
    window.renderTemplateLibrary = renderTemplateLibraryEnhanced;
    window.openTemplatesModal = function(){ byId('templatesModal')?.classList.add('open'); renderTemplateLibraryEnhanced(); };
    window.closeTemplatesModal = function(){ byId('templatesModal')?.classList.remove('open'); };
    window.openCatalogModal = function(){ byId('catalogModal')?.classList.add('open'); renderCatalogEnhanced(); };
    window.closeCatalogModal = function(){ byId('catalogModal')?.classList.remove('open'); };
    window.exportSetupReport = exportPremium;
    ensureVisiblePremiumUI();
    if(byId('dashboardModal')) enhanceDashboard();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else setTimeout(init, 50);
})();
