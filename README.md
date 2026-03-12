[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D21VSKW5)

# LITE Studio

LITE Studio est une application web autonome pour preparer un plan de studio photo.

Elle permet de positionner des elements realistes de plateau, de changer les couleurs du sol et du fond, d'afficher une vue de dessus avec une petite vue isometrique, d'utiliser des presets de studio et d'imprimer directement le plan principal.

## Captures d'ecran

### Vue principale - preset portrait

![Vue principale preset portrait](docs/screenshots/studio-portrait.png)

### Preset boudoir

![Preset boudoir](docs/screenshots/studio-boudoir.png)

### Preset video interview

![Preset video interview](docs/screenshots/studio-video.png)

## Fonctionnalites

- Vue de dessus principale du studio avec mini vue isometrique.
- Bibliotheque d'elements classes par categories avec plusieurs tailles.
- Deplacement et rotation des elements a la souris.
- Changement rapide de la couleur du sol et des fonds photo.
- Grande banque de presets classes par categories.
- Interface multilingue: francais, anglais, espagnol, allemand et arabe.
- Impression directe du plan principal.
- Remise a zero du plateau en un clic.

## Demarrage rapide

Aucune installation n'est necessaire.

1. Ouvrez [index.html](index.html) dans un navigateur moderne.
2. Ajoutez des elements depuis la bibliotheque.
3. Deplacez-les sur le plan et tournez-les avec la poignee orange.
4. Utilisez le menu `Couleur` pour changer le sol et le fond.
5. Utilisez le menu `Presets` pour charger une configuration existante.
6. Utilisez le menu `Fichier > Imprimer` pour imprimer la vue de dessus.

## Structure du projet

- `index.html` : interface principale.
- `css/simple-studio.css` : design, mise en page et styles d'impression.
- `js/simple-studio.js` : logique du studio, rendu canvas, presets, langues et interactions.
- `docs/screenshots/` : captures d'ecran du README.

## Parametres d'URL utiles

Des parametres simples peuvent etre utilises pour ouvrir directement une langue ou un preset:

- `?lang=fr`
- `?lang=en`
- `?preset=portrait-soft-45`
- `?preset=boudoir-parabolic`
- `?preset=interview-led`

Exemple:

```text
index.html?preset=portrait-soft-45&lang=fr
```

## Soutien

Si cet outil vous est utile, vous pouvez soutenir son evolution ici:

[Ko-fi](https://ko-fi.com/D1D21VSKW5)
