import {
  BellRing,
  ChartColumn,
  Cloud,
  Code2,
  Gamepad2,
  Globe,
  IndianRupee,
  KeyRound,
  LayoutDashboard,
  Palette,
  PenTool,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TabletSmartphone,
  TicketPercent,
  Zap,
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
  "tablet-smartphone": TabletSmartphone,
  "bell-ring": BellRing,
  zap: Zap,
  "indian-rupee": IndianRupee,
  "chart-column": ChartColumn,
};

export function getIcon(name?: string): LucideIcon {
  return (name && iconMap[name]) || Sparkles;
}
