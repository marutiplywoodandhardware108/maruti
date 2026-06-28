import {
  DoorOpen,
  DoorClosed,
  Lock,
  KeyRound,
  Grip,
  CircleDot,
  Layers,
  Wrench,
  PanelTop,
  Magnet,
  Hammer,
  Droplets,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/categories";

const map: Record<IconName, React.ComponentType<LucideProps>> = {
  DoorOpen,
  DoorClosed,
  Lock,
  KeyRound,
  Grip,
  CircleDot,
  Layers,
  Wrench,
  PanelTop,
  Magnet,
  Hammer,
  Droplets,
};

export function CategoryIcon({
  name,
  ...props
}: { name: IconName } & LucideProps) {
  const Icon = map[name] ?? Wrench;
  return <Icon aria-hidden="true" {...props} />;
}
