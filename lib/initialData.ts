import { Department, EventItem, Lead, BoardMember, HeroData, Podcast } from "../types";

export const initialHero: HeroData = {
  title: "VOICE IT",
  subtitle_p1: "Feel the",
  subtitle_highlight: "rhythm.",
  description: "The Official Radio & Podcasting Club of VIT Chennai. Amplifying stories, one frequency at a time."
};

export const initialDepartments: Department[] = [
  { id: 'rj-eng', name: 'RJ English', icon: 'Mic', color: 'text-neon-orange', description: 'The English voice of the club, hosting flagship shows and interviews.' },
  { id: 'rj-tam', name: 'RJ Tamil', icon: 'Radio', color: 'text-neon-red', description: 'Bringing local flavor and energy through Tamil commentary and shows.' },
  { id: 'rj-reg', name: 'RJ Regional', icon: 'Languages', color: 'text-neon-amber', description: 'Celebrating diversity with Telugu, Malayalam, and Kannada content.' },
  { id: 'media', name: 'Camera Team', icon: 'Video', color: 'text-white', description: 'Capturing moments and producing high-quality video coverage.' },
  { id: 'edit', name: 'Editing', icon: 'Edit', color: 'text-orange-400', description: 'The wizards behind the seamless audio and video cuts.' },
  { id: 'content', name: 'Content', icon: 'PenTool', color: 'text-yellow-200', description: 'Scripting stories, planning shows, and crafting narratives.' },
  { id: 'social', name: 'Social Media', icon: 'Share2', color: 'text-red-400', description: 'Managing our digital presence and engaging the audience.' },
  { id: 'tech', name: 'Tech & Sound', icon: 'Activity', color: 'text-blue-400', description: 'Managing the live streams, equipment, and audio engineering.' },
];

export const initialEvents: EventItem[] = [
  { id: '1', title: 'Auditions 2024', year: '2024', icon: 'Mic', description: 'The hunt for the next voice of VITC. Over 500 participants showcased their talent in a grueling 3-round process.' },
  { id: '2', title: 'Vibrance Radio', year: '2023', icon: 'Music4', description: 'Live radio booth during the cultural fest, streaming non-stop for 3 days with celebrity interviews and live jams.' },
  { id: '3', title: 'Spooktober Podcast', year: '2023', icon: 'Sparkles', description: 'A horror special series released on Spotify featuring student stories and soundscapes.' },
  { id: '4', title: 'TechnoVIT Coverage', year: '2023', icon: 'Calendar', description: 'Official media partners for the tech fest, covering 50+ events and providing live updates.' },
  { id: '5', title: 'Open Mic Night', year: '2022', icon: 'Radio', description: 'Showcasing raw talent from the campus in an intimate acoustic setting at the Amphitheatre.' },
];

export const initialBoard: BoardMember[] = [
  { id: '1', name: 'Arjun Das', role: 'President', image: 'https://picsum.photos/300/300?random=10' },
  { id: '2', name: 'Sara Khan', role: 'Vice President', image: 'https://picsum.photos/300/300?random=11' },
  { id: '3', name: 'Vikram R', role: 'General Secretary', image: 'https://picsum.photos/300/300?random=12' },
  { id: '4', name: 'Priya S', role: 'Design Head', image: 'https://picsum.photos/300/300?random=13' },
];

export const initialLeads: Lead[] = [
  { id: '1', name: 'Rohan Sharma', designation: 'Head of English RJ', department: 'RJ English', image: 'https://picsum.photos/300/400?random=20' },
  { id: '2', name: 'Kavya Reddy', designation: 'Head of Events', department: 'Events', image: 'https://picsum.photos/300/400?random=21' },
  { id: '3', name: 'Siddharth M', designation: 'Technical Lead', department: 'Tech', image: 'https://picsum.photos/300/400?random=22' },
  { id: '4', name: 'Nithya V', designation: 'Content Chief', department: 'Content', image: 'https://picsum.photos/300/400?random=23' },
  { id: '5', name: 'Aditya Raj', designation: 'Video Production Head', department: 'Media', image: 'https://picsum.photos/300/400?random=24' },
  { id: '6', name: 'Meera Nair', designation: 'Social Media Manager', department: 'Social', image: 'https://picsum.photos/300/400?random=25' },
];

export const initialPodcasts: Podcast[] = [
  { id: '1', title: 'Midnight Tales Ep. 4', host: 'RJ Nithya', duration: '24m', image: 'https://picsum.photos/400/400?random=50' },
  { id: '2', title: 'Campus Life 101', host: 'RJ Sam', duration: '15m', image: 'https://picsum.photos/400/400?random=51' },
  { id: '3', title: 'Tech Talk Weekly', host: 'Tech Team', duration: '45m', image: 'https://picsum.photos/400/400?random=52' },
  { id: '4', title: 'Music Theory & Chill', host: 'RJ Karthik', duration: '32m', image: 'https://picsum.photos/400/400?random=53' },
];