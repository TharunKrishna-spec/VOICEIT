import { LucideIcon } from "lucide-react";

// For Database storage, icons are strings (e.g., "Mic")
// For Runtime rendering, we map strings to LucideIcons
export interface Department {
  id: string;
  name: string;
  icon: string; // Changed from LucideIcon to string name
  description: string;
  color: string;
}

export interface EventItem {
  id: string;
  title: string;
  year: string;
  icon: string; // Changed from LucideIcon to string name
  description: string;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Lead {
  id: string;
  name: string;
  designation: string; // Normalized from 'role' for tooltip comp
  department: string;
  image: string;
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  duration: string;
  image: string;
  link?: string;
}

export interface HeroData {
  title: string;
  subtitle_p1: string;
  subtitle_highlight: string;
  description: string;
}