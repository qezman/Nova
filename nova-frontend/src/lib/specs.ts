export type SpecCategory =
  | "Core"
  | "Display"
  | "Audio"
  | "Connectivity"
  | "Battery"
  | "Sensors"
  | "Materials"
  | "Dimensions";

export interface SpecEntry {
  label: string;
  value: string;
  note?: string;
}

export interface SpecSection {
  category: SpecCategory;
  entries: SpecEntry[];
}

export const SPEC_SECTIONS: SpecSection[] = [
  {
    category: "Core",
    entries: [
      { label: "Processor", value: "Nova N1 (3 nm)" },
      { label: "Neural Engine", value: "16-core NPU, 38 TOPS" },
      { label: "RAM", value: "8 GB LPDDR5X" },
      { label: "Storage", value: "64 GB UFS 4.0" },
      { label: "OS", value: "NovaOS 1.0 (Linux-based)" },
    ],
  },
  {
    category: "Display",
    entries: [
      { label: "Type", value: "Micro-OLED waveguide" },
      { label: "Resolution", value: "2.4K per eye" },
      { label: "Field of view", value: "52° diagonal" },
      { label: "Brightness", value: "1,400 nits peak" },
      { label: "Refresh rate", value: "90 Hz" },
    ],
  },
  {
    category: "Audio",
    entries: [
      { label: "Speakers", value: "Open-ear spatial audio" },
      { label: "Microphones", value: "5-mic array, beamforming" },
      { label: "Noise cancellation", value: "Adaptive hybrid ANC" },
    ],
  },
  {
    category: "Connectivity",
    entries: [
      { label: "Bluetooth", value: "BT 5.4 LE Audio" },
      { label: "Wi-Fi", value: "Wi-Fi 6E (2.4 / 5 / 6 GHz)" },
      { label: "UWB", value: "Ultra-Wideband (spatial awareness)" },
      { label: "USB", value: "USB-C 3.2 Gen 2" },
    ],
  },
  {
    category: "Battery",
    entries: [
      { label: "Capacity", value: "1,340 mAh" },
      { label: "Life", value: "Up to 14 h mixed use" },
      { label: "Charging", value: "30 W wired / 15 W wireless" },
      { label: "Charge time (0→80%)", value: "38 min" },
    ],
  },
  {
    category: "Sensors",
    entries: [
      { label: "IMU", value: "9-axis (accel + gyro + mag)" },
      { label: "Eye tracking", value: "Foveated rendering, 120 Hz" },
      { label: "Ambient light", value: "Adaptive exposure sensor" },
      { label: "Camera", value: "12 MP RGB + depth (ToF)" },
    ],
  },
  {
    category: "Materials",
    entries: [
      { label: "Frame", value: "Aerospace-grade titanium" },
      { label: "Lens", value: "Gorilla Glass Victus 2" },
      { label: "Finish", value: "Midnight, Cloud, Ember" },
      { label: "Rating", value: "IP54 dust and splash resistance" },
    ],
  },
  {
    category: "Dimensions",
    entries: [
      { label: "Weight", value: "48 g" },
      { label: "Width", value: "148 mm" },
      { label: "Height", value: "42 mm" },
      { label: "Depth", value: "22 mm" },
    ],
  },
];
