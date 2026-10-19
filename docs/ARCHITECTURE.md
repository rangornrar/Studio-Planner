# Architecture et périmètre de validation

L’application principale est `app.html`. Le contrôleur `js/simple-studio.js` gère encore les éléments de scène, interactions, calculs et rendu Canvas. Les dix groupes de constantes de localisation ont été extraits à l’identique dans `js/studio-locales.js`, chargé avant le contrôleur par des scripts classiques différés.

Ce choix conserve l’ouverture directe de `app.html`, sans serveur ni chaîne de compilation. Une conversion immédiate en modules ES aurait changé cette contrainte de lancement local. Le seul objet partagé, `window.LiteStudioLocales`, expose les données de localisation ; sa structure de premier niveau est gelée, pas les objets imbriqués.

La séparation reste progressive : le contrôleur conserve une dette de taille et de responsabilités. Les prochaines extractions pertinentes seraient la géométrie, la persistance des presets et le rendu, avec tests de comportement avant déplacement. Les autres fichiers historiques ne sont pas supprimés sur la seule base de leur nom.

## Vérification

```bash
node --check js/simple-studio.js
node --check js/studio-locales.js
node --test tests/*.test.cjs
```

Les trois tests vérifient les cinq langues, les messages UI et l’ordre de chargement des scripts. Ils ne valident ni le rendu Canvas ni tous les calculs de lumière. Après une modification interactive, ouvrir `app.html`, vérifier un preset dans les cinq langues, déplacer un élément, sauvegarder/recharger un preset et exporter PNG/PDF. Cette liste décrit des essais à réaliser, sans les présenter comme déjà réussis.
