[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D21VSKW5)

Languages: [Français](README.md) · [FR](README.fr.md) · [English](README.en.md) · [Español](README.es.md) · [Deutsch](README.de.md) · [العربية](README.ar.md)

# LITE Studio

LITE Studio is a standalone web app for planning a photo studio setup.

It lets you place realistic studio elements, change floor and backdrop colors, work with a main top view plus a small isometric preview, load studio presets, and print the top view directly.

## Screenshots

### Main view - portrait preset

![Main view portrait preset](docs/screenshots/studio-portrait.png)

### Boudoir preset

![Boudoir preset](docs/screenshots/studio-boudoir.png)

### Video interview preset

![Video interview preset](docs/screenshots/studio-video.png)

## Features

- Main top view of the studio with a small isometric preview.
- Element library organized by category with multiple sizes.
- Mouse-based drag and rotation for all placed items.
- Quick floor and photo backdrop color changes.
- Large preset library grouped by category.
- Multilingual interface: French, English, Spanish, German, and Arabic.
- Direct printing of the top view.
- One-click reset of the studio layout.

## Quick Start

No installation is required.

1. Open [index.html](index.html) in a modern browser.
2. Add items from the library.
3. Move them on the plan and rotate them with the orange handle.
4. Use the `Color` menu to change the floor and backdrop.
5. Use the `Presets` menu to load an existing setup.
6. Use `File > Print` to print the top view.

## Project Structure

- `index.html`: main interface.
- `css/simple-studio.css`: design, layout, and print styles.
- `js/simple-studio.js`: studio logic, canvas rendering, presets, languages, and interactions.
- `docs/screenshots/`: screenshots used in the README.

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
