import { Department, EventItem, Lead, BoardMember, HeroData, Podcast, PastTenure, Testimonial, RecruitmentData, PastLeadTenure, SocialLinks } from "../types";

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
  { 
      id: '1', 
      name: 'Rohan Sharma', 
      designation: 'Head of English RJ', 
      department: 'RJ English', 
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&q=80',
      quote: "Leading the voice of the campus involves curating shows that resonate with every student's heartbeat."
  },
  { 
      id: '2', 
      name: 'Kavya Reddy', 
      designation: 'Head of Events', 
      department: 'Events', 
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&q=80',
      quote: "Every event is a story waiting to unfold. We ensure the stage is set for magic to happen."
  },
  { 
      id: '3', 
      name: 'Siddharth M', 
      designation: 'Technical Lead', 
      department: 'Tech', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&q=80',
      quote: "Behind every seamless broadcast is a complex web of cables and code that we manage with pride."
  },
  { 
      id: '4', 
      name: 'Nithya V', 
      designation: 'Content Chief', 
      department: 'Content', 
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&q=80',
      quote: "Words have power. Our team crafts narratives that inspire, inform, and entertain."
  },
  { 
      id: '5', 
      name: 'Meera Nair', 
      designation: 'Social Media Manager', 
      department: 'Social', 
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&q=80',
      quote: "Connecting the digital world with our on-ground energy, one post at a time."
  },
];

export const initialPodcasts: Podcast[] = [
  { id: '1', title: 'Midnight Tales Ep. 4', host: 'RJ Nithya', duration: '24m', image: 'https://picsum.photos/400/400?random=50' },
  { id: '2', title: 'Campus Life 101', host: 'RJ Sam', duration: '15m', image: 'https://picsum.photos/400/400?random=51' },
  { id: '3', title: 'Tech Talk Weekly', host: 'Tech Team', duration: '45m', image: 'https://picsum.photos/400/400?random=52' },
  { id: '4', title: 'Music Theory & Chill', host: 'RJ Karthik', duration: '32m', image: 'https://picsum.photos/400/400?random=53' },
];

export const initialPastTenures: PastTenure[] = [
  {
    id: '1',
    year: '2023-24',
    members: [
      { id: 'p1', name: 'Rahul V', role: 'President', image: 'https://picsum.photos/300/300?random=60' },
      { id: 'p2', name: 'Sneha M', role: 'Vice President', image: 'https://picsum.photos/300/300?random=61' },
      { id: 'p3', name: 'Amit K', role: 'General Secretary', image: 'https://picsum.photos/300/300?random=62' },
    ]
  },
  {
    id: '2',
    year: '2022-23',
    members: [
      { id: 'p4', name: 'Karthik S', role: 'President', image: 'https://picsum.photos/300/300?random=63' },
      { id: 'p5', name: 'Pooja R', role: 'Vice President', image: 'https://picsum.photos/300/300?random=64' },
    ]
  }
];

export const initialPastLeadTenures: PastLeadTenure[] = [];

export const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: "VoiceIt taught me that my voice matters. From a shy fresher to hosting the university's biggest fest, the journey was surreal.",
    name: "Ananya Gupta",
    designation: "Alumni, Batch of 2023",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
  },
  {
    id: '2',
    quote: "The technical team here is on another level. I learned more about audio engineering in 6 months here than I did in 2 years online.",
    name: "David Chen",
    designation: "Tech Lead, 2022",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3560&auto=format&fit=crop",
  },
  {
    id: '3',
    quote: "Joining VoiceIt was the best decision of my college life. It's not just a club, it's a family that pushes you to be your best creative self.",
    name: "James Watson",
    designation: "RJ English",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3560&auto=format&fit=crop",
  },
  {
    id: '4',
    quote: "The exposure you get here is unmatched. Interviewing celebrities and managing live crowds gave me skills I use in my corporate job today.",
    name: "Emily Davis",
    designation: "Former President",
    src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop",
  },
];

export const initialRecruitment: RecruitmentData = {
  isOpen: false,
  link: ""
};

export const initialSocialLinks: SocialLinks = {
  instagram: 'https://www.instagram.com/voiceit_vitcc/',
  youtube: 'https://youtube.com',
  spotify: 'https://spotify.com',
  email: 'mailto:contact@voiceit.com'
};