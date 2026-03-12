[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D21VSKW5)

Idiomas: [Français](README.md) · [FR](README.fr.md) · [English](README.en.md) · [Español](README.es.md) · [Deutsch](README.de.md) · [العربية](README.ar.md)

# LITE Studio

LITE Studio es una aplicacion web autonoma para preparar un esquema de estudio fotografico.

Permite colocar elementos de estudio realistas, cambiar los colores del suelo y del fondo, trabajar con una vista superior principal y una pequena vista isometrica, cargar presets de estudio e imprimir directamente la vista superior.

## Capturas de pantalla

### Vista principal - preset de retrato

![Vista principal preset retrato](docs/screenshots/studio-portrait.png)

### Preset boudoir

![Preset boudoir](docs/screenshots/studio-boudoir.png)

### Preset de entrevista en video

![Preset de entrevista en video](docs/screenshots/studio-video.png)

## Funcionalidades

- Vista superior principal del estudio con pequena vista isometrica.
- Biblioteca de elementos organizada por categorias con varios tamanos.
- Desplazamiento y rotacion de los elementos con el raton.
- Cambio rapido del color del suelo y de los fondos fotograficos.
- Gran biblioteca de presets clasificados por categoria.
- Interfaz multilingue: frances, ingles, espanol, aleman y arabe.
- Impresion directa de la vista superior.
- Reinicio del set en un clic.

## Inicio rapido

No se requiere instalacion.

1. Abre [index.html](index.html) en un navegador moderno.
2. Agrega elementos desde la biblioteca.
3. Muevelos en el plano y giralos con el asa naranja.
4. Usa el menu `Color` para cambiar el suelo y el fondo.
5. Usa el menu `Presets` para cargar una configuracion existente.
6. Usa `Archivo > Imprimir` para imprimir la vista superior.

## Estructura del proyecto

- `index.html`: interfaz principal.
- `css/simple-studio.css`: diseno, maquetacion y estilos de impresion.
- `js/simple-studio.js`: logica del estudio, renderizado canvas, presets, idiomas e interacciones.
- `docs/screenshots/`: capturas usadas en el README.

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
