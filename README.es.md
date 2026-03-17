[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D21VSKW5)

Idiomas: [Français](README.md) · [FR](README.fr.md) · [English](README.en.md) · [Español](README.es.md) · [Deutsch](README.de.md) · [العربية](README.ar.md)

# LITE Studio

LITE Studio es una aplicacion web autonoma para planificar un set fotografico en escritorio y movil.

Te ayuda a construir un esquema rapidamente, medir las distancias utiles del plato, acercar el plano, guardar presets personalizados y exportar el set en PNG o PDF.

## Capturas de pantalla

### Vista principal - preset de retrato

![Vista principal preset retrato](docs/screenshots/studio-portrait.png)

### Preset boudoir

![Preset boudoir](docs/screenshots/studio-boudoir.png)

### Preset de entrevista en video

![Preset de entrevista en video](docs/screenshots/studio-video.png)

## Funcionalidades

- Interfaz responsive pensada para movil y desktop.
- Vista superior con zoom, rueda del raton en desktop, pinch-to-zoom en movil y vista isometrica ampliable.
- Biblioteca de elementos con busqueda por tipo, tamano o familia.
- Medidas automaticas entre sujeto, camara, fondo y fuentes de luz, ademas de un modo de medicion manual.
- Ajustes de elemento e informacion util como altura, orientacion, potencia de luz y f-stop estimado a ISO 100.
- Presets integrados y presets personalizados guardados en el navegador.
- Exportacion PNG, exportacion PDF e impresion directa del plano principal.
- Interfaz multilingue: frances, ingles, espanol, aleman y arabe.

## Inicio rapido

No se requiere instalacion.

1. Abre [app.html](app.html) en un navegador moderno para iniciar la aplicacion, o [index.html](index.html) para la landing publica.
2. Agrega elementos desde la biblioteca.
3. Muevelos en el plano y giralos con el asa naranja.
4. Usa la rueda del raton en desktop o el gesto de pinza en movil para acercar la vista superior.
5. Activa `Medir` para mostrar distancias alrededor del sujeto o trazar una medicion manual.
6. Usa el menu `Presets` para cargar un preset o guardar tu propia configuracion.
7. Usa el menu `Archivo` para copiar la imagen, exportar en PNG o PDF, o imprimir el plano.

## Estructura del proyecto

- `index.html`: landing page publica.
- `app.html`: aplicacion de plan de estudio fotografico.
- `css/simple-studio.css`: diseno, responsive, maquetacion y estilos de impresion.
- `css/site.css`: estilos de la landing y de las paginas editoriales.
- `js/simple-studio.js`: logica del estudio, renderizado canvas, idiomas, presets, medidas e interacciones.
- `js/site-i18n.js` y `js/site-copy-*.js`: contenido y localizacion de las paginas publicas.
- `guide.html`, `presets.html`, `faq.html`: paginas de apoyo y explicacion.
- `schema-eclairage-portrait.html`, `plan-studio-boudoir.html`, `lighting-diagram-interview.html`: paginas SEO conectadas con la aplicacion.
- `docs/screenshots/`: capturas usadas en el README y en las vistas previas.

## Parametros de URL utiles

Se pueden usar parametros simples para abrir directamente un idioma o un preset:

- `?lang=fr`
- `?lang=en`
- `?lang=es`
- `?lang=de`
- `?lang=ar`
- `?preset=portrait-soft-45`
- `?preset=boudoir-parabolic`
- `?preset=interview-led`

Ejemplo:

```text
index.html?preset=portrait-soft-45&lang=es
```

## Apoyo

Si esta herramienta te ayuda, puedes apoyar su evolucion aqui:

[Ko-fi](https://ko-fi.com/D1D21VSKW5)
