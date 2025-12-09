
import { Department, EventItem, Lead, BoardMember, HeroData, Podcast, PastTenure, Testimonial, RecruitmentData, PastLeadTenure, SocialLinks, AboutData, PrivacyData } from "../types";

// PASTE YOUR BASE64 IMAGE STRING INSIDE THE QUOTES BELOW
export const LOGO_IMAGE = ""; 

export const initialHero: HeroData = {
  title: "VOICE IT",
  subtitle_p1: "Feel the",
  subtitle_highlight: "rhythm.",
  description: "The Official Radio & Podcasting Club of VIT Chennai. Amplifying stories, one frequency at a time."
};

export const initialPrivacy: PrivacyData = {
  lastUpdated: "October 24, 2024",
  content: `1. Introduction
Welcome to VoiceIt VIT Chennai. We value your privacy and are committed to protecting your personal data. This privacy policy explains how we handle information when you visit our website or interact with our club activities.

2. Information We Collect
We may collect the following types of information:
- Recruitment Data: Name, registration number, phone number, and email address when you apply for club recruitment via our forms.
- Usage Data: Information about how you use our website, including access times and pages viewed (via basic analytics).

3. How We Use Your Information
- To manage club recruitments and auditions.
- To communicate with you regarding events, workshops, and club updates.
- To improve the performance and user experience of our website.

4. Data Sharing
We do not sell, trade, or rent your personal identification information to others. Data is strictly used for internal club administration and is accessible only to the current Board Members and Faculty Coordinators of VoiceIt.

5. Third-Party Links
Our website may contain links to third-party websites (e.g., Spotify, Instagram, YouTube). We are not responsible for the privacy practices or content of these external sites.

6. Changes to This Policy
VoiceIt reserves the right to update this privacy policy at any time. We encourage users to check this page frequently for any changes.

7. Contact Us
If you have any questions about this Privacy Policy, please contact us via our social media handles or email.`
};

export const initialAbout: AboutData = {
  sectionTitle: "Who We Are",
  mainTitle: "Amplifying Voices Across Campus",
  description: "VoiceIt is the premier media body of VIT Chennai, dedicated to the art of radio, podcasting, and audio storytelling. We are a diverse community of creators who believe in the power of the spoken word.",
  features: [
    { id: '1', icon: 'Globe', title: 'Multilingual', text: 'Podcasts in Tamil, English, Telugu, Malayalam, and Kannada.' },
    { id: '2', icon: 'Users', title: 'Vibrant Community', text: 'A family of RJs, editors, writers, and designers.' },
    { id: '3', icon: 'Music', title: 'Campus Culture', text: 'Setting the vibe for every major event at VIT Chennai.' },
    { id: '4', icon: 'Mic', title: 'Professional Gear', text: 'Hands-on experience with studio-grade audio equipment.' }
  ],
  images: [
    "https://picsum.photos/400/500?random=1",
    "https://picsum.photos/400/400?random=2",
    "https://picsum.photos/400/400?random=3",
    "https://picsum.photos/400/500?random=4"
  ]
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
  { 
    id: '1', 
    title: 'Auditions 2024', 
    year: '2024', 
    icon: 'Mic', 
    description: 'The hunt for the next voice of VITC. Over 500 participants showcased their talent.',
    image: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop',
    longDescription: 'The 2024 Auditions were a massive success, marking one of our largest turnouts in history. Students from every school in VIT Chennai came forward to test their vocal mettle. The process involved three rigorous rounds: a 60-second elevator pitch, an improv round to test wit and spontaneity, and a final studio simulation where candidates managed a live console while speaking. We discovered some truly unique voices that will define the sound of the campus for the next year.'
  },
  { 
    id: '2', 
    title: 'Vibrance Radio', 
    year: '2023', 
    icon: 'Music4', 
    description: 'Live radio booth during the cultural fest, streaming non-stop for 3 days.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?q=80&w=2066&auto=format&fit=crop',
    longDescription: 'Vibrance is the heartbeat of VIT Chennai, and VoiceIt was right at the center of it. We set up a glass-walled live radio booth in the middle of the food street. For 72 hours, our RJs kept the energy high with track requests, live dedications, and impromptu interviews with guest artists and celebrities. The "Vibrance After Hours" segment became an instant hit, featuring acoustic jams and ghost stories that gathered a massive crowd around the booth.'
  },
  { 
    id: '3', 
    title: 'Spooktober Podcast', 
    year: '2023', 
    icon: 'Sparkles', 
    description: 'A horror special series released on Spotify featuring student stories.',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2037&auto=format&fit=crop',
    longDescription: 'Our Spooktober special pushed the boundaries of audio storytelling. We crowdsourced real paranormal experiences from students living in the hostels and turned them into a highly produced audio drama. The sound design team used binaural audio techniques to create an immersive 3D soundscape. Listening with headphones was mandatory—and terrifying. The series topped the campus charts for 3 weeks straight.'
  },
  { 
    id: '4', 
    title: 'TechnoVIT Coverage', 
    year: '2023', 
    icon: 'Calendar', 
    description: 'Official media partners for the tech fest, covering 50+ events.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
    longDescription: 'As the official media partners for TechnoVIT, our camera and reporting teams were everywhere. We produced daily recap reels that were edited and uploaded within 2 hours of the events concluding. Our "Tech Talk" corner featured quick-fire interviews with hackathon winners and guest speakers from the industry, bridging the gap between technical jargon and entertainment.'
  },
  { 
    id: '5', 
    title: 'Open Mic Night', 
    year: '2022', 
    icon: 'Radio', 
    description: 'Showcasing raw talent from the campus in an intimate acoustic setting.',
    image: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?q=80&w=2072&auto=format&fit=crop',
    longDescription: 'Held at the Amphitheatre under the stars, Open Mic Night 2022 was a celebration of vulnerability and art. We provided the stage, the mic, and the vibe; the students provided the magic. From poetry and stand-up comedy to beatboxing and classical singing, the variety was astounding. It was a reminder that VoiceIt isn\'t just about us talking—it\'s about giving everyone a platform to be heard.'
  },
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
  linkedin: 'https://linkedin.com',
};