[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D21VSKW5)

Langues : [Français](README.md) · [FR](README.fr.md) · [English](README.en.md) · [Español](README.es.md) · [Deutsch](README.de.md) · [العربية](README.ar.md)

# LITE Studio

LITE Studio est une application web autonome pour preparer un plan de studio photo sur desktop et mobile.

Elle aide a construire rapidement un set, mesurer les distances utiles du plateau, zoomer dans le plan, sauvegarder des presets personnalises et exporter le schema en PNG ou PDF.

## Captures d'ecran

### Vue principale - preset portrait

![Vue principale preset portrait](docs/screenshots/studio-portrait.png)

### Preset boudoir

![Preset boudoir](docs/screenshots/studio-boudoir.png)

### Preset video interview

![Preset video interview](docs/screenshots/studio-video.png)

## Fonctionnalites

- Interface responsive utilisable sur mobile et desktop.
- Vue de dessus avec zoom, molette sur desktop, pinch-to-zoom sur mobile et apercu isometrique zoombable.
- Elements dessines en 3D a leurs vraies dimensions, identiques dans la bibliotheque, la vue plan et la vue iso.
- Labo photo : simulation de l'effet de l'ISO, de l'ouverture et de la focale sur une photo (bruit, exposition, profondeur de champ, cadrage).
- Bibliotheque d'elements avec recherche par type, taille ou famille.
- Mesures automatiques entre sujet, camera, fond et sources, plus un mode de mesure manuel.
- Reglages d'element et informations metier : hauteur, orientation, puissance source et lecture estimee a ISO 100.
- Presets integres et presets personnalises sauvegardes dans le navigateur.
- Export PNG, export PDF et impression directe du plan.
- Interface multilingue : francais, anglais, espagnol, allemand et arabe.

## Demarrage rapide

Aucune installation n'est necessaire pour le plan : ouvrez [app.html](app.html) dans un navigateur moderne, ou [index.html](index.html) pour la landing.

Le Labo photo utilise des modules JavaScript, que les navigateurs refusent de charger depuis un fichier ouvert par double-clic. Pour l'utiliser en local, lancez `npm run serve` (Node.js 18 ou plus) puis ouvrez http://127.0.0.1:4177/app.html.

1. Ouvrez l'application.
2. Ajoutez des elements depuis la bibliotheque.
3. Deplacez-les dans le plan et tournez-les avec la poignee orange.
4. Utilisez la molette sur desktop ou le pinch sur mobile pour zoomer dans la vue de dessus.
5. Activez `Mesure` pour afficher les distances autour du sujet ou tracer une mesure manuelle.
6. Utilisez le menu `Presets` pour charger un preset ou sauvegarder votre propre configuration.
7. Utilisez le menu `Fichier` pour copier l'image, exporter en PNG ou PDF, ou imprimer le plan.

## Structure du projet

- `index.html` : landing page publique.
- `app.html` : application de plan de studio photo.
- `css/simple-studio.css` : design, responsive, mise en page et styles d'impression.
- `css/site.css` : styles de la landing et des pages editoriales.
- `js/simple-studio.js` : logique du studio, rendu canvas, presets, mesures et interactions.
- `js/studio-models.js` : modeles 3D des elements (dimensions reelles) et leur rendu en vignette, plan et iso.
- `js/photo-lab-*.mjs` et `css/photo-lab.css` : Labo photo (donnees optiques, calculs, scene, interface).
- `js/site-nav.js` : menu de navigation mobile des pages publiques.
- `scripts/generate-static-locales.mjs` : generation des pages publiques traduites (`npm run build:locales`).
- `scripts/serve-static.mjs` : petit serveur local (`npm run serve`).
- `tests/` : tests unitaires (`npm test`) et controle visuel automatique (`npm run test:visual`).
- `js/studio-locales.js` : constantes de localisation de l’application.
- `js/site-i18n.js` et `js/site-copy-*.js` : contenus et localisation des pages publiques.
- `guide.html`, `presets.html`, `faq.html` : pages d'explication et d'accompagnement.
- `schema-eclairage-portrait.html`, `plan-studio-boudoir.html`, `lighting-diagram-interview.html` : pages ciblees SEO reliees a l'application.
- `docs/screenshots/` : captures d'ecran utilisees dans le README et les apercus.

## Parametres d'URL utiles

Des parametres simples peuvent etre utilises pour ouvrir directement une langue ou un preset :

- `?lang=fr`
- `?lang=en`
- `?lang=es`
- `?lang=de`
- `?lang=ar`
- `?preset=portrait-soft-45`
- `?preset=boudoir-parabolic`
- `?preset=interview-led`

Exemple :

```text
index.html?preset=portrait-soft-45&lang=fr
```

## Soutien

Si cet outil vous est utile, vous pouvez soutenir son evolution ici :

[Ko-fi](https://ko-fi.com/D1D21VSKW5)


## Architecture et validation

Voir [les choix de découpage et les contrôles disponibles](docs/ARCHITECTURE.md).
