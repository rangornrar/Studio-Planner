# 📸 Photo Studio Setup Planner

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-experimental-orange)
![Made
with](https://img.shields.io/badge/made%20with-HTML%2FCanvas%2FFabric.js-1f425f.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
![Version](https://img.shields.io/badge/version-0.1--alpha-lightgrey)

A browser-based tool to **design, simulate, and visualize photography
lighting setups**.

This project allows photographers to arrange **subjects, lights,
modifiers, and cameras** on a studio floor plan and instantly preview a
**simulated camera view** with estimated lighting effects.

Designed for:

-   photographers
-   lighting assistants
-   photography teachers
-   studio planners
-   creative experimentation

------------------------------------------------------------------------

# 📑 Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Screenshots](#screenshots)
-   [How It Works](#how-it-works)
-   [Supported Equipment](#supported-equipment)
-   [Use Cases](#use-cases)
-   [Technical Architecture](#technical-architecture)
-   [Installation](#installation)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [Project Structure](#project-structure)
-   [License](#license)
-   [Author](#author)

------------------------------------------------------------------------

# Overview

Lighting design is often done by trial and error. This tool helps
visualize lighting setups **before entering the studio**.

The application provides:

-   a **top-down studio planner**
-   a **camera preview renderer**
-   a **simplified lighting simulation**
-   an intuitive drag-and-drop interface

The project runs **entirely inside the browser**, requiring no backend.

------------------------------------------------------------------------

# Features

## 🧭 Studio Floor Plan

Interactive drag-and-drop placement of:

-   subjects
-   lights
-   modifiers
-   accessories
-   camera
-   background

Built using **Fabric.js**, enabling smooth transformations and object
control.

------------------------------------------------------------------------

## 🎥 Camera View

A second canvas renders a **simulated camera perspective**.

The preview shows:

-   perspective scaling
-   object depth ordering
-   relative positioning
-   lighting estimation on the subject

------------------------------------------------------------------------

## 💡 Lighting Simulation

Each light contributes to subject illumination based on:

-   distance
-   orientation
-   beam direction
-   color temperature

Lighting zones:

-   left illumination
-   right illumination
-   top light
-   rim light

The subject shading dynamically adapts to light placement.

------------------------------------------------------------------------

# Screenshots

Example usage of the tool.

### Studio Planner

![Studio Planner](docs/screenshots/studio-plan.png)

### Camera View

![Camera View](docs/screenshots/camera-view.png)

### Lighting Simulation

![Lighting Simulation](docs/screenshots/light-simulation.png)

*(Add screenshots in `/docs/screenshots/`)*

------------------------------------------------------------------------

# How It Works

Objects are placed in a **2D studio coordinate system**.

The camera preview converts positions into camera space.

Transformation:

    dx = obj.x - camera.x
    dy = obj.y - camera.y

    forward = dx * cos(angle) + dy * sin(angle)
    lateral = -dx * sin(angle) + dy * cos(angle)

Then projected onto screen coordinates:

    screenX = center + (lateral / depth) * focal
    scale = focal / (depth + offset)

This provides:

-   perspective
-   distance scaling
-   left/right displacement

------------------------------------------------------------------------

# Supported Equipment

## Subjects

-   Standing model
-   Sitting model
-   Product subject
-   Tabletop product

------------------------------------------------------------------------

## Lights

-   Softbox
-   Stripbox
-   Octobox
-   Umbrella
-   Beauty dish
-   Ring light
-   LED panels
-   Studio flashes

------------------------------------------------------------------------

## Modifiers

-   Reflector panels
-   Diffusion panels
-   V-Flats
-   Flags (light blockers)

------------------------------------------------------------------------

## Accessories

-   Chairs
-   Tripods
-   Light stands
-   Boom arms

------------------------------------------------------------------------

## Background

Studio background elements with realistic dimensions.

------------------------------------------------------------------------

# Use Cases

This tool can help with:

-   planning portrait lighting
-   preparing studio shoots
-   explaining lighting setups
-   teaching photography lighting
-   documenting setups for teams

------------------------------------------------------------------------

# Technical Architecture

Technology stack:

-   **HTML5**
-   **Canvas API**
-   **Fabric.js**

Architecture:

    Studio Planner (Fabric.js)
            │
            │ object positions
            ▼
    Camera Projection Engine
            │
            ▼
    Lighting Estimator
            │
            ▼
    Canvas Renderer

Rendering is handled using a **2.5D projection model**, not full 3D.

------------------------------------------------------------------------

# Installation

No installation required.

Simply open:

    index.html

in a modern browser.

------------------------------------------------------------------------

# Roadmap

Planned future improvements.

### Rendering

-   object height simulation
-   realistic shadows
-   occlusion management

### Lighting

-   inverse-square law intensity
-   beam angle simulation
-   flash power modeling

### User Experience

-   save/load setups
-   JSON export
-   PNG export
-   shareable setup links

### Advanced Rendering

-   WebGL rendering
-   optional Three.js mode
-   full 3D studio visualization

------------------------------------------------------------------------

# Contributing

Contributions are welcome.

Possible areas:

-   lighting physics improvements
-   UI/UX enhancements
-   new modifiers
-   export features
-   performance optimizations

Steps:

1.  Fork the repository
2.  Create a feature branch
3.  Commit your changes
4.  Submit a Pull Request

------------------------------------------------------------------------

# Project Structure

    /project-root

    index.html
    README.md

    /docs
        /screenshots

    /js
        cameraRenderer.js
        lightingEngine.js
        studioObjects.js

    /css
        styles.css

*(Actual structure may vary depending on project evolution)*

------------------------------------------------------------------------

# License

MIT License

You are free to use, modify, and distribute this software.

------------------------------------------------------------------------

# Author

Created to explore:

-   photography lighting visualization
-   browser-based studio simulation
-   interactive Canvas applications

------------------------------------------------------------------------

⭐ If you find this project useful, consider starring the repository.
