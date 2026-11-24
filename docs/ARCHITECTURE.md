# Architecture et périmètre de validation

L’application principale est `app.html`. Le contrôleur `js/simple-studio.js` gère encore les éléments de scène, interactions, calculs et rendu Canvas. Les dix groupes de constantes de localisation ont été extraits à l’identique dans `js/studio-locales.js`, chargé avant le contrôleur par des scripts classiques différés.

Ce choix conserve l’ouverture directe de `app.html`, sans serveur ni chaîne de compilation. Une conversion immédiate en modules ES aurait changé cette contrainte de lancement local. Le seul objet partagé, `window.LiteStudioLocales`, expose les données de localisation ; sa structure de premier niveau est gelée, pas les objets imbriqués.

La séparation reste progressive : le contrôleur conserve une dette de taille et de responsabilités. Les prochaines extractions pertinentes seraient la géométrie, la persistance des presets et le rendu, avec tests de comportement avant déplacement. Les modèles 3D des éléments sont dans `js/studio-models.js`, chargé comme script classique.

Le Labo photo est séparé du contrôleur : `js/photo-lab-data.mjs` (données optiques), `js/photo-lab-engine.mjs` (calculs), `js/photo-lab-scenes.mjs` (scènes) et `js/photo-lab-ui.mjs` (interface), avec `css/photo-lab.css`. Ce sont des modules ES : ils exigent un serveur (`npm run serve`) et ne se chargent pas depuis un fichier ouvert par double-clic, contrairement au plan.

Les pages publiques utilisent `js/site-i18n.js`, les contenus `js/site-copy-*.js` (dont `site-copy-seo-*`) et `js/site-nav.js` ; les versions traduites sont générées par `scripts/generate-static-locales.mjs` (`npm run build:locales`).

## Vérification

```bash
npm run lint      # node --check sur tous les scripts
npm test          # tests unitaires : localisation (tests/locales.test.cjs) et calculs du Labo photo (tests/photo-lab-engine.test.mjs)
npm run test:visual   # contrôle visuel de mise en page avec Playwright
```

Les tests unitaires vérifient les cinq langues, les messages UI, l’ordre de chargement des scripts et les calculs optiques du Labo photo. Ils ne valident ni le rendu Canvas ni tous les calculs de lumière. Après une modification interactive, ouvrir `app.html`, vérifier un preset dans les cinq langues, déplacer un élément, sauvegarder/recharger un preset et exporter PNG/PDF. Cette liste décrit des essais à réaliser, sans les présenter comme déjà réussis.
