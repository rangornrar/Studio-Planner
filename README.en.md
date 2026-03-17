[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D21VSKW5)

Languages: [Français](README.md) · [FR](README.fr.md) · [English](README.en.md) · [Español](README.es.md) · [Deutsch](README.de.md) · [العربية](README.ar.md)

# LITE Studio

LITE Studio is a standalone web app for planning a photo studio setup on desktop and mobile.

It helps you build a set quickly, measure useful stage distances, zoom the plan, save custom presets, and export the layout as PNG or PDF.

## Screenshots

### Main view - portrait preset

![Main view portrait preset](docs/screenshots/studio-portrait.png)

### Boudoir preset

![Boudoir preset](docs/screenshots/studio-boudoir.png)

### Video interview preset

![Video interview preset](docs/screenshots/studio-video.png)

## Features

- Responsive interface designed for both mobile and desktop use.
- Top view with zoom controls, mouse wheel on desktop, pinch-to-zoom on mobile, and a zoomable isometric preview.
- Element library with search by type, size, or family.
- Automatic measurements between subject, camera, backdrop, and light sources, plus a manual measurement mode.
- Element settings and practical data such as height, orientation, light power, and estimated ISO 100 f-stop.
- Built-in presets and custom presets saved in the browser.
- PNG export, PDF export, and direct printing of the main plan.
- Multilingual interface: French, English, Spanish, German, and Arabic.

## Quick Start

No installation is required.

1. Open [app.html](app.html) in a modern browser to launch the app, or [index.html](index.html) for the public landing page.
2. Add items from the library.
3. Move them on the plan and rotate them with the orange handle.
4. Use the mouse wheel on desktop or pinch on mobile to zoom the top view.
5. Enable `Measure` to show distances around the subject or draw a manual measurement.
6. Use the `Presets` menu to load a preset or save your own setup.
7. Use the `File` menu to copy the image, export PNG or PDF, or print the plan.

## Project Structure

- `index.html`: public landing page.
- `app.html`: photo studio planning application.
- `css/simple-studio.css`: design, responsive layout, and print styles.
- `css/site.css`: landing page and editorial page styles.
- `js/simple-studio.js`: studio logic, canvas rendering, languages, presets, measurements, and interactions.
- `js/site-i18n.js` and `js/site-copy-*.js`: public site localization and content.
- `guide.html`, `presets.html`, `faq.html`: supporting editorial pages.
- `schema-eclairage-portrait.html`, `plan-studio-boudoir.html`, `lighting-diagram-interview.html`: SEO-focused pages linked to the app.
- `docs/screenshots/`: screenshots used in the README and previews.

## Useful URL Parameters

Simple URL parameters can be used to open a specific language or preset directly:

- `?lang=fr`
- `?lang=en`
- `?lang=es`
- `?lang=de`
- `?lang=ar`
- `?preset=portrait-soft-45`
- `?preset=boudoir-parabolic`
- `?preset=interview-led`

Example:

```text
index.html?preset=portrait-soft-45&lang=en
```

## Support

If this tool helps you, you can support its evolution here:

[Ko-fi](https://ko-fi.com/D1D21VSKW5)
