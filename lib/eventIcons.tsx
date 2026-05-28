import {
  Building2,
  Send,
  Users,
  Bot,
  Rocket,
  Palette,
  CalendarDays,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  "founders-night-build-in-public": Building2,
  "the-cold-outreach-room": Send,
  "women-in-growth-mixer": Users,
  "ai-tools-show-and-tell": Bot,
  "first-90-days-new-role": Rocket,
  "portfolio-and-pricing-clinic": Palette,
};

export function getEventIcon(slug: string): LucideIcon {
  return map[slug] ?? CalendarDays;
}
