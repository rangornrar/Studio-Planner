[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D21VSKW5)

Sprachen: [Français](README.md) · [FR](README.fr.md) · [English](README.en.md) · [Español](README.es.md) · [Deutsch](README.de.md) · [العربية](README.ar.md)

# LITE Studio

LITE Studio ist eine eigenstandige Web-App zur Planung eines Foto-Sets auf Desktop und Mobilgerat.

Sie hilft dabei, ein Setup schnell aufzubauen, wichtige Abstanden auf dem Set zu messen, im Plan zu zoomen, eigene Presets zu speichern und das Layout als PNG oder PDF zu exportieren.

## Screenshots

### Hauptansicht - Portrat-Preset

![Hauptansicht Portrat-Preset](docs/screenshots/studio-portrait.png)

### Boudoir-Preset

![Boudoir-Preset](docs/screenshots/studio-boudoir.png)

### Video-Interview-Preset

![Video-Interview-Preset](docs/screenshots/studio-video.png)

## Funktionen

- Responsive Oberflache fur Mobilgerate und Desktop.
- Draufsicht mit Zoom, Mausrad auf Desktop, Pinch-to-Zoom auf Mobilgeraten und zoombarer isometrischer Vorschau.
- Elementbibliothek mit Suche nach Typ, Grosse oder Familie.
- Automatische Messwerte zwischen Motiv, Kamera, Hintergrund und Lichtquellen sowie ein manueller Messmodus.
- Element-Einstellungen und praktische Angaben wie Hohe, Ausrichtung, Lichtleistung und geschaetzte Blende bei ISO 100.
- Integrierte Presets und benutzerdefinierte Presets, die im Browser gespeichert werden.
- PNG-Export, PDF-Export und direktes Drucken des Hauptplans.
- Mehrsprachige Oberflache: Franzosisch, Englisch, Spanisch, Deutsch und Arabisch.

## Schnellstart

Es ist keine Installation erforderlich.

1. Offnen Sie [app.html](app.html) in einem modernen Browser, um die Anwendung zu starten, oder [index.html](index.html) fur die offentliche Landingpage.
2. Fugen Sie Elemente aus der Bibliothek hinzu.
3. Bewegen Sie sie im Plan und drehen Sie sie mit dem orangefarbenen Griff.
4. Verwenden Sie das Mausrad auf Desktop oder die Pinch-Geste auf Mobilgeraten, um in die Draufsicht zu zoomen.
5. Aktivieren Sie `Messen`, um Abstanden rund um das Motiv anzuzeigen oder eine manuelle Messung zu zeichnen.
6. Verwenden Sie das Menu `Presets`, um ein Preset zu laden oder ein eigenes Setup zu speichern.
7. Verwenden Sie das Menu `Datei`, um das Bild zu kopieren, PNG oder PDF zu exportieren oder den Plan zu drucken.

## Projektstruktur

- `index.html`: offentliche Landingpage.
- `app.html`: Anwendung fur die Planung von Foto-Sets.
- `css/simple-studio.css`: Design, Responsive-Verhalten, Layout und Druckstile.
- `css/site.css`: Styles fur Landingpage und redaktionelle Seiten.
- `js/simple-studio.js`: Studio-Logik, Canvas-Rendering, Sprachen, Presets, Messungen und Interaktionen.
- `js/site-i18n.js` und `js/site-copy-*.js`: Inhalte und Lokalisierung der offentlichen Seiten.
- `guide.html`, `presets.html`, `faq.html`: erklarende Begleitseiten.
- `schema-eclairage-portrait.html`, `plan-studio-boudoir.html`, `lighting-diagram-interview.html`: SEO-Seiten mit Verlinkung zur App.
- `docs/screenshots/`: Screenshots fur README und Vorschaubilder.

## Nutzliche URL-Parameter

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
