export const PHOTO_LAB_SCENES = [
  {
    id: "portrait-loft",
    name: "Portrait en studio daylight",
    imageSrc: "../docs/photo-lab/portrait-studio-depth-temp.png",
    assetStatus: "Image temporaire generee pour le prototype, a remplacer par une photographie finale libre de droits.",
    focusPoint: { x: 0.43, y: 0.43 },
    subjectMask: { x: 0.43, y: 0.47, radiusX: 0.22, radiusY: 0.39 },
    foregroundMask: { x: 0.52, y: 0.82, radiusX: 0.32, radiusY: 0.19 },
    defaultSettings: {
      bodyId: "lumiere-ff-45",
      lensId: "zoom-24-70-f28",
      iso: 100,
      aperture: 2.8,
      focalLength: 50,
      shutterSeconds: 1 / 125,
      subjectDistanceMeters: 2.2,
      subjectSpeedMetersPerSecond: 0.7,
      stabilizationStops: 0
    },
    referenceSettings: {
      iso: 100,
      aperture: 2.8,
      focalLength: 50,
      shutterSeconds: 1 / 125
    }
  }
];

export function getPhotoLabScene(sceneId) {
  return PHOTO_LAB_SCENES.find((scene) => scene.id === sceneId) || PHOTO_LAB_SCENES[0];
}
