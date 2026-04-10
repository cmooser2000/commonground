import React from 'react';

// Re-export all icon files
export * from './ToolsIcons';
export * from './GardenIcons';
export * from './CampingIcons';
export * from './KitchenIcons';
export * from './MovingIcons';
export * from './KidsIcons';
export * from './SkillsIcons';
export * from './EmergencyIcons';

// Import all components for CATEGORY_MAP
import {
  HammerIcon,
  PowerDrillIcon,
  CircularSawIcon,
  LadderIcon,
  WrenchSetIcon,
  PaintRollerIcon,
  CaulkGunIcon,
  StudFinderIcon,
} from './ToolsIcons';

import {
  LeafBlowerIcon,
  LawnMowerIcon,
  WheelbarrowIcon,
  GardenHoeIcon,
  HoseSprinklerIcon,
  PruningShearIcon,
  RakeIcon,
} from './GardenIcons';

import {
  TentIcon,
  SleepingBagIcon,
  CoolerIcon,
  CampLanternIcon,
  BackpackIcon,
  KayakPaddleIcon,
} from './CampingIcons';

import {
  StandMixerIcon,
  InstantPotIcon,
  CanningEquipmentIcon,
  PunchBowlIcon,
  RoastingPanIcon,
  FondueSetIcon,
} from './KitchenIcons';

import {
  MovingBoxesIcon,
  HandTruckIcon,
  CargoStrapsIcon,
  RoofRackIcon,
} from './MovingIcons';

import {
  BabyGearIcon,
  TrainingBikeIcon,
  SportsEquipmentIcon,
  BoardGamesIcon,
} from './KidsIcons';

import {
  RepairWrenchIcon,
  PaintbrushIcon,
  SeedlingIcon,
  LaptopHelpIcon,
  CarIcon,
  NeedleThreadIcon,
  ForkKnifeIcon,
  HammerHeartIcon,
} from './SkillsIcons';

import {
  GeneratorIcon,
  FirstAidKitIcon,
  FlashlightIcon,
  WaterContainerIcon,
  MegaphoneIcon,
} from './EmergencyIcons';

export const CATEGORY_MAP: Record<string, {
  label: string;
  bgColor: string;
  icons: Array<{ key: string; label: string; component: React.ComponentType<{ size?: number; bgColor?: string }> }>;
}> = {
  tools: {
    label: 'Tools & Home',
    bgColor: '#6B8FA3',
    icons: [
      { key: 'hammer', label: 'Hammer', component: HammerIcon },
      { key: 'power-drill', label: 'Power Drill', component: PowerDrillIcon },
      { key: 'circular-saw', label: 'Circular Saw', component: CircularSawIcon },
      { key: 'ladder', label: 'Ladder', component: LadderIcon },
      { key: 'wrench-set', label: 'Wrench Set', component: WrenchSetIcon },
      { key: 'paint-roller', label: 'Paint Roller', component: PaintRollerIcon },
      { key: 'caulk-gun', label: 'Caulk Gun', component: CaulkGunIcon },
      { key: 'stud-finder', label: 'Stud Finder', component: StudFinderIcon },
    ],
  },
  garden: {
    label: 'Garden & Yard',
    bgColor: '#7D9B76',
    icons: [
      { key: 'leaf-blower', label: 'Leaf Blower', component: LeafBlowerIcon },
      { key: 'lawn-mower', label: 'Lawn Mower', component: LawnMowerIcon },
      { key: 'wheelbarrow', label: 'Wheelbarrow', component: WheelbarrowIcon },
      { key: 'garden-hoe', label: 'Garden Hoe', component: GardenHoeIcon },
      { key: 'hose-sprinkler', label: 'Hose & Sprinkler', component: HoseSprinklerIcon },
      { key: 'pruning-shear', label: 'Pruning Shears', component: PruningShearIcon },
      { key: 'rake', label: 'Rake', component: RakeIcon },
    ],
  },
  camping: {
    label: 'Camping & Outdoors',
    bgColor: '#E8B84B',
    icons: [
      { key: 'tent', label: 'Tent', component: TentIcon },
      { key: 'sleeping-bag', label: 'Sleeping Bag', component: SleepingBagIcon },
      { key: 'cooler', label: 'Cooler', component: CoolerIcon },
      { key: 'camp-lantern', label: 'Camp Lantern', component: CampLanternIcon },
      { key: 'backpack', label: 'Backpack', component: BackpackIcon },
      { key: 'kayak-paddle', label: 'Kayak & Paddle', component: KayakPaddleIcon },
    ],
  },
  kitchen: {
    label: 'Kitchen & Entertaining',
    bgColor: '#C1502E',
    icons: [
      { key: 'stand-mixer', label: 'Stand Mixer', component: StandMixerIcon },
      { key: 'instant-pot', label: 'Instant Pot', component: InstantPotIcon },
      { key: 'canning-equipment', label: 'Canning Equipment', component: CanningEquipmentIcon },
      { key: 'punch-bowl', label: 'Punch Bowl', component: PunchBowlIcon },
      { key: 'roasting-pan', label: 'Roasting Pan', component: RoastingPanIcon },
      { key: 'fondue-set', label: 'Fondue Set', component: FondueSetIcon },
    ],
  },
  moving: {
    label: 'Moving & Hauling',
    bgColor: '#6B8FA3',
    icons: [
      { key: 'moving-boxes', label: 'Moving Boxes', component: MovingBoxesIcon },
      { key: 'hand-truck', label: 'Hand Truck', component: HandTruckIcon },
      { key: 'cargo-straps', label: 'Cargo Straps', component: CargoStrapsIcon },
      { key: 'roof-rack', label: 'Roof Rack', component: RoofRackIcon },
    ],
  },
  kids: {
    label: 'Kids & Family',
    bgColor: '#E8B84B',
    icons: [
      { key: 'baby-gear', label: 'Baby Gear', component: BabyGearIcon },
      { key: 'training-bike', label: 'Training Bike', component: TrainingBikeIcon },
      { key: 'sports-equipment', label: 'Sports Equipment', component: SportsEquipmentIcon },
      { key: 'board-games', label: 'Board Games', component: BoardGamesIcon },
    ],
  },
  skills: {
    label: 'Skills & Services',
    bgColor: '#C1502E',
    icons: [
      { key: 'repair-wrench', label: 'Repair & Fix-It', component: RepairWrenchIcon },
      { key: 'paintbrush', label: 'Painting', component: PaintbrushIcon },
      { key: 'seedling', label: 'Gardening Help', component: SeedlingIcon },
      { key: 'laptop-help', label: 'Tech Help', component: LaptopHelpIcon },
      { key: 'car', label: 'Car Help', component: CarIcon },
      { key: 'needle-thread', label: 'Sewing & Alterations', component: NeedleThreadIcon },
      { key: 'fork-knife', label: 'Cooking & Baking', component: ForkKnifeIcon },
      { key: 'hammer-heart', label: 'General Help', component: HammerHeartIcon },
    ],
  },
  emergency: {
    label: 'Emergency Prep',
    bgColor: '#7D9B76',
    icons: [
      { key: 'generator', label: 'Generator', component: GeneratorIcon },
      { key: 'first-aid-kit', label: 'First Aid Kit', component: FirstAidKitIcon },
      { key: 'flashlight', label: 'Flashlight', component: FlashlightIcon },
      { key: 'water-container', label: 'Water Container', component: WaterContainerIcon },
      { key: 'megaphone', label: 'Megaphone', component: MegaphoneIcon },
    ],
  },
};
