(function () {
  function fillIfEmpty(id, html) {
    var el = document.getElementById(id);
    if (el && !String(el.innerHTML || '').trim()) {
      el.innerHTML = html;
    }
  }
   fillIfEmpty('sidebarTabs',
    '<button class="sidebar-tab active" data-sidebar-tab="cameras">📷 Caméras</button>' +
    '<button class="sidebar-tab" data-sidebar-tab="subjects">🧍 Sujets</button>' +
    '<button class="sidebar-tab" data-sidebar-tab="lights">💡 Lumières</button>' +
    '<button class="sidebar-tab" data-sidebar-tab="modifiers">🔆 Modifs</button>' +
    '<button class="sidebar-tab" data-sidebar-tab="notes">📝 Notes</button>'
  );
   fillIfEmpty('viewTabs',
    '<button class="view-tab active" data-view="setup">Vue Studio</button>' +
    '<button class="view-tab" data-view="camera">Vue APN</button>' +
    '<button class="view-tab" data-view="light">Vue Lumière</button>' +
    '<button class="view-tab" data-view="iso">Vue Iso</button>'
  );
   fillIfEmpty('studioMenu',
    '<div class="menu-section">' +
      '<p class="menu-label">Tailles</p>' +
      '<button class="menu-item" data-studio-size="6 × 6 m"><span>6 × 6 m</span><small>indoor</small></button>' +
      '<button class="menu-item" data-studio-size="8 × 8 m"><span>8 × 8 m</span><small>indoor</small></button>' +
      '<button class="menu-item" data-studio-size="10 × 8 m"><span>10 × 8 m</span><small>indoor</small></button>' +
      '<button class="menu-item" data-studio-size="12 × 10 m"><span>12 × 10 m</span><small>indoor</small></button>' +
      '<button class="menu-item" data-studio-size="15 × 12 m"><span>15 × 12 m</span><small>indoor</small></button>' +
      '<button class="menu-item" data-studio-size="Outdoor"><span>Outdoor</span><small>outdoor</small></button>' +
    '</div>' +
    '<div class="menu-section">' +
      '<p class="menu-label">Texture</p>' +
      '<button class="menu-item" data-texture="concrete"><span>concrete</span><small>surface</small></button>' +
      '<button class="menu-item" data-texture="parquet"><span>parquet</span><small>surface</small></button>' +
      '<button class="menu-item" data-texture="vinyl-white"><span>vinyl-white</span><small>surface</small></button>' +
    '</div>'
  );
   fillIfEmpty('presetMenu',
    '<div class="preset-group"><h4>Corporate</h4>' +
      '<button class="preset-btn" data-preset="corporate-clean">Corporate Clean<small>Portrait corporate propre et doux.</small></button>' +
      '<button class="preset-btn" data-preset="corporate-rim">Executive Rim<small>Rim discret, rendu premium.</small></button>' +
    '</div>' +
    '<div class="preset-group"><h4>Éclairage Classique</h4>' +
      '<button class="preset-btn" data-preset="classic-rembrandt">Rembrandt<small>Triangle lumineux sur la joue ombre.</small></button>' +
      '<button class="preset-btn" data-preset="classic-clamshell">Clamshell<small>Schéma beauté doux.</small></button>' +
    '</div>' +
    '<div class="preset-group"><h4>Beauté</h4>' +
      '<button class="preset-btn" data-preset="beauty-glossy">Glossy Skin<small>Beauté brillante et frontale.</small></button>' +
    '</div>' +
    '<div class="preset-group"><h4>Packshot / Produit</h4>' +
      '<button class="preset-btn" data-preset="product-bottle">Bottle Hero<small>Reflets latéraux contrôlés.</small></button>' +
    '</div>' +
    '<div class="preset-group"><h4>Cinéma / Interview</h4>' +
      '<button class="preset-btn" data-preset="cinema-talking-head">Talking Head LED<small>Interview LED moderne.</small></button>' +
    '</div>'
  );
})();
  
