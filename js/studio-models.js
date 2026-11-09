// Modeles 3D des elements du studio.
//
// Chaque element est decrit une seule fois, en metres et a ses vraies dimensions,
// sous forme de faces 3D (boites, cylindres, cones, spheres, panneaux).
// Le meme modele sert aux trois vues : vignette de bibliotheque, vue plan (dessus)
// et vue isometrique. Le rendu applique un eclairage simple, des ombres portees au
// sol et un tri de profondeur (algorithme du peintre).
//
// Repere local d'un element : x = direction vers laquelle il est oriente
// (la poignee de rotation), y = cote, z = hauteur depuis le sol.
// Expose : window.LiteStudioModels.
(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Vecteurs
  // ---------------------------------------------------------------------------
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function mul(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function length(a) { return Math.hypot(a[0], a[1], a[2]); }
  function normalize(a) { const l = length(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
  function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
  function centroid(points) {
    let x = 0; let y = 0; let z = 0;
    points.forEach(function (p) { x += p[0]; y += p[1]; z += p[2]; });
    return [x / points.length, y / points.length, z / points.length];
  }
  function polygonNormal(points) {
    // Methode de Newell : robuste pour les polygones quelconques.
    let nx = 0; let ny = 0; let nz = 0;
    for (let i = 0; i < points.length; i += 1) {
      const a = points[i];
      const b = points[(i + 1) % points.length];
      nx += (a[1] - b[1]) * (a[2] + b[2]);
      ny += (a[2] - b[2]) * (a[0] + b[0]);
      nz += (a[0] - b[0]) * (a[1] + b[1]);
    }
    return normalize([nx, ny, nz]);
  }
  function basisFor(axis) {
    const a = normalize(axis);
    const helper = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
    const u = normalize(cross(a, helper));
    const v = cross(a, u);
    return { a: a, u: u, v: v };
  }
  function rotateZ(p, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return [p[0] * c - p[1] * s, p[0] * s + p[1] * c, p[2]];
  }
  function rotateAround(p, origin, axis, angle) {
    // Rotation de Rodrigues autour d'un axe passant par origin.
    const k = normalize(axis);
    const v = sub(p, origin);
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const rotated = add(add(mul(v, c), mul(cross(k, v), s)), mul(k, dot(k, v) * (1 - c)));
    return add(rotated, origin);
  }

  // ---------------------------------------------------------------------------
  // Couleurs et materiaux
  // ---------------------------------------------------------------------------
  const rgbCache = new Map();
  function hexToRgb(hex) {
    if (rgbCache.has(hex)) return rgbCache.get(hex);
    const clean = hex.replace("#", "");
    const full = clean.length === 3 ? clean.split("").map(function (c) { return c + c; }).join("") : clean;
    const value = parseInt(full, 16);
    const rgb = [(value >> 16) & 255, (value >> 8) & 255, value & 255];
    rgbCache.set(hex, rgb);
    return rgb;
  }

  function material(color, options) {
    return Object.assign({
      color: color,
      edges: false,      // trait de contour (objets rigides)
      emissive: 0,       // 0..1 : part de lumiere propre (diffuseurs allumes)
      alpha: 1,          // transparence (tissus, filets)
      spec: 0,           // reflet speculaire (metal, argent)
      doubleSided: false,
      shadow: true
    }, options || {});
  }

  const MAT = {
    blackFabric: material("#26292e"),
    blackMetal: material("#2c3036", { edges: true, spec: 0.25 }),
    darkGray: material("#41464d", { edges: true, spec: 0.2 }),
    steel: material("#9aa2ab", { edges: true, spec: 0.55 }),
    chrome: material("#c3c9cf", { edges: true, spec: 0.9 }),
    grip: material("#1b1d21"),
    diffuser: material("#fbfbf8", { emissive: 0.75, doubleSided: true }),
    diffuserWarm: material("#fff8ec", { emissive: 0.85, doubleSided: true }),
    whiteFabric: material("#eceff1", { doubleSided: true }),
    silverFabric: material("#cfd5db", { spec: 0.9, doubleSided: true }),
    goldFabric: material("#d8b46a", { spec: 0.8, doubleSided: true }),
    translucent: material("#f6f7f9", { alpha: 0.78, emissive: 0.45, doubleSided: true }),
    scrimNet: material("#30343a", { alpha: 0.5, doubleSided: true, shadow: false }),
    whiteBoard: material("#f1f2ef", { edges: true, doubleSided: true }),
    blackBoard: material("#1f2226", { edges: true, doubleSided: true }),
    mirror: material("#bcd6ea", { spec: 1, edges: true }),
    glass: material("#4d7ea8", { spec: 1 }),
    lensGlass: material("#2c5d8c", { spec: 1, emissive: 0.15 }),
    screen: material("#1d3147", { emissive: 0.35, spec: 0.4 }),
    plasticWhite: material("#e6e8ea", { edges: true, spec: 0.3 }),
    plasticDark: material("#33373d", { edges: true, spec: 0.3 }),
    wood: material("#b98b5c", { edges: true }),
    woodLight: material("#d7b48a", { edges: true }),
    woodDark: material("#6e4b31", { edges: true }),
    canvas: material("#3b3f45", { doubleSided: true }),
    leather: material("#6b4a35"),
    velvet: material("#8c6e8a"),
    fabricBeige: material("#c8b9a3"),
    fabricGray: material("#7d838b"),
    sandbag: material("#a0262b"),
    sandbagStrap: material("#1d1f22"),
    bulb: material("#fff3d6", { emissive: 0.9 }),
    cable: material("#15171a"),
    rubber: material("#15171a"),
    skin: material("#e0b493"),
    skinDark: material("#c8946f"),
    hairDark: material("#3a2a21"),
    hairBlond: material("#b88b4a"),
    shirt: material("#4f6b8a"),
    shirtLight: material("#d9d2c5"),
    dress: material("#8e3b4a"),
    trousers: material("#2f3540"),
    jeans: material("#3d5675"),
    shoes: material("#1b1b1d", { spec: 0.3 }),
    whiteCube: material("#f2f2ef", { edges: true })
  };

  // ---------------------------------------------------------------------------
  // Constructeur de modeles
  // ---------------------------------------------------------------------------
  function Builder() {
    this.faces = [];
  }

  // Ajoute une face. center = point interieur du solide (pour orienter la normale
  // vers l'exterieur) ; sans center, la face est double face.
  // towardDir : force une face simple orientee vers cette direction.
  Builder.prototype.face = function (points, mat, interior, towardDir) {
    let normal = polygonNormal(points);
    const c = centroid(points);
    let doubleSided = mat.doubleSided;
    if (towardDir) {
      if (dot(normal, towardDir) < 0) normal = mul(normal, -1);
      doubleSided = false;
    } else if (interior) {
      if (dot(normal, sub(c, interior)) < 0) normal = mul(normal, -1);
    } else {
      doubleSided = true;
    }
    this.faces.push({ points: points, normal: normal, center: c, mat: mat, doubleSided: doubleSided });
    return this;
  };

  // Relie une suite d'anneaux (meme nombre de points) : cylindres, cones, softbox...
  Builder.prototype.loft = function (rings, mat, options) {
    const opts = options || {};
    const count = rings[0].length;
    const centers = rings.map(centroid);
    for (let r = 0; r < rings.length - 1; r += 1) {
      const axisMid = lerp(centers[r], centers[r + 1], 0.5);
      for (let i = 0; i < count; i += 1) {
        const j = (i + 1) % count;
        const quad = [rings[r][i], rings[r][j], rings[r + 1][j], rings[r + 1][i]];
        if (opts.open) this.face(quad, mat);
        else this.face(quad, mat, axisMid);
      }
    }
    const solidCenter = centroid(centers);
    if (opts.capStart) this.face(rings[0].slice(), opts.capStartMat || mat, solidCenter);
    if (opts.capEnd) this.face(rings[rings.length - 1].slice(), opts.capEndMat || mat, solidCenter);
    return this;
  };

  function ring(center, axis, radiusU, radiusV, segments, phase) {
    const b = basisFor(axis);
    const points = [];
    const start = phase || 0;
    for (let i = 0; i < segments; i += 1) {
      const t = start + (i / segments) * Math.PI * 2;
      points.push(add(center, add(mul(b.u, Math.cos(t) * radiusU), mul(b.v, Math.sin(t) * radiusV))));
    }
    return points;
  }

  // Anneau dans le plan (u, v) explicites.
  function ringUV(center, u, v, radiusU, radiusV, segments, phase) {
    const points = [];
    const start = phase || 0;
    for (let i = 0; i < segments; i += 1) {
      const t = start + (i / segments) * Math.PI * 2;
      points.push(add(center, add(mul(u, Math.cos(t) * radiusU), mul(v, Math.sin(t) * radiusV))));
    }
    return points;
  }

  function rectRing(center, u, v, halfU, halfV) {
    return [
      add(center, add(mul(u, -halfU), mul(v, -halfV))),
      add(center, add(mul(u, halfU), mul(v, -halfV))),
      add(center, add(mul(u, halfU), mul(v, halfV))),
      add(center, add(mul(u, -halfU), mul(v, halfV)))
    ];
  }

  // Tronc de cone entre p1 (rayon r1) et p2 (rayon r2).
  Builder.prototype.frustum = function (p1, r1, p2, r2, mat, segments, caps) {
    const axis = sub(p2, p1);
    const seg = segments || 12;
    const withCaps = caps !== false;
    return this.loft([ring(p1, axis, r1, r1, seg), ring(p2, axis, r2, r2, seg)], mat, { capStart: withCaps && r1 > 0, capEnd: withCaps && r2 > 0 });
  };

  Builder.prototype.cylinder = function (p1, p2, r, mat, segments, caps) {
    return this.frustum(p1, r, p2, r, mat, segments, caps);
  };

  // Tige fine (tubes de pied, bras) : peu de facettes, pas de contour.
  Builder.prototype.rod = function (p1, p2, r, mat) {
    return this.frustum(p1, r, p2, r, mat || MAT.steel, 6, true);
  };

  // Boite orientee : centre, demi-tailles et axes (par defaut x, y, z).
  Builder.prototype.box = function (center, size, mat, axes) {
    const ex = axes ? normalize(axes[0]) : [1, 0, 0];
    const ey = axes ? normalize(axes[1]) : [0, 1, 0];
    const ez = axes ? normalize(axes[2]) : [0, 0, 1];
    const hx = size[0] / 2; const hy = size[1] / 2; const hz = size[2] / 2;
    const corner = function (sx, sy, sz) {
      return add(center, add(add(mul(ex, sx * hx), mul(ey, sy * hy)), mul(ez, sz * hz)));
    };
    const c = [
      corner(-1, -1, -1), corner(1, -1, -1), corner(1, 1, -1), corner(-1, 1, -1),
      corner(-1, -1, 1), corner(1, -1, 1), corner(1, 1, 1), corner(-1, 1, 1)
    ];
    const faces = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
    const self = this;
    faces.forEach(function (f) {
      self.face(f.map(function (i) { return c[i]; }), mat, center);
    });
    return this;
  };

  // Boite posee au sol (ou a z0) dans le repere local : x0..x1, y0..y1, z0..z1.
  Builder.prototype.block = function (x0, y0, z0, x1, y1, z1, mat) {
    return this.box([(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2], [Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0)], mat);
  };

  Builder.prototype.ellipsoid = function (center, rx, ry, rz, mat, segments, stacks) {
    const seg = segments || 12;
    const st = stacks || 8;
    const rings = [];
    for (let i = 1; i < st; i += 1) {
      const phi = -Math.PI / 2 + (i / st) * Math.PI;
      const z = Math.sin(phi) * rz;
      const r = Math.cos(phi);
      rings.push(ringUV(add(center, [0, 0, z]), [1, 0, 0], [0, 1, 0], rx * r, ry * r, seg));
    }
    this.loft(rings, mat, {});
    const bottom = add(center, [0, 0, -rz]);
    const top = add(center, [0, 0, rz]);
    for (let i = 0; i < seg; i += 1) {
      const j = (i + 1) % seg;
      this.face([bottom, rings[0][j], rings[0][i]], mat, center);
      this.face([top, rings[rings.length - 1][i], rings[rings.length - 1][j]], mat, center);
    }
    return this;
  };

  Builder.prototype.sphere = function (center, r, mat, segments, stacks) {
    return this.ellipsoid(center, r, r, r, mat, segments, stacks);
  };

  // Tore (ring light) : centre, axe, grand rayon, rayon du tube.
  Builder.prototype.torus = function (center, axis, radius, tube, mat, segments, tubeSegments) {
    const seg = segments || 20;
    const tseg = tubeSegments || 6;
    const b = basisFor(axis);
    const rings = [];
    for (let i = 0; i <= seg; i += 1) {
      const t = (i / seg) * Math.PI * 2;
      const dir = add(mul(b.u, Math.cos(t)), mul(b.v, Math.sin(t)));
      const c = add(center, mul(dir, radius));
      rings.push(ringUV(c, dir, b.a, tube, tube, tseg));
    }
    for (let i = 0; i < seg; i += 1) {
      const mid = lerp(centroid(rings[i]), centroid(rings[i + 1]), 0.5);
      for (let k = 0; k < tseg; k += 1) {
        const l = (k + 1) % tseg;
        this.face([rings[i][k], rings[i][l], rings[i + 1][l], rings[i + 1][k]], mat, mid);
      }
    }
    return this;
  };

  // Panneau rectangulaire mince : centre, direction largeur, direction hauteur.
  Builder.prototype.panel = function (center, widthDir, heightDir, width, height, thickness, mat) {
    const w = normalize(widthDir);
    const h = normalize(heightDir);
    const n = normalize(cross(w, h));
    return this.box(center, [width, height, thickness], mat, [w, h, n]);
  };

  // Disque plat (double face).
  Builder.prototype.disc = function (center, axis, radius, mat, segments) {
    return this.face(ring(center, axis, radius, radius, segments || 20), mat);
  };

  // Transforme les faces ajoutees depuis `fromIndex` (rotation autour d'un axe).
  Builder.prototype.rotateSince = function (fromIndex, origin, axis, angle) {
    for (let i = fromIndex; i < this.faces.length; i += 1) {
      const f = this.faces[i];
      f.points = f.points.map(function (p) { return rotateAround(p, origin, axis, angle); });
      f.center = rotateAround(f.center, origin, axis, angle);
      f.normal = normalize(rotateAround(add(origin, f.normal), origin, axis, angle).map(function (v, k) { return v - origin[k]; }));
    }
    return this;
  };

  Builder.prototype.translateSince = function (fromIndex, offset) {
    for (let i = fromIndex; i < this.faces.length; i += 1) {
      const f = this.faces[i];
      f.points = f.points.map(function (p) { return add(p, offset); });
      f.center = add(f.center, offset);
    }
    return this;
  };

  // ---------------------------------------------------------------------------
  // Sous-ensembles communs
  // ---------------------------------------------------------------------------
  // Pied d'eclairage : colonne + 3 jambes. Renvoie le point haut.
  function lightStand(b, topZ, spread, options) {
    const opts = options || {};
    const legs = opts.legs || 3;
    const collarZ = Math.min(0.45, topZ * 0.25);
    const r = spread || 0.42;
    const base = opts.offset || [0, 0, 0];
    const p = function (x, y, z) { return add(base, [x, y, z]); };
    b.rod(p(0, 0, collarZ - 0.08), p(0, 0, topZ), opts.columnRadius || 0.016, MAT.blackMetal);
    b.rod(p(0, 0, collarZ - 0.1), p(0, 0, collarZ + 0.3), (opts.columnRadius || 0.016) * 1.5, MAT.blackMetal);
    for (let i = 0; i < legs; i += 1) {
      const a = (opts.legPhase || Math.PI) + (i / legs) * Math.PI * 2;
      const foot = p(Math.cos(a) * r, Math.sin(a) * r, 0.015);
      b.rod(p(0, 0, collarZ), foot, 0.011, MAT.blackMetal);
      b.rod(p(0, 0, collarZ - 0.08), lerp(p(0, 0, collarZ - 0.08), foot, 0.55), 0.007, MAT.blackMetal);
      if (opts.wheels) {
        b.sphere(add(foot, [0, 0, 0.02]), 0.035, MAT.rubber, 6, 4);
      } else {
        b.box(foot, [0.05, 0.03, 0.025], MAT.rubber, [[Math.cos(a), Math.sin(a), 0], [-Math.sin(a), Math.cos(a), 0], [0, 0, 1]]);
      }
    }
    return p(0, 0, topZ);
  }

  // Pied C-stand : base « tortue » a 3 jambes de hauteurs differentes.
  function cStandBase(b, topZ) {
    const heights = [0.12, 0.2, 0.28];
    const angles = [Math.PI * 0.95, Math.PI * 1.62, Math.PI * 0.3];
    b.rod([0, 0, 0.02], [0, 0, topZ], 0.017, MAT.chrome);
    b.rod([0, 0, 0.35], [0, 0, 1.1], 0.022, MAT.chrome);
    angles.forEach(function (a, i) {
      const foot = [Math.cos(a) * 0.45, Math.sin(a) * 0.45, 0.012];
      b.rod([0, 0, heights[i]], [foot[0] * 0.2, foot[1] * 0.2, heights[i]], 0.012, MAT.chrome);
      b.rod([foot[0] * 0.2, foot[1] * 0.2, heights[i]], foot, 0.012, MAT.chrome);
      b.box(foot, [0.05, 0.03, 0.025], MAT.rubber);
    });
    [0.35, 0.75, 1.1].forEach(function (z) {
      b.cylinder([0, 0, z - 0.025], [0, 0, z + 0.025], 0.03, MAT.blackMetal, 8);
    });
  }

  // Trepied photo/video. Renvoie le sommet.
  function tripod(b, apexZ, spread, options) {
    const opts = options || {};
    const r = spread || 0.38;
    for (let i = 0; i < 3; i += 1) {
      const a = Math.PI + (i / 3) * Math.PI * 2;
      const foot = [Math.cos(a) * r, Math.sin(a) * r, 0.01];
      const knee = lerp([0, 0, apexZ], foot, 0.48);
      b.rod([0, 0, apexZ], knee, opts.heavy ? 0.017 : 0.013, MAT.blackMetal);
      b.rod(knee, foot, opts.heavy ? 0.012 : 0.009, MAT.blackMetal);
      b.box(add(knee, [0, 0, 0]), [0.03, 0.03, 0.045], MAT.grip);
      if (opts.spreader) b.rod([0, 0, 0.04], lerp([0, 0, 0.04], foot, 0.55), 0.007, MAT.steel);
    }
    b.cylinder([0, 0, apexZ - 0.05], [0, 0, apexZ], 0.04, MAT.blackMetal, 10);
    b.rod([0, 0, apexZ - 0.28], [0, 0, apexZ], 0.012, MAT.steel);
    return [0, 0, apexZ];
  }

  // ---------------------------------------------------------------------------
  // Personnages
  // ---------------------------------------------------------------------------
  // Personnage tourne vers -x (face a la camera dans les presets), centre en (ox, oy).
  function person(b, height, options) {
    const opts = options || {};
    const s = height / 1.75;
    const o = opts.offset || [0, 0, 0];
    const p = function (x, y, z) { return add(o, [x * (opts.depthScale || 1), y, z]); };
    const H = height;
    const outfit = opts.outfit || {};
    const top = outfit.top || MAT.shirt;
    const legsMat = outfit.legs || MAT.trousers;
    const skin = opts.skin || MAT.skin;
    const hair = opts.hair || MAT.hairDark;
    const child = Boolean(opts.child);
    const headR = (child ? 0.1 : 0.095) * (child ? 1.05 : s);
    const standingHip = H * (child ? 0.5 : 0.52);
    // Assis : le bassin descend sur l'assise, tout le haut du corps suit.
    const seatZ = opts.seatZ;
    const lift = seatZ ? (seatZ + 0.06) - standingHip : 0;
    const hipZ = standingHip + lift;
    const shoulderZ = H * 0.815 + lift;
    const shoulderY = 0.2 * s * (child ? 0.85 : 1);

    // Jambes
    [-1, 1].forEach(function (side) {
      const y = side * 0.085 * s;
      if (seatZ) {
        const thigh = Math.min(0.44 * s, H * 0.25);
        const knee = p(-thigh, y * 1.1, hipZ + 0.02);
        const ankleZ = 0.07;
        const foot = p(-thigh - 0.04, y * 1.15, ankleZ);
        b.frustum(p(0, y, hipZ), 0.078 * s, knee, 0.056 * s, legsMat, 8, true);
        b.frustum(knee, 0.052 * s, foot, 0.04 * s, legsMat, 8, true);
        b.block(foot[0] - 0.15 * s, foot[1] - 0.045 * s, 0, foot[0] + 0.05 * s, foot[1] + 0.045 * s, 0.075, MAT.shoes);
        return;
      }
      b.frustum(p(0, y, hipZ), 0.075 * s, p(0.005, y * 0.95, H * 0.27), 0.055 * s, legsMat, 8, true);
      b.frustum(p(0.005, y * 0.95, H * 0.27), 0.05 * s, p(0.01, y * 0.92, 0.07), 0.04 * s, legsMat, 8, true);
      b.block(-0.13 * s, y - 0.045 * s, 0, 0.06 * s, y + 0.045 * s, 0.075, MAT.shoes);
    });
    // Buste : bassin -> taille -> poitrine -> epaules
    const torsoRings = [
      [hipZ - 0.04 * s, 0.11, 0.165],
      [H * 0.6 + lift, 0.095, 0.145],
      [H * 0.7 + lift, 0.11, 0.165],
      [H * 0.775 + lift, 0.1, 0.19],
      [shoulderZ, 0.075, 0.175]
    ].map(function (r) {
      return ringUV(p(0, 0, r[0]), [1, 0, 0], [0, 1, 0], r[1] * s, r[2] * s, 12);
    });
    b.loft(torsoRings, top, { capStart: true, capEnd: true });
    // Bras
    [-1, 1].forEach(function (side) {
      const shoulder = p(0, side * shoulderY, shoulderZ - 0.03 * s);
      // Assis : avant-bras poses vers l'avant, mains sur les cuisses.
      const elbow = seatZ ? p(-0.04 * s, side * (shoulderY + 0.02 * s), H * 0.62 + lift) : p(-0.02 * s, side * (shoulderY + 0.03 * s), H * 0.62);
      const wrist = seatZ ? p(-0.3 * s, side * (shoulderY - 0.04 * s), hipZ + 0.12) : p(-0.06 * s, side * (shoulderY + 0.02 * s), H * 0.47);
      b.sphere(shoulder, 0.055 * s, top, 8, 5);
      b.frustum(shoulder, 0.047 * s, elbow, 0.04 * s, top, 8, true);
      b.frustum(elbow, 0.038 * s, wrist, 0.032 * s, opts.shortSleeves ? skin : top, 8, true);
      b.ellipsoid(add(wrist, [-0.01, 0, -0.06 * s]), 0.025 * s, 0.035 * s, 0.07 * s, skin, 8, 5);
    });
    // Cou et tete
    b.cylinder(p(0, 0, shoulderZ - 0.02), p(-0.01, 0, shoulderZ + 0.07 * s), 0.045 * s, skin, 8);
    // (la tete suit le meme decalage vertical que le buste)
    const headC = p(-0.01 * s, 0, H - headR * 1.15 + lift);
    b.ellipsoid(headC, headR * 0.92, headR * 0.8, headR * 1.12, skin, 12, 8);
    // Cheveux : calotte decalee vers l'arriere (+x)
    b.ellipsoid(add(headC, [0.025 * s, 0, 0.03 * s]), headR * 0.9, headR * 0.84, headR * 1.05, hair, 12, 8);
    // Nez : indique la direction du regard
    b.ellipsoid(add(headC, [-headR * 0.92, 0, -headR * 0.1]), 0.018 * s, 0.014 * s, 0.025 * s, skin, 6, 4);
  }

  // ---------------------------------------------------------------------------
  // Catalogue des modeles : une fonction par type visuel
  // ---------------------------------------------------------------------------
  const BUILDERS = {};

  BUILDERS.subject = function (b, spec) {
    const seatZ = spec.seatZ;
    if (spec.id === "subject-couple") {
      person(b, 1.78, { offset: [0.02, -0.21, 0], seatZ: seatZ, outfit: { top: MAT.shirt, legs: MAT.trousers } });
      person(b, 1.66, { offset: [-0.02, 0.21, 0], seatZ: seatZ, outfit: { top: MAT.dress, legs: MAT.dress }, hair: MAT.hairBlond, shortSleeves: true });
      return;
    }
    if (spec.id === "subject-child") {
      person(b, spec.height, { child: true, seatZ: seatZ, outfit: { top: MAT.shirtLight, legs: MAT.jeans }, hair: MAT.hairBlond, shortSleeves: true });
      return;
    }
    person(b, spec.height, { seatZ: seatZ, outfit: { top: MAT.shirt, legs: MAT.trousers } });
  };

  BUILDERS.camera = function (b, spec) {
    if (spec.id === "camera-video") {
      tripod(b, 1.32, 0.42, { heavy: true, spreader: true });
      b.cylinder([0, 0, 1.32], [0, 0, 1.4], 0.06, MAT.blackMetal, 12);           // tete fluide
      b.rod([-0.06, 0.04, 1.37], [-0.42, 0.18, 1.18], 0.012, MAT.grip);         // bras de panoramique
      b.block(-0.13, -0.065, 1.4, 0.13, 0.065, 1.56, MAT.darkGray);              // corps camera
      b.block(-0.2, -0.05, 1.42, -0.13, 0.05, 1.53, MAT.blackMetal);             // batterie
      b.cylinder([0.13, 0, 1.48], [0.31, 0, 1.48], 0.055, MAT.blackMetal, 14);   // objectif
      b.frustum([0.31, 0, 1.48], 0.07, [0.4, 0, 1.48], 0.11, MAT.blackMetal, 4, true); // pare-soleil
      b.rod([-0.08, 0, 1.6], [0.08, 0, 1.6], 0.012, MAT.grip);                    // poignee haute
      b.rod([-0.08, 0, 1.56], [-0.08, 0, 1.6], 0.01, MAT.grip);
      b.rod([0.08, 0, 1.56], [0.08, 0, 1.6], 0.01, MAT.grip);
      b.panel([0.02, -0.12, 1.62], [0, 1, 0.3], [1, 0, 0], 0.13, 0.17, 0.02, MAT.screen); // moniteur
      return;
    }
    const apex = spec.height - 0.18;
    tripod(b, apex, 0.36);
    b.box([0, 0, apex + 0.03], [0.06, 0.06, 0.05], MAT.blackMetal);           // rotule
    const z = apex + 0.06;
    b.block(-0.035, -0.07, z, 0.035, 0.07, z + 0.095, MAT.darkGray);            // boitier
    b.block(-0.02, 0.045, z, 0.045, 0.075, z + 0.085, MAT.grip);               // poignee
    b.block(-0.03, -0.025, z + 0.095, 0.03, 0.025, z + 0.13, MAT.darkGray);    // prisme / viseur
    b.cylinder([0.035, -0.005, z + 0.045], [0.16, -0.005, z + 0.045], 0.038, MAT.blackMetal, 14); // objectif
    b.disc([0.161, -0.005, z + 0.045], [1, 0, 0], 0.03, MAT.lensGlass, 14);
  };

  function softboxOnHead(b, spec, shape) {
    const H = spec.height;
    const faceH = shape.height;
    const centerZ = H - faceH / 2;
    lightStand(b, centerZ - 0.12, 0.42);
    const mount = [-0.12, 0, centerZ];
    b.box(add(mount, [0, 0, -0.1]), [0.05, 0.05, 0.08], MAT.blackMetal);
    b.cylinder(add(mount, [-0.2, 0, 0]), mount, 0.06, MAT.darkGray, 12);       // tete de flash
    const backX = mount[0] + 0.02;
    const frontX = backX + shape.depth;
    const seg = shape.segments || 4;
    const back = shape.round
      ? ring([backX, 0, centerZ], [1, 0, 0], 0.09, 0.09, seg, Math.PI / seg)
      : rectRing([backX, 0, centerZ], [0, 1, 0], [0, 0, 1], 0.09, 0.09);
    const front = shape.round
      ? ring([frontX, 0, centerZ], [1, 0, 0], shape.width / 2, faceH / 2, seg, Math.PI / seg)
      : rectRing([frontX, 0, centerZ], [0, 1, 0], [0, 0, 1], shape.width / 2, faceH / 2);
    const rings = [back];
    if (shape.parabolic) {
      // Profil parabolique : un anneau intermediaire plus large.
      rings.push(ring([backX + shape.depth * 0.55, 0, centerZ], [1, 0, 0], shape.width * 0.42, faceH * 0.42, seg, Math.PI / seg));
    }
    rings.push(front);
    b.loft(rings, MAT.blackFabric, { capStart: true });
    b.face(front.slice().map(function (p) { return add(p, [0.004, 0, 0]); }), shape.lightMat || MAT.diffuser);
    // Liseré du cadre avant
    for (let i = 0; i < front.length; i += 1) {
      b.rod(front[i], front[(i + 1) % front.length], 0.008, MAT.blackFabric);
    }
  }

  BUILDERS["softbox-octa"] = function (b, spec) {
    const d = spec.id === "softbox-octa120" ? 1.2 : 0.9;
    softboxOnHead(b, spec, { width: d, height: d, depth: d * 0.45, round: true, segments: 8 });
  };
  BUILDERS["softbox-parabolic"] = function (b, spec) {
    softboxOnHead(b, spec, { width: 1.5, height: 1.5, depth: 0.7, round: true, segments: 16, parabolic: true });
  };
  BUILDERS["softbox-rect"] = function (b, spec) {
    const big = spec.id === "softbox-rect90x120";
    softboxOnHead(b, spec, { width: big ? 0.9 : 0.6, height: big ? 1.2 : 0.9, depth: big ? 0.5 : 0.4 });
  };
  BUILDERS.striplight = function (b, spec) {
    const big = spec.id === "strip-40x140";
    softboxOnHead(b, spec, { width: big ? 0.4 : 0.3, height: big ? 1.4 : 1.2, depth: big ? 0.36 : 0.3 });
  };

  BUILDERS.tube = function (b, spec) {
    const len = spec.id === "tube-240" ? 2.4 : spec.id === "tube-120" ? 1.2 : 0.6;
    const top = spec.height;
    const bottom = Math.max(0.1, top - len);
    const standTop = bottom + len * 0.5;
    lightStand(b, Math.min(standTop, top - 0.1), 0.34);
    b.box([0.03, 0, standTop], [0.04, 0.05, 0.06], MAT.blackMetal);
    b.cylinder([0.06, 0, bottom], [0.06, 0, top], 0.016, MAT.diffuserWarm, 10);
    b.cylinder([0.06, 0, bottom - 0.03], [0.06, 0, bottom], 0.018, MAT.blackMetal, 10);
    b.cylinder([0.06, 0, top], [0.06, 0, top + 0.03], 0.018, MAT.blackMetal, 10);
  };

  BUILDERS["led-panel"] = function (b, spec) {
    const tall = spec.id === "led-panel-1x2";
    const w = 0.33;
    const h = tall ? 0.63 : 0.33;
    const cz = spec.height - h / 2 - 0.04;
    lightStand(b, cz - h / 2 - 0.05, 0.4);
    // Etrier
    b.rod([0, -w / 2 - 0.03, cz], [0, -w / 2 - 0.03, cz - h / 2 - 0.05], 0.012, MAT.blackMetal);
    b.rod([0, w / 2 + 0.03, cz], [0, w / 2 + 0.03, cz - h / 2 - 0.05], 0.012, MAT.blackMetal);
    b.rod([0, -w / 2 - 0.03, cz - h / 2 - 0.05], [0, w / 2 + 0.03, cz - h / 2 - 0.05], 0.012, MAT.blackMetal);
    b.block(-0.03, -w / 2, cz - h / 2, 0.03, w / 2, cz + h / 2, MAT.darkGray);
    b.face(rectRing([0.032, 0, cz], [0, 1, 0], [0, 0, 1], w / 2 - 0.02, h / 2 - 0.02), MAT.diffuser);
    b.block(-0.06, -0.06, cz - 0.06, -0.03, 0.06, cz + 0.06, MAT.blackMetal);  // boitier arriere
  };

  BUILDERS.umbrella = function (b, spec) {
    const id = spec.id;
    const d = id === "umbrella-silver-150" ? 1.5 : id === "umbrella-deep-135" ? 1.35 : 1.05;
    const reflective = id !== "umbrella-shoot-105";
    const depth = id === "umbrella-deep-135" ? 0.55 : id === "umbrella-silver-150" ? 0.42 : 0.3;
    const cz = spec.height - d / 2;
    lightStand(b, cz - 0.12, 0.42);
    b.box([0, 0, cz - 0.08], [0.05, 0.05, 0.08], MAT.blackMetal);
    // Reflecteur : le flash tire vers l'arriere dans la toile, ouverte vers l'avant (+x).
    // Diffusant : le flash tire vers l'avant a travers la toile.
    const apexX = reflective ? -0.2 - depth : 0.42;
    const rimX = reflective ? -0.2 : 0.42 - depth;
    b.cylinder([-0.1, 0, cz], [0.12, 0, cz], 0.06, MAT.darkGray, 12);
    const apex = [apexX, 0, cz];
    const midX = apexX + (rimX - apexX) * 0.45;
    const mid = ring([midX, 0, cz], [1, 0, 0], d * 0.36, d * 0.36, 16);
    const rim = ring([rimX, 0, cz], [1, 0, 0], d / 2, d / 2, 16);
    const opening = reflective ? [1, 0, 0] : [-1, 0, 0];
    const back = mul(opening, -1);
    const inside = reflective
      ? material(id === "umbrella-silver-150" ? "#d7dce1" : "#f2f3f4", { spec: id === "umbrella-silver-150" ? 0.9 : 0.1, emissive: 0.35 })
      : MAT.translucent;
    const outside = reflective ? MAT.blackFabric : MAT.translucent;
    for (let i = 0; i < 16; i += 1) {
      const k = (i + 1) % 16;
      const tri = [apex, mid[i], mid[k]];
      const quad = [mid[i], rim[i], rim[k], mid[k]];
      if (reflective) {
        b.face(tri, outside, null, back).face(quad, outside, null, back);
        b.face(tri.slice(), inside, null, opening).face(quad.slice(), inside, null, opening);
      } else {
        b.face(tri, inside).face(quad, inside);
      }
      if (!reflective) b.rod(apex, rim[i], 0.004, MAT.blackMetal); // baleines visibles a travers la toile
    }
    b.rod([Math.min(apexX, rimX) - 0.06, 0, cz], [Math.max(apexX, rimX, 0.12) + 0.04, 0, cz], 0.006, MAT.steel);
  };

  BUILDERS.lantern = function (b, spec) {
    const d = spec.id === "lantern-90" ? 0.9 : 0.65;
    const cz = spec.height - d / 2;
    lightStand(b, cz - d / 2 - 0.1, 0.42);
    b.cylinder([0, 0, cz - d / 2 - 0.12], [0, 0, cz - d / 2 + 0.02], 0.06, MAT.darkGray, 12);
    b.ellipsoid([0, 0, cz], d / 2, d / 2, d / 2 * 0.92, MAT.diffuserWarm, 16, 10);
    b.cylinder([0, 0, cz - d / 2 * 0.95], [0, 0, cz - d / 2 * 0.8], d * 0.12, MAT.blackFabric, 12);
  };

  BUILDERS["beauty-dish"] = function (b, spec) {
    const d = spec.id === "beauty-dish-70" ? 0.7 : 0.55;
    const cz = spec.height - d / 2;
    lightStand(b, cz - 0.12, 0.4);
    b.box([-0.05, 0, cz - 0.09], [0.05, 0.05, 0.07], MAT.blackMetal);
    b.cylinder([-0.3, 0, cz], [-0.08, 0, cz], 0.06, MAT.darkGray, 12);
    const back = ring([-0.08, 0, cz], [1, 0, 0], 0.09, 0.09, 18);
    const rim = ring([0.08, 0, cz], [1, 0, 0], d / 2, d / 2, 18);
    b.loft([back, rim], MAT.plasticWhite, { capStart: true });
    b.face(rim.map(function (p) { return add(p, [-0.004, 0, 0]); }), material("#f3f4f5", { emissive: 0.5 }));
    b.cylinder([0.02, 0, cz], [0.05, 0, cz], d * 0.13, MAT.chrome, 14);     // deflecteur
  };

  BUILDERS.ringlight = function (b, spec) {
    const d = 0.45;
    const cz = spec.height - d / 2;
    lightStand(b, cz - d / 2 - 0.02, 0.4);
    b.rod([0, 0, cz - d / 2 - 0.04], [0, 0, cz - d / 2 + 0.02], 0.02, MAT.blackMetal);
    b.torus([0, 0, cz], [1, 0, 0], d / 2 - 0.03, 0.035, MAT.blackMetal, 24, 6);
    b.torus([0.01, 0, cz], [1, 0, 0], d / 2 - 0.03, 0.026, MAT.diffuserWarm, 24, 6);
    b.block(-0.02, -0.05, cz - 0.05, 0.02, 0.05, cz + 0.05, MAT.grip);       // support telephone
  };

  BUILDERS["spot-head"] = function (b, spec) {
    const id = spec.id;
    const top = spec.height;
    const fresnel = id.indexOf("fresnel-") === 0;
    const hmi = id.indexOf("hmi-") === 0;
    const cob = id.indexOf("cob-") === 0;
    const big = id === "fresnel-650" || id === "flash-head-pro" || id === "cob-led-600" || hmi;
    const r = (fresnel ? (big ? 0.15 : 0.11) : hmi ? 0.17 : big ? 0.085 : 0.07);
    const len = fresnel ? (big ? 0.36 : 0.26) : hmi ? 0.42 : cob ? (big ? 0.34 : 0.28) : (big ? 0.3 : 0.24);
    const cz = top - r - 0.06;
    lightStand(b, cz - r - 0.06, big ? 0.48 : 0.4, { wheels: hmi });
    // Lyre
    b.rod([0, -r - 0.03, cz], [0, -r - 0.03, cz - r - 0.06], 0.012, MAT.blackMetal);
    b.rod([0, r + 0.03, cz], [0, r + 0.03, cz - r - 0.06], 0.012, MAT.blackMetal);
    b.rod([0, -r - 0.03, cz - r - 0.06], [0, r + 0.03, cz - r - 0.06], 0.012, MAT.blackMetal);
    const back = [-len * 0.5, 0, cz];
    const front = [len * 0.5, 0, cz];
    if (fresnel || hmi) {
      b.block(back[0], -r, cz - r, front[0], r, cz + r, MAT.blackMetal);
      b.disc(add(front, [0.004, 0, 0]), [1, 0, 0], r * 0.8, material("#f6e7c6", { emissive: 0.7 }), 18);
      // Volets coupe-flux
      [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(function (d) {
        const hinge = add(front, [0, d[0] * r, d[1] * r]);
        const tip = add(hinge, [r * 0.8, d[0] * r * 0.45, d[1] * r * 0.45]);
        const across = d[0] ? [0, 0, 1] : [0, 1, 0];
        b.face([add(hinge, mul(across, -r)), add(hinge, mul(across, r)), add(tip, mul(across, r * 1.2)), add(tip, mul(across, -r * 1.2))], MAT.blackBoard);
      });
      if (hmi) b.block(-0.3, 0.35, 0, 0.1, 0.6, 0.22, MAT.darkGray); // ballast au sol
      return;
    }
    // Flash ou COB : corps + reflecteur standard
    b.cylinder(back, front, r, cob ? MAT.blackMetal : MAT.plasticWhite, 16);
    b.frustum(front, r * 0.9, add(front, [0.12, 0, 0]), r * 1.7, MAT.chrome, 16, false);
    b.disc(add(front, [0.005, 0, 0]), [1, 0, 0], r * 0.75, MAT.bulb, 16);
    b.rod(add(back, [0.04, 0, r]), add(back, [0.18, 0, r + 0.04]), 0.008, MAT.grip); // poignee
    if (cob) b.block(-0.1, -0.08, 0.05, 0.12, 0.08, 0.16, MAT.darkGray);          // alimentation
  };

  BUILDERS["spot-projector"] = function (b, spec) {
    const cz = spec.height - 0.15;
    lightStand(b, cz - 0.2, 0.44);
    b.rod([0, -0.14, cz], [0, -0.14, cz - 0.2], 0.012, MAT.blackMetal);
    b.rod([0, 0.14, cz], [0, 0.14, cz - 0.2], 0.012, MAT.blackMetal);
    b.rod([0, -0.14, cz - 0.2], [0, 0.14, cz - 0.2], 0.012, MAT.blackMetal);
    b.frustum([-0.28, 0, cz], 0.07, [-0.08, 0, cz], 0.12, MAT.blackMetal, 12, true); // lampe
    b.cylinder([-0.08, 0, cz], [0.06, 0, cz], 0.12, MAT.blackMetal, 12);
    const barrel = spec.id === "projector-19" ? 0.3 : 0.2;
    b.cylinder([0.06, 0, cz], [0.06 + barrel, 0, cz], 0.075, MAT.darkGray, 12);   // tube optique
    b.disc([0.062 + barrel, 0, cz], [1, 0, 0], 0.06, material("#f6e3b4", { emissive: 0.8 }), 14);
    b.block(-0.02, -0.02, cz + 0.12, 0.02, 0.02, cz + 0.16, MAT.grip);
  };

  BUILDERS["reflector-disc"] = function (b, spec) {
    const d = spec.id === "reflector-110" ? 1.1 : 0.8;
    const cz = Math.max(d / 2 + 0.6, spec.height - d / 2);
    lightStand(b, cz - 0.15, 0.42);
    b.rod([0, 0, cz - 0.15], [-0.05, 0, cz], 0.012, MAT.blackMetal);       // porte-reflecteur
    const tilt = -0.25;                                                     // incline vers le bas
    const start = b.faces.length;
    b.torus([0, 0, cz], [1, 0, 0], d / 2, 0.012, MAT.blackMetal, 24, 4);
    // Face blanche/argent vers l'avant, dos dore (reflecteur 5 en 1).
    b.face(ring([0.003, 0, cz], [1, 0, 0], d / 2, d / 2, 24), material("#eceef0", { spec: 0.5, emissive: 0.15 }), null, [1, 0, 0]);
    b.face(ring([-0.003, 0, cz], [1, 0, 0], d / 2, d / 2, 24), MAT.goldFabric, null, [-1, 0, 0]);
    b.rotateSince(start, [0, 0, cz], [0, 1, 0], tilt);
  };

  // Panneau plat sur pied ou pose : drapeaux, diffusions, V-flats, reflecteur panneau.
  function framedPanel(b, opts) {
    const w = opts.width;
    const h = opts.height;
    const base = opts.baseZ;
    const cz = base + h / 2;
    const start = b.faces.length;
    if (opts.frame !== false) {
      const t = opts.frameRadius || 0.012;
      const corners = rectRing([0, 0, cz], [0, 1, 0], [0, 0, 1], w / 2, h / 2);
      for (let i = 0; i < 4; i += 1) b.rod(corners[i], corners[(i + 1) % 4], t, opts.frameMat || MAT.steel);
    }
    b.panel([0, 0, cz], [0, 1, 0], [0, 0, 1], w - 0.01, h - 0.01, opts.thickness || 0.008, opts.mat);
    if (opts.tilt) b.rotateSince(start, [0, 0, cz], [0, 1, 0], opts.tilt);
  }

  BUILDERS.flag = function (b, spec) {
    const id = spec.id;
    const dims = {
      "flag-60x90": [0.6, 0.9],
      "flag-90x120": [0.9, 1.2],
      "cutter-45x120": [1.2, 0.45],
      "floppy-120x120": [1.2, 1.2],
      "scrim-100": [1.0, 1.0],
      "scrim-150": [1.5, 1.5]
    }[id] || [0.6, 0.9];
    const w = dims[0];
    const h = dims[1];
    const top = spec.height;
    const scrim = id.indexOf("scrim-") === 0;
    // Tenu par un C-stand avec bras : le drapeau est devant le pied (+x).
    cStandBase(b, top - h / 2 + 0.05);
    b.rod([0, 0, top - h / 2], [0.12, 0, top - h / 2], 0.012, MAT.chrome);
    b.cylinder([0.0, 0, top - h / 2 - 0.03], [0.0, 0, top - h / 2 + 0.03], 0.035, MAT.blackMetal, 8);
    const start = b.faces.length;
    framedPanel(b, { width: w, height: h, baseZ: top - h, mat: scrim ? MAT.scrimNet : MAT.blackBoard, frameMat: MAT.steel, thickness: 0.006 });
    b.translateSince(start, [0.14, 0, 0]);
  };

  BUILDERS["flat-panel"] = function (b, spec) {
    const id = spec.id;
    if (id.indexOf("vflat-") === 0) {
      const big = id === "vflat-120x240";
      const w = big ? 1.2 : 1.0;
      const h = big ? 2.4 : 2.0;
      const angle = 0.55; // chaque panneau s'ecarte de l'axe : V ouvert vers +x
      [-1, 1].forEach(function (side) {
        const dir = [Math.sin(angle), side * Math.cos(angle), 0];
        const center = add([-0.25, 0, h / 2], mul(dir, w / 2));
        const outward = [-Math.cos(angle), side * Math.sin(angle), 0];
        b.panel(center, dir, [0, 0, 1], w, h, 0.05, MAT.whiteBoard);
        b.panel(add(center, mul(outward, 0.027)), dir, [0, 0, 1], w - 0.004, h - 0.004, 0.002, MAT.blackBoard);
      });
      return;
    }
    if (id === "foamcore-100x150") {
      // Plaque appuyee sur un pied, legerement inclinee.
      cStandBase(b, 1.0);
      const start = b.faces.length;
      framedPanel(b, { width: 1.0, height: 1.5, baseZ: 0.25, mat: MAT.whiteBoard, frame: false, thickness: 0.012 });
      b.translateSince(start, [0.1, 0, 0]);
      return;
    }
    const dims = {
      "reflector-panel": [1.2, 1.6, MAT.silverFabric],
      "diffusion-100x150": [1.0, 1.5, MAT.translucent],
      "diffusion-200x200": [1.9, 1.9, MAT.translucent],
      "negfill-120x200": [1.2, 1.9, MAT.blackFabric]
    }[id] || [1.0, 1.5, MAT.whiteFabric];
    const w = dims[0];
    const h = dims[1];
    const base = Math.max(0.08, spec.height - h - 0.05);
    // Cadre sur deux pieds lateraux
    [-1, 1].forEach(function (side) {
      lightStand(b, base + h * 0.6, 0.3, { offset: [0, side * (w / 2 + 0.02), 0] });
    });
    framedPanel(b, { width: w, height: h, baseZ: base, mat: dims[2], frameMat: MAT.steel, thickness: 0.006, frameRadius: 0.014 });
  };

  BUILDERS.mirror = function (b, spec) {
    const w = 0.55;
    const h = 1.6;
    // Psyche : cadre bois sur deux montants, miroir incline.
    [-1, 1].forEach(function (side) {
      const y = side * (w / 2 + 0.04);
      b.block(-0.2, y - 0.025, 0, 0.2, y + 0.025, 0.04, MAT.wood);
      b.block(-0.02, y - 0.02, 0.04, 0.02, y + 0.02, 1.2, MAT.wood);
    });
    const start = b.faces.length;
    b.panel([0, 0, 0.1 + h / 2], [0, 1, 0], [0, 0, 1], w + 0.05, h + 0.05, 0.025, MAT.wood);
    b.panel([0.014, 0, 0.1 + h / 2], [0, 1, 0], [0, 0, 1], w - 0.02, h - 0.02, 0.004, MAT.mirror);
    b.rotateSince(start, [0, 0, 0.9], [0, 1, 0], -0.12);
  };

  // --- Pieds et accessoires de machinerie -----------------------------------
  BUILDERS.cstand = function (b, spec) {
    cStandBase(b, spec.height - 0.05);
    b.cylinder([0, 0, spec.height - 0.08], [0, 0, spec.height], 0.03, MAT.blackMetal, 8);
  };
  BUILDERS["cstand-arm"] = function (b, spec) {
    const z = spec.height - 0.35;
    cStandBase(b, z + 0.05);
    b.cylinder([0, -0.04, z - 0.04], [0, -0.04, z + 0.04], 0.04, MAT.blackMetal, 8);   // rotule
    b.cylinder([0, 0.04, z - 0.04], [0, 0.04, z + 0.04], 0.04, MAT.blackMetal, 8);
    b.rod([-0.25, 0, z], [1.0, 0, z], 0.013, MAT.chrome);                               // bras 40"
    b.cylinder([0.97, 0, z - 0.03], [0.97, 0, z + 0.03], 0.03, MAT.blackMetal, 8);
  };
  BUILDERS["combo-stand"] = function (b, spec) {
    lightStand(b, spec.height - 0.1, 0.6, { columnRadius: 0.025 });
    b.rod([0, 0, 1.0], [0, 0, spec.height - 0.6], 0.03, MAT.chrome);
    b.cylinder([0, 0, spec.height - 0.12], [0, 0, spec.height], 0.035, MAT.blackMetal, 10);
  };
  BUILDERS["roller-stand"] = function (b, spec) {
    lightStand(b, spec.height - 0.1, 0.55, { columnRadius: 0.024, wheels: true });
    b.rod([0, 0, 1.0], [0, 0, spec.height - 0.6], 0.03, MAT.chrome);
    b.cylinder([0, 0, spec.height - 0.12], [0, 0, spec.height], 0.035, MAT.blackMetal, 10);
  };
  BUILDERS["boom-stand"] = function (b, spec) {
    const z = 1.85;
    lightStand(b, z, 0.5, { columnRadius: 0.022 });
    b.cylinder([0, 0, z - 0.04], [0, 0, z + 0.04], 0.045, MAT.blackMetal, 8);
    const tip = [1.15, 0, spec.height];
    b.rod([-0.45, 0, z - 0.25], tip, 0.016, MAT.blackMetal);                    // perche
    b.cylinder([-0.55, 0, z - 0.32], [-0.38, 0, z - 0.2], 0.07, MAT.darkGray, 10); // contrepoids
    b.box(add(tip, [0, 0, -0.06]), [0.05, 0.05, 0.08], MAT.blackMetal);
  };
  BUILDERS.sandbag = function (b, spec) {
    // Sac de sable : boudins arrondis relies par une sangle.
    const pouch = function (y, length) {
      b.ellipsoid([0, y, 0.055], length / 2, 0.075, 0.055, MAT.sandbag, 16, 8);
    };
    if (spec.id === "sandbag-double") {
      pouch(-0.1, 0.36);
      pouch(0.1, 0.36);
      b.block(-0.035, -0.11, 0.075, 0.035, 0.11, 0.09, MAT.sandbagStrap);
      b.rod([-0.03, -0.02, 0.09], [-0.03, 0.02, 0.13], 0.008, MAT.sandbagStrap);
      b.rod([0.03, -0.02, 0.09], [0.03, 0.02, 0.13], 0.008, MAT.sandbagStrap);
      return;
    }
    pouch(0, 0.3);
    b.rod([-0.06, 0, 0.1], [0.06, 0, 0.1], 0.009, MAT.sandbagStrap);
  };


  // --- Regie -----------------------------------------------------------------
  BUILDERS["tether-station"] = function (b, spec) {
    const z = spec.height - 0.05;
    tripod(b, z - 0.25, 0.36);
    b.rod([0, 0, z - 0.3], [0, 0, z - 0.03], 0.015, MAT.blackMetal);
    b.block(-0.2, -0.28, z - 0.03, 0.2, 0.28, z, MAT.blackMetal);              // plateau
    b.block(-0.16, -0.17, z, 0.08, 0.17, z + 0.018, MAT.steel);                 // ordinateur
    const start = b.faces.length;
    b.panel([0.08, 0, z + 0.13], [0, 1, 0], [0, 0, 1], 0.34, 0.23, 0.01, MAT.steel);
    b.panel([0.074, 0, z + 0.13], [0, 1, 0], [0, 0, 1], 0.31, 0.2, 0.002, MAT.screen);
    b.rotateSince(start, [0.08, 0, z + 0.02], [0, 1, 0], -0.28);
    // L'ecran regarde vers -x : on le retourne vers l'operateur place en -x.
  };
  BUILDERS["monitor-station"] = function (b, spec) {
    const top = spec.height;
    lightStand(b, top - 0.3, 0.42);
    b.box([0, 0, top - 0.3], [0.05, 0.05, 0.05], MAT.blackMetal);
    b.block(-0.03, -0.31, top - 0.38, 0.0, 0.31, top, MAT.blackMetal);          // moniteur 24"
    b.face(rectRing([-0.032, 0, top - 0.19], [0, 1, 0], [0, 0, 1], 0.29, 0.17), MAT.screen);
    b.block(-0.2, -0.15, 0.6, 0.2, 0.15, 0.62, MAT.blackMetal);                 // tablette
  };
  BUILDERS["dimmer-desk"] = function (b, spec) {
    const w = 1.0;
    const d = 0.5;
    const z = 0.75;
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (c) {
      b.block(c[0] * (d / 2 - 0.04) - 0.02, c[1] * (w / 2 - 0.04) - 0.02, 0, c[0] * (d / 2 - 0.04) + 0.02, c[1] * (w / 2 - 0.04) + 0.02, z - 0.03, MAT.blackMetal);
    });
    b.block(-d / 2, -w / 2, z - 0.03, d / 2, w / 2, z, MAT.darkGray);
    // Pupitre incline
    const start = b.faces.length;
    b.block(-0.18, -0.4, z, 0.18, 0.4, z + 0.07, MAT.blackMetal);
    b.rotateSince(start, [0, 0, z], [0, 1, 0], 0.15);
    for (let i = 0; i < 10; i += 1) {
      b.block(-0.06, -0.34 + i * 0.07, z + 0.07, 0.04, -0.32 + i * 0.07, z + 0.085, MAT.steel);
    }
    b.block(0.12, -0.25, z, 0.15, 0.25, z + 0.28, MAT.blackMetal);              // ecran
    b.face(rectRing([0.118, 0, z + 0.15], [0, 1, 0], [0, 0, 1], 0.22, 0.11), MAT.screen);
  };

  // --- Mobilier --------------------------------------------------------------
  BUILDERS.stool = function (b, spec) {
    if (spec.id === "ottoman-80") {
      b.ellipsoid([0, 0, 0.25], 0.4, 0.4, 0.2, MAT.velvet, 24, 10);
      b.cylinder([0, 0, 0.02], [0, 0, 0.25], 0.395, MAT.velvet, 24);
      return;
    }
    const high = spec.id === "stool-high";
    const seatZ = high ? 0.65 : 0.45;
    const r = high ? 0.18 : 0.17;
    b.cylinder([0, 0, seatZ - 0.04], [0, 0, seatZ], r, MAT.woodLight, 16);
    for (let i = 0; i < 4; i += 1) {
      const a = Math.PI / 4 + (i / 4) * Math.PI * 2;
      b.rod([Math.cos(a) * r * 0.6, Math.sin(a) * r * 0.6, seatZ - 0.04], [Math.cos(a) * r * 1.15, Math.sin(a) * r * 1.15, 0], 0.014, MAT.wood);
    }
    if (high) b.torus([0, 0, 0.22], [0, 0, 1], r * 0.95, 0.008, MAT.wood, 16, 4);
  };

  BUILDERS.chair = function (b) {
    // Chaise : assise face a +y (vers la camera dans les presets).
    const seatZ = 0.46;
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (c) {
      b.rod([c[0] * 0.2, c[1] * 0.2, 0], [c[0] * 0.2, c[1] * 0.2, seatZ - 0.03], 0.015, MAT.blackMetal);
    });
    b.block(-0.23, -0.23, seatZ - 0.04, 0.23, 0.23, seatZ, MAT.wood);
    b.rod([-0.2, -0.2, seatZ], [-0.2, -0.22, 0.85], 0.013, MAT.blackMetal);
    b.rod([0.2, -0.2, seatZ], [0.2, -0.22, 0.85], 0.013, MAT.blackMetal);
    b.block(-0.23, -0.24, 0.62, 0.23, -0.21, 0.84, MAT.wood);
  };

  BUILDERS["director-chair"] = function (b) {
    // Chaise de realisateur : assise face a +y, dossier en toile en -y.
    const seatZ = 0.75;
    [-1, 1].forEach(function (sx) {
      const x = sx * 0.25;
      b.rod([x, -0.24, 0], [x, 0.24, seatZ - 0.05], 0.015, MAT.wood);       // croisillons
      b.rod([x, 0.24, 0], [x, -0.24, seatZ - 0.05], 0.015, MAT.wood);
      b.rod([x, -0.24, seatZ - 0.05], [x, 0.24, seatZ - 0.05], 0.016, MAT.wood);
      b.rod([x, -0.24, 0.01], [x, 0.24, 0.01], 0.016, MAT.wood);
      b.block(x - 0.025, -0.26, seatZ + 0.17, x + 0.025, 0.2, seatZ + 0.2, MAT.wood); // accoudoir
      b.rod([x, 0.16, seatZ - 0.05], [x, 0.16, seatZ + 0.17], 0.013, MAT.wood);
      b.rod([x, -0.22, seatZ - 0.05], [x, -0.22, 1.1], 0.015, MAT.wood);
    });
    b.panel([0, 0, seatZ - 0.04], [1, 0, 0], [0, 1, 0], 0.48, 0.44, 0.01, MAT.canvas);
    b.panel([0, -0.22, 0.98], [1, 0, 0], [0, 0, 1], 0.5, 0.18, 0.01, MAT.canvas);
  };

  BUILDERS.armchair = function (b) {
    // Fauteuil club : dossier en -y, assise face a +y.
    const w = 0.88; const d = 0.78;
    b.block(-w / 2, -d / 2, 0.06, w / 2, d / 2, 0.38, MAT.leather);             // base
    b.block(-w / 2 + 0.14, -d / 2 + 0.16, 0.38, w / 2 - 0.14, d / 2 - 0.02, 0.46, MAT.leather); // coussin
    b.block(-w / 2, -d / 2, 0.38, w / 2, -d / 2 + 0.16, 0.82, MAT.leather);     // dossier
    [-1, 1].forEach(function (s) {
      b.block(s * (w / 2) - (s > 0 ? 0.14 : 0), -d / 2, 0.38, s * (w / 2) + (s < 0 ? 0.14 : 0), d / 2, 0.62, MAT.leather);
    });
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (c) {
      b.cylinder([c[0] * (w / 2 - 0.06), c[1] * (d / 2 - 0.06), 0], [c[0] * (w / 2 - 0.06), c[1] * (d / 2 - 0.06), 0.06], 0.025, MAT.woodDark, 8);
    });
  };

  BUILDERS.sofa = function (b) {
    const w = 1.8; const d = 0.8;
    b.block(-w / 2, -d / 2, 0.08, w / 2, d / 2, 0.36, MAT.fabricGray);
    [-1, 1].forEach(function (s) {
      b.block(s > 0 ? 0.02 : -w / 2 + 0.16, -d / 2 + 0.2, 0.36, s > 0 ? w / 2 - 0.16 : -0.02, d / 2 - 0.02, 0.46, MAT.fabricGray);
      b.block(s * (w / 2) - (s > 0 ? 0.16 : 0), -d / 2, 0.36, s * (w / 2) + (s < 0 ? 0.16 : 0), d / 2, 0.62, MAT.fabricGray);
    });
    b.block(-w / 2, -d / 2, 0.36, w / 2, -d / 2 + 0.2, 0.88, MAT.fabricGray);
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (c) {
      b.cylinder([c[0] * (w / 2 - 0.08), c[1] * (d / 2 - 0.08), 0], [c[0] * (w / 2 - 0.08), c[1] * (d / 2 - 0.08), 0.08], 0.025, MAT.woodDark, 8);
    });
  };

  BUILDERS.bench = function (b) {
    b.block(-0.6, -0.2, 0.43, 0.6, 0.2, 0.48, MAT.wood);
    [-1, 1].forEach(function (s) {
      b.block(s * 0.52 - 0.03, -0.18, 0, s * 0.52 + 0.03, 0.18, 0.43, MAT.wood);
    });
    b.block(-0.5, -0.02, 0.15, 0.5, 0.02, 0.2, MAT.wood);
  };

  BUILDERS.block = function (b) {
    b.block(-0.25, -0.25, 0, 0.25, 0.25, 0.5, MAT.whiteCube);
  };

  BUILDERS.applebox = function (b, spec) {
    const h = spec.id === "applebox-quarter" ? 0.05 : spec.id === "applebox-half" ? 0.1 : 0.2;
    const w = 0.5; const d = 0.3;
    b.block(-w / 2, -d / 2, 0, w / 2, d / 2, h, MAT.woodLight);
    if (h >= 0.1) {
      // Poignees (decoupes) sur les faces laterales
      [-1, 1].forEach(function (s) {
        b.block(-0.07, s * (d / 2 + 0.001) - 0.001, h * 0.55, 0.07, s * (d / 2 + 0.001) + 0.001, h * 0.55 + Math.min(0.035, h * 0.25), MAT.woodDark);
      });
    }
  };

  function tableTop(b, w, d, z, mat, legMat, round) {
    if (round) {
      b.cylinder([0, 0, z - 0.03], [0, 0, z], w / 2, mat, 24);
      b.cylinder([0, 0, 0.03], [0, 0, z - 0.03], 0.04, legMat, 10);
      b.cylinder([0, 0, 0], [0, 0, 0.03], 0.25, legMat, 16);
      return;
    }
    b.block(-w / 2, -d / 2, z - 0.03, w / 2, d / 2, z, mat);
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (c) {
      b.block(c[0] * (w / 2 - 0.06) - 0.025, c[1] * (d / 2 - 0.06) - 0.025, 0, c[0] * (w / 2 - 0.06) + 0.025, c[1] * (d / 2 - 0.06) + 0.025, z - 0.03, legMat);
    });
  }

  BUILDERS.table = function (b, spec) {
    const big = spec.id === "table-160";
    tableTop(b, big ? 1.6 : 1.2, big ? 0.8 : 0.7, 0.76, MAT.woodLight, MAT.blackMetal);
  };
  BUILDERS["round-table"] = function (b) {
    tableTop(b, 0.9, 0.9, 0.74, MAT.woodLight, MAT.blackMetal, true);
  };
  BUILDERS.desk = function (b) {
    tableTop(b, 1.4, 0.7, 0.75, MAT.wood, MAT.blackMetal);
    b.block(0.25, -0.33, 0.1, 0.65, 0.33, 0.72, MAT.wood);                     // caisson
    [0.25, 0.45, 0.62].forEach(function (z) {
      b.block(0.42, 0.33, z, 0.48, 0.345, z + 0.02, MAT.steel);
    });
  };
  BUILDERS["makeup-station"] = function (b) {
    tableTop(b, 1.2, 0.5, 0.75, MAT.plasticWhite, MAT.plasticWhite);
    // Miroir avec ampoules, contre le bord arriere (-y)
    b.block(-0.5, -0.24, 0.75, 0.5, -0.2, 1.72, MAT.plasticWhite);
    b.face(rectRing([0, -0.198, 1.23], [1, 0, 0], [0, 0, 1], 0.4, 0.4), MAT.mirror);
    for (let i = 0; i < 5; i += 1) {
      b.sphere([-0.4 + i * 0.2, -0.19, 1.68], 0.025, MAT.bulb, 6, 4);
    }
    for (let i = 0; i < 4; i += 1) {
      [-1, 1].forEach(function (s) {
        b.sphere([s * 0.46, -0.19, 0.9 + i * 0.22], 0.025, MAT.bulb, 6, 4);
      });
    }
  };
  BUILDERS.cart = function (b) {
    const w = 0.8; const d = 0.5;
    [0.18, 0.86].forEach(function (z) {
      b.block(-w / 2, -d / 2, z - 0.03, w / 2, d / 2, z, MAT.darkGray);
    });
    [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (c) {
      const x = c[0] * (w / 2 - 0.03); const y = c[1] * (d / 2 - 0.03);
      b.rod([x, y, 0.07], [x, y, 0.86], 0.014, MAT.chrome);
      b.sphere([x, y, 0.04], 0.04, MAT.rubber, 6, 4);
    });
    b.rod([-w / 2 - 0.05, -d / 2 + 0.05, 0.86], [-w / 2 - 0.05, -d / 2 + 0.05, 1.0], 0.012, MAT.chrome);
    b.rod([-w / 2 - 0.05, d / 2 - 0.05, 0.86], [-w / 2 - 0.05, d / 2 - 0.05, 1.0], 0.012, MAT.chrome);
    b.rod([-w / 2 - 0.05, -d / 2 + 0.05, 1.0], [-w / 2 - 0.05, d / 2 - 0.05, 1.0], 0.014, MAT.grip);
  };
  BUILDERS.ladder = function (b) {
    // Escabeau : deux montants en A.
    const h = 1.1;
    [-1, 1].forEach(function (s) {
      b.rod([-0.3, s * 0.24, 0], [-0.03, s * 0.2, h], 0.016, MAT.steel);
      b.rod([0.3, s * 0.24, 0], [0.03, s * 0.2, h], 0.016, MAT.steel);
    });
    [0.28, 0.56, 0.84].forEach(function (z) {
      const x = -0.3 + (0.27 * z) / h;
      b.block(x - 0.06, -0.22, z, x + 0.06, 0.22, z + 0.025, MAT.steel);
    });
    b.block(-0.1, -0.22, h, 0.1, 0.22, h + 0.03, MAT.plasticDark);
  };

  // ---------------------------------------------------------------------------
  // Construction et cache des modeles
  // ---------------------------------------------------------------------------
  const modelCache = new Map();

  // options.seatZ : sujet assis a cette hauteur (le bassin reste a l'origine).
  function buildModel(kind, variantId, variant, options) {
    const opts = options || {};
    const key = kind + "|" + variantId + (opts.seatZ ? "|seat" + opts.seatZ : "");
    if (modelCache.has(key)) return modelCache.get(key);
    const builder = new Builder();
    const build = BUILDERS[kind] || BUILDERS.block;
    build(builder, { id: variantId, height: variant.height || 1, width: variant.width, depth: variant.depth, seatZ: opts.seatZ });
    // Recentrage horizontal : la position de l'element est le centre de son emprise.
    let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity; let maxZ = 0;
    builder.faces.forEach(function (f) {
      f.points.forEach(function (p) {
        if (p[0] < minX) minX = p[0];
        if (p[0] > maxX) maxX = p[0];
        if (p[1] < minY) minY = p[1];
        if (p[1] > maxY) maxY = p[1];
        if (p[2] > maxZ) maxZ = p[2];
      });
    });
    const cx = opts.seatZ ? 0 : (minX + maxX) / 2;
    const cy = opts.seatZ ? 0 : (minY + maxY) / 2;
    builder.translateSince(0, [-cx, -cy, 0]);
    const model = {
      faces: builder.faces,
      width: maxX - minX,
      depth: maxY - minY,
      height: maxZ
    };
    modelCache.set(key, model);
    return model;
  }

  // ---------------------------------------------------------------------------
  // Rendu
  // ---------------------------------------------------------------------------
  // view = {
  //   project(p) -> [x, y]       projection monde -> ecran
  //   viewDir                    vecteur vers l'observateur (tri et faces cachees)
  //   light                      vecteur vers la lumiere
  //   shadowDir                  [dx, dy] decalage d'ombre par metre de hauteur
  //   lineWidth                  epaisseur des contours (pixels canvas)
  //   ambient, diffuse           eclairage
  // }
  // instances = [{ model, x, y, rotation (radians), tint?, selected? }]
  let shadowCanvas = null;

  function worldFaces(instances) {
    const out = [];
    instances.forEach(function (inst) {
      const angle = inst.rotation || 0;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      const tr = function (p) {
        return [p[0] * c - p[1] * s + inst.x, p[0] * s + p[1] * c + inst.y, p[2]];
      };
      inst.model.faces.forEach(function (f) {
        out.push({
          points: f.points.map(tr),
          normal: [f.normal[0] * c - f.normal[1] * s, f.normal[0] * s + f.normal[1] * c, f.normal[2]],
          center: tr(f.center),
          mat: f.mat,
          doubleSided: f.doubleSided,
          dim: inst.dim || 0
        });
      });
    });
    return out;
  }

  function shadeColor(mat, normal, view, dim) {
    const rgb = hexToRgb(mat.color);
    const light = view.light;
    const diffuse = Math.max(0, dot(normal, light));
    let k = view.ambient + view.diffuse * diffuse;
    let spec = 0;
    if (mat.spec) {
      // Reflet : demi-vecteur lumiere / observateur.
      const h = normalize(add(light, view.viewDir));
      spec = Math.pow(Math.max(0, dot(normal, h)), 24) * mat.spec * 140;
    }
    if (mat.emissive) k = k * (1 - mat.emissive) + 1.08 * mat.emissive;
    if (dim) k *= 1 - dim;
    const r = Math.min(255, Math.round(rgb[0] * k + spec));
    const g = Math.min(255, Math.round(rgb[1] * k + spec));
    const b = Math.min(255, Math.round(rgb[2] * k + spec));
    return { r: r, g: g, b: b };
  }

  function drawShadows(ctx, faces, view) {
    if (!view.shadowDir) return;
    const canvas = ctx.canvas;
    if (!shadowCanvas) shadowCanvas = document.createElement("canvas");
    if (shadowCanvas.width !== canvas.width || shadowCanvas.height !== canvas.height) {
      shadowCanvas.width = canvas.width;
      shadowCanvas.height = canvas.height;
    }
    const sctx = shadowCanvas.getContext("2d");
    sctx.setTransform(1, 0, 0, 1, 0, 0);
    sctx.clearRect(0, 0, shadowCanvas.width, shadowCanvas.height);
    const transform = ctx.getTransform ? ctx.getTransform() : null;
    if (transform) sctx.setTransform(transform);
    sctx.fillStyle = "#000";
    const sd = view.shadowDir;
    faces.forEach(function (f) {
      if (!f.mat.shadow) return;
      sctx.beginPath();
      f.points.forEach(function (p, i) {
        const q = view.project([p[0] + sd[0] * p[2], p[1] + sd[1] * p[2], 0]);
        if (i === 0) sctx.moveTo(q[0], q[1]);
        else sctx.lineTo(q[0], q[1]);
      });
      sctx.closePath();
      sctx.fill();
    });
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = view.shadowAlpha || 0.22;
    if ("filter" in ctx && view.shadowBlur) ctx.filter = `blur(${view.shadowBlur}px)`;
    ctx.drawImage(shadowCanvas, 0, 0);
    ctx.restore();
  }

  function render(ctx, instances, view) {
    const faces = worldFaces(instances);
    drawShadows(ctx, faces, view);
    const V = view.viewDir;
    const visible = [];
    faces.forEach(function (f) {
      let n = f.normal;
      const facing = dot(n, V);
      if (facing < 0) {
        if (!f.doubleSided) return;
        n = mul(n, -1);
      }
      visible.push({ face: f, normal: n, depth: dot(f.center, V) });
    });
    visible.sort(function (a, b) { return a.depth - b.depth; });
    const lineWidth = view.lineWidth || 1;
    ctx.save();
    ctx.lineJoin = "round";
    visible.forEach(function (entry) {
      const f = entry.face;
      const col = shadeColor(f.mat, entry.normal, view, f.dim);
      const alpha = f.mat.alpha;
      ctx.beginPath();
      f.points.forEach(function (p, i) {
        const q = view.project(p);
        if (i === 0) ctx.moveTo(q[0], q[1]);
        else ctx.lineTo(q[0], q[1]);
      });
      ctx.closePath();
      ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${alpha})`;
      ctx.fill();
      // Un trait de la meme couleur bouche les micro-fentes entre faces voisines.
      ctx.lineWidth = f.mat.edges ? lineWidth : lineWidth * 0.6;
      ctx.strokeStyle = f.mat.edges
        ? `rgba(${Math.round(col.r * 0.55)},${Math.round(col.g * 0.55)},${Math.round(col.b * 0.55)},${0.55 * alpha})`
        : `rgba(${col.r},${col.g},${col.b},${alpha})`;
      ctx.stroke();
    });
    ctx.restore();
  }

  // Vues predefinies -----------------------------------------------------------
  const LIGHT = normalize([0.45, -0.35, 1]);
  const ISO_VIEW = normalize([1, 1, 1.0105]);

  // Ombres portees : vers -x et +y (opposees a la lumiere), raccourcies pour rester lisibles.
  const SHADOW_DIR = [-0.24, 0.16];

  function isoView(project, lineWidth) {
    return {
      project: project,
      viewDir: ISO_VIEW,
      light: LIGHT,
      shadowDir: SHADOW_DIR,
      shadowAlpha: 0.2,
      shadowBlur: 1.5,
      ambient: 0.58,
      diffuse: 0.5,
      lineWidth: lineWidth
    };
  }

  function planView(project, lineWidth) {
    return {
      project: project,
      viewDir: [0, 0, 1],
      light: LIGHT,
      shadowDir: SHADOW_DIR,
      shadowAlpha: 0.13,
      shadowBlur: 2,
      ambient: 0.62,
      diffuse: 0.45,
      lineWidth: lineWidth
    };
  }

  // Direction de la face avant de chaque type, dans le repere local (radians).
  const FRONT_ANGLE = {
    subject: Math.PI,
    chair: Math.PI / 2,
    "director-chair": Math.PI / 2,
    armchair: Math.PI / 2,
    sofa: Math.PI / 2,
    bench: Math.PI / 2,
    desk: Math.PI / 2,
    "makeup-station": Math.PI / 2,
    "tether-station": Math.PI,
    "monitor-station": Math.PI,
    "dimmer-desk": Math.PI
  };

  // Vignette de bibliotheque : vue 3/4 ajustee au cadre, mise en cache.
  const thumbCache = new Map();
  function thumbnail(kind, variantId, variant, width, height, ratio) {
    const key = kind + "|" + variantId + "|" + width + "x" + height + "@" + ratio;
    if (thumbCache.has(key)) return thumbCache.get(key);
    const model = buildModel(kind, variantId, variant);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const ctx = canvas.getContext("2d");
    // Vue isometrique tournee pour montrer l'avant de l'element de trois quarts.
    const turn = Math.PI / 4 - (FRONT_ANGLE[kind] || 0) - 0.5;
    const raw = function (p) {
      return [(p[0] - p[1]), (p[0] + p[1]) * 0.48 - p[2] * 0.95];
    };
    let minX = Infinity; let maxX = -Infinity; let minY = Infinity; let maxY = -Infinity;
    const inst = { model: model, x: 0, y: 0, rotation: turn };
    worldFaces([inst]).forEach(function (f) {
      f.points.forEach(function (p) {
        const q = raw(p);
        minX = Math.min(minX, q[0]); maxX = Math.max(maxX, q[0]);
        minY = Math.min(minY, q[1]); maxY = Math.max(maxY, q[1]);
      });
    });
    const pad = 0.06;
    const scale = Math.min(canvas.width * (1 - pad * 2) / (maxX - minX || 1), canvas.height * (1 - pad * 2) / (maxY - minY || 1));
    const ox = canvas.width / 2 - ((minX + maxX) / 2) * scale;
    const oy = canvas.height / 2 - ((minY + maxY) / 2) * scale;
    const view = isoView(function (p) {
      const q = raw(p);
      return [ox + q[0] * scale, oy + q[1] * scale];
    }, Math.max(0.6, ratio * 0.7));
    view.shadowBlur = 1;
    view.shadowAlpha = 0.3;
    render(ctx, [inst], view);
    const url = canvas.toDataURL("image/png");
    thumbCache.set(key, url);
    return url;
  }

  // Hauteur d'assise (m) des elements sur lesquels un sujet peut s'asseoir.
  const SEAT_HEIGHTS = {
    "stool-low": 0.45,
    "stool-high": 0.65,
    "chair-standard": 0.46,
    "chair-director": 0.75,
    "armchair-90": 0.46,
    "ottoman-80": 0.45,
    "bench-120": 0.48,
    "sofa-180": 0.46,
    "cube-50": 0.5,
    "applebox-full": 0.2
  };
  // Direction de la face avant d'une assise dans son repere local (radians).
  const SEAT_FRONT = {
    "chair-standard": Math.PI / 2,
    "chair-director": Math.PI / 2,
    "armchair-90": Math.PI / 2,
    "sofa-180": Math.PI / 2,
    "bench-120": Math.PI / 2
  };

  window.LiteStudioModels = Object.freeze({
    seatHeights: SEAT_HEIGHTS,
    seatFront: SEAT_FRONT,
    buildModel: buildModel,
    render: render,
    isoView: isoView,
    planView: planView,
    thumbnail: thumbnail,
    kinds: Object.keys(BUILDERS)
  });
})();
