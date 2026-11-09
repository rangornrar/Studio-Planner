export const ISO_VALUES = [100, 200, 400, 800, 1600, 3200, 6400, 12800];

export const APERTURE_VALUES = [1.4, 1.8, 2.8, 3.5, 4, 5.6, 8, 11, 16, 22];

export const FOCAL_LENGTH_VALUES = [14, 18, 24, 35, 50, 55, 70, 85, 105, 135, 200, 300];

export const SHUTTER_SPEEDS = [
  { label: "1/2000", seconds: 1 / 2000 },
  { label: "1/1000", seconds: 1 / 1000 },
  { label: "1/500", seconds: 1 / 500 },
  { label: "1/250", seconds: 1 / 250 },
  { label: "1/125", seconds: 1 / 125 },
  { label: "1/60", seconds: 1 / 60 },
  { label: "1/30", seconds: 1 / 30 },
  { label: "1/15", seconds: 1 / 15 },
  { label: "1/4", seconds: 1 / 4 },
  { label: "1", seconds: 1 }
];

export const CAMERA_BODIES = [
  {
    id: "lumiere-ff-45",
    brand: "LITE",
    name: "LITE FF 45",
    sensorFormat: "full-frame",
    cropFactor: 1,
    isoRange: { min: 100, max: 12800 },
    nativeIso: 100,
    resolutionMegapixels: 45,
    compatibleLensIds: [
      "prime-24-f14",
      "prime-35-f18",
      "prime-50-f18",
      "prime-85-f14",
      "zoom-24-70-f28",
      "zoom-70-200-f28",
      "zoom-24-105-f4"
    ]
  },
  {
    id: "lumiere-apsc-26",
    brand: "LITE",
    name: "LITE APS-C 26",
    sensorFormat: "aps-c",
    cropFactor: 1.5,
    isoRange: { min: 100, max: 6400 },
    nativeIso: 100,
    resolutionMegapixels: 26,
    compatibleLensIds: [
      "prime-24-f14",
      "prime-35-f18",
      "prime-50-f18",
      "prime-85-f14",
      "zoom-24-70-f28",
      "zoom-70-200-f28",
      "zoom-18-55-f35-f56",
      "zoom-24-105-f4"
    ]
  },
  {
    id: "lumiere-mft-20",
    brand: "LITE",
    name: "LITE Micro 4/3 20",
    sensorFormat: "micro-four-thirds",
    cropFactor: 2,
    isoRange: { min: 100, max: 6400 },
    nativeIso: 200,
    resolutionMegapixels: 20,
    compatibleLensIds: ["prime-35-f18", "prime-50-f18", "zoom-24-70-f28"]
  }
];

export const LENSES = [
  {
    id: "prime-24-f14",
    brand: "LITE",
    name: "24 mm f/1.4",
    type: "prime",
    minFocalLength: 24,
    maxFocalLength: 24,
    maxApertureAtMinFocal: 1.4,
    maxApertureAtMaxFocal: 1.4,
    minAperture: 16,
    compatibleSensorFormats: ["full-frame", "aps-c"],
    minFocusDistanceMeters: 0.25,
    apertureBladeCount: 9
  },
  {
    id: "prime-35-f18",
    brand: "LITE",
    name: "35 mm f/1.8",
    type: "prime",
    minFocalLength: 35,
    maxFocalLength: 35,
    maxApertureAtMinFocal: 1.8,
    maxApertureAtMaxFocal: 1.8,
    minAperture: 16,
    compatibleSensorFormats: ["full-frame", "aps-c", "micro-four-thirds"],
    minFocusDistanceMeters: 0.3,
    apertureBladeCount: 9
  },
  {
    id: "prime-50-f18",
    brand: "LITE",
    name: "50 mm f/1.8",
    type: "prime",
    minFocalLength: 50,
    maxFocalLength: 50,
    maxApertureAtMinFocal: 1.8,
    maxApertureAtMaxFocal: 1.8,
    minAperture: 16,
    compatibleSensorFormats: ["full-frame", "aps-c", "micro-four-thirds"],
    minFocusDistanceMeters: 0.45,
    apertureBladeCount: 7
  },
  {
    id: "prime-85-f14",
    brand: "LITE",
    name: "85 mm f/1.4",
    type: "prime",
    minFocalLength: 85,
    maxFocalLength: 85,
    maxApertureAtMinFocal: 1.4,
    maxApertureAtMaxFocal: 1.4,
    minAperture: 16,
    compatibleSensorFormats: ["full-frame", "aps-c"],
    minFocusDistanceMeters: 0.85,
    apertureBladeCount: 11
  },
  {
    id: "zoom-24-70-f28",
    brand: "LITE",
    name: "24-70 mm f/2.8",
    type: "zoom",
    minFocalLength: 24,
    maxFocalLength: 70,
    maxApertureAtMinFocal: 2.8,
    maxApertureAtMaxFocal: 2.8,
    minAperture: 22,
    compatibleSensorFormats: ["full-frame", "aps-c", "micro-four-thirds"],
    minFocusDistanceMeters: 0.38,
    apertureBladeCount: 9
  },
  {
    id: "zoom-70-200-f28",
    brand: "LITE",
    name: "70-200 mm f/2.8",
    type: "zoom",
    minFocalLength: 70,
    maxFocalLength: 200,
    maxApertureAtMinFocal: 2.8,
    maxApertureAtMaxFocal: 2.8,
    minAperture: 22,
    compatibleSensorFormats: ["full-frame", "aps-c"],
    minFocusDistanceMeters: 1.2,
    apertureBladeCount: 11
  },
  {
    id: "zoom-24-105-f4",
    brand: "LITE",
    name: "24-105 mm f/4",
    type: "zoom",
    minFocalLength: 24,
    maxFocalLength: 105,
    maxApertureAtMinFocal: 4,
    maxApertureAtMaxFocal: 4,
    minAperture: 22,
    compatibleSensorFormats: ["full-frame", "aps-c"],
    minFocusDistanceMeters: 0.45,
    apertureBladeCount: 9
  },
  {
    id: "zoom-18-55-f35-f56",
    brand: "LITE",
    name: "18-55 mm f/3.5-5.6",
    type: "zoom",
    minFocalLength: 18,
    maxFocalLength: 55,
    maxApertureAtMinFocal: 3.5,
    maxApertureAtMaxFocal: 5.6,
    apertureTable: [
      { focalLength: 18, maxAperture: 3.5 },
      { focalLength: 24, maxAperture: 4 },
      { focalLength: 35, maxAperture: 4.5 },
      { focalLength: 45, maxAperture: 5 },
      { focalLength: 55, maxAperture: 5.6 }
    ],
    minAperture: 22,
    compatibleSensorFormats: ["aps-c"],
    minFocusDistanceMeters: 0.28,
    apertureBladeCount: 7
  }
];

export const DEFAULT_PHOTO_LAB_SETTINGS = {
  bodyId: "lumiere-ff-45",
  lensId: "prime-50-f18",
  iso: 100,
  aperture: 2.8,
  focalLength: 50,
  shutterSeconds: 1 / 125,
  subjectDistanceMeters: 2.2,
  subjectSpeedMetersPerSecond: 0.7,
  stabilizationStops: 0
};
