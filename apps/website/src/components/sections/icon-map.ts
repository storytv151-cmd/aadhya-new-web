import {
  Cloud,
  Code2,
  Gamepad2,
  Globe,
  KeyRound,
  LayoutDashboard,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TicketPercent,
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
  "key-round": KeyRound,
  "ticket-percent": TicketPercent,
  "layout-dashboard": LayoutDashboard,
};

export function getIcon(name?: string): LucideIcon {
  return (name && iconMap[name]) || Sparkles;
}
