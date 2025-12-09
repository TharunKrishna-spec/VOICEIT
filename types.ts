
import { LucideIcon } from "lucide-react";

// For Database storage, icons are strings (e.g., "Mic")
// For Runtime rendering, we map strings to LucideIcons
export interface Department {
  id: string;
  name: string;
  icon: string; 
  description: string;
  color: string;
}

export interface EventItem {
  id: string;
  title: string;
  year: string;
  icon: string; 
  description: string;
  image?: string;
  longDescription?: string;
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
  designation: string; 
  department: string;
  image: string;
  quote?: string; // Added for the new Slider design
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  duration: string;
  image: string;
  link?: string;
}

export interface PastTenure {
  id: string;
  year: string;
  members: BoardMember[];
}

export interface PastLeadTenure {
  id: string;
  year: string;
  leads: Lead[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export interface HeroData {
  title: string;
  subtitle_p1: string;
  subtitle_highlight: string;
  description: string;
}

export interface AboutFeature {
  id: string;
  title: string;
  text: string;
  icon: string;
}

export interface AboutData {
  sectionTitle: string;
  mainTitle: string;
  description: string;
  features: AboutFeature[];
  images: string[];
}

export interface RecruitmentData {
  isOpen: boolean;
  link: string;
}

export interface SocialLinks {
  instagram: string;
  youtube: string;
  linkedin: string;
}
