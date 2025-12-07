import { LucideIcon } from "lucide-react";

export interface Department {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

export interface EventItem {
  id: string;
  title: string;
  year: string;
  icon: LucideIcon;
  description: string;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  image: string;
}
