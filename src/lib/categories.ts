/**
 * Product categories shown on the site.
 *
 * Each category maps 1:1 to a folder of photos:
 *   - locally under  /public/<dir>
 *   - and (once uploaded) an ImageKit folder at  /<dir>
 *
 * The image list itself is fetched dynamically (see src/lib/images.ts) — there
 * are deliberately no hardcoded filenames here. To add/rename a category, edit
 * this array and the matching folder name; the order below is the order shown
 * on the homepage (manual / curated).
 */

export type IconName =
  | "DoorOpen"
  | "DoorClosed"
  | "Lock"
  | "KeyRound"
  | "Grip"
  | "CircleDot"
  | "Layers"
  | "Wrench"
  | "PanelTop"
  | "Magnet"
  | "Hammer"
  | "Droplets";

export type Accent = "gold" | "wood" | "silver";

export type Category = {
  /** URL slug + ImageKit folder + /public folder name. */
  slug: string;
  name: string;
  blurb: string;
  icon: IconName;
  accent: Accent;
};

export const categories: Category[] = [
  {
    slug: "door-handles",
    name: "Door Handles",
    blurb:
      "Lever handles, pulls and knobs in brass, stainless steel and matte finishes for doors and cabinetry.",
    icon: "Grip",
    accent: "gold",
  },
  {
    slug: "door-kits",
    name: "Door Kits",
    blurb:
      "Complete door kits — aldrops, bolts and fittings in SS 202 & 304 for a ready-to-fit solution.",
    icon: "KeyRound",
    accent: "silver",
  },
  {
    slug: "door-closer",
    name: "Door Closers",
    blurb:
      "Hydraulic and concealed door closers for smooth, controlled and silent closing.",
    icon: "DoorClosed",
    accent: "silver",
  },
  {
    slug: "wall-hangers",
    name: "Wall Hangers",
    blurb:
      "Wall-mounted coat racks and hook rails in heavy-duty stainless steel for every entryway.",
    icon: "Magnet",
    accent: "gold",
  },
  {
    slug: "towel-rings",
    name: "Towel Rings",
    blurb:
      "Stainless steel towel rings and holders — rust-resistant bath accessories with a clean finish.",
    icon: "CircleDot",
    accent: "silver",
  },
  {
    slug: "curtain-hangers",
    name: "Curtain Hangers",
    blurb:
      "Curtain rods, brackets and drapery hardware in metal and designer finishes.",
    icon: "PanelTop",
    accent: "wood",
  },
  {
    slug: "sofa-legs",
    name: "Sofa Legs",
    blurb:
      "Tapered and round furniture legs in brass-plated, chrome and metal finishes for sofas and cabinets.",
    icon: "Layers",
    accent: "wood",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
