[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D21VSKW5)

Sprachen: [Français](README.md) · [FR](README.fr.md) · [English](README.en.md) · [Español](README.es.md) · [Deutsch](README.de.md) · [العربية](README.ar.md)

# LITE Studio

LITE Studio ist eine eigenstandige Web-App zur Planung eines Fotostudio-Setups.

Sie ermoglicht das Platzieren realistischer Studio-Elemente, das Andern von Boden- und Hintergrundfarben, das Arbeiten mit einer grossen Draufsicht und einer kleinen isometrischen Vorschau, das Laden von Studio-Presets sowie das direkte Drucken der Draufsicht.

## Screenshots

### Hauptansicht - Portrat-Preset

![Hauptansicht Portrat-Preset](docs/screenshots/studio-portrait.png)

### Boudoir-Preset

![Boudoir-Preset](docs/screenshots/studio-boudoir.png)

### Video-Interview-Preset

![Video-Interview-Preset](docs/screenshots/studio-video.png)

## Funktionen

- Grosse Draufsicht des Studios mit kleiner isometrischer Vorschau.
- Nach Kategorien organisierte Bibliothek mit mehreren Groessen pro Element.
- Verschieben und Drehen aller Elemente mit der Maus.
- Schneller Wechsel von Boden- und Fotohintergrundfarben.
- Umfangreiche Preset-Bibliothek nach Kategorien sortiert.
- Mehrsprachige Oberflache: Franzosisch, Englisch, Spanisch, Deutsch und Arabisch.
- Direktes Drucken der Draufsicht.
- Zurucksetzen des Setups mit einem Klick.

## Schnellstart

Es ist keine Installation erforderlich.

1. Offnen Sie [index.html](index.html) in einem modernen Browser.
2. Fugen Sie Elemente aus der Bibliothek hinzu.
3. Bewegen Sie sie im Plan und drehen Sie sie mit dem orangefarbenen Griff.
4. Verwenden Sie das Menu `Farbe`, um Boden und Hintergrund zu andern.
5. Verwenden Sie das Menu `Presets`, um ein bestehendes Setup zu laden.
6. Verwenden Sie `Datei > Drucken`, um die Draufsicht zu drucken.

## Projektstruktur

- `index.html`: Hauptoberflache.
- `css/simple-studio.css`: Design, Layout und Druckstile.
- `js/simple-studio.js`: Studio-Logik, Canvas-Rendering, Presets, Sprachen und Interaktionen.
- `docs/screenshots/`: im README verwendete Screenshots.

## Nützliche URL-Parameter

Mit einfachen URL-Parametern kann direkt eine Sprache oder ein Preset geoffnet werden:

- `?lang=fr`
- `?lang=en`
- `?lang=es`
- `?lang=de`
- `?lang=ar`
- `?preset=portrait-soft-45`
- `?preset=boudoir-parabolic`
- `?preset=interview-led`

Beispiel:

```text
index.html?preset=portrait-soft-45&lang=de
```

## Support

Wenn Ihnen dieses Tool hilft, konnen Sie seine Weiterentwicklung hier unterstutzen:

[Ko-fi](https://ko-fi.com/D1D21VSKW5)
