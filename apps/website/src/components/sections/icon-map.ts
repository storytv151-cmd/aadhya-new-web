import {
  Cloud,
  Code2,
  Gamepad2,
  Globe,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  "gamepad-2": Gamepad2,
  globe: Globe,
  palette: Palette,
  "shield-check": ShieldCheck,
  cloud: Cloud,
  search: Search,
  "pen-tool": PenTool,
  "code-2": Code2,
  rocket: Rocket,
};

export function getIcon(name?: string): LucideIcon {
  return (name && iconMap[name]) || Sparkles;
}
