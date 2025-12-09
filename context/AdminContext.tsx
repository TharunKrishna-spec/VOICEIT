
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HeroData, Department, EventItem, BoardMember, Lead, Podcast, PastTenure, PastLeadTenure, Testimonial, RecruitmentData, SocialLinks, AboutData } from '../types';
import { initialHero, initialDepartments, initialEvents, initialBoard, initialLeads, initialPodcasts, initialPastTenures, initialPastLeadTenures, initialTestimonials, initialRecruitment, initialSocialLinks, initialAbout } from '../lib/initialData';

interface User {
  uid: string;
  email: string | null;
}

interface AdminContextType {
  user: User | null;
  loading: boolean;
  heroData: HeroData;
  aboutData: AboutData;
  departments: Department[];
  events: EventItem[];
  boardMembers: BoardMember[];
  leads: Lead[];
  podcasts: Podcast[];
  pastTenures: PastTenure[];
  pastLeadTenures: PastLeadTenure[];
  testimonials: Testimonial[];
  recruitment: RecruitmentData;
  socialLinks: SocialLinks;
  isLoginOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateHero: (data: Partial<HeroData>) => Promise<void>;
  updateAbout: (data: AboutData) => Promise<void>;
  updateDepartment: (id: string, data: Partial<Department>) => Promise<void>;
  addEvent: (event: Omit<EventItem, 'id'>) => Promise<void>;
  updateEvent: (id: string, data: Partial<EventItem>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addBoardMember: (member: Omit<BoardMember, 'id'>) => Promise<void>;
  deleteBoardMember: (id: string) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id'>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  addPodcast: (podcast: Omit<Podcast, 'id'>) => Promise<void>;
  deletePodcast: (id: string) => Promise<void>;
  archiveBoard: (year: string) => Promise<void>;
  deletePastTenure: (id: string) => Promise<void>;
  archiveLeads: (year: string) => Promise<void>;
  deletePastLeadTenure: (id: string) => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  updateRecruitment: (data: RecruitmentData) => Promise<void>;
  updateSocialLinks: (data: SocialLinks) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Data States
  const [heroData, setHeroData] = useState<HeroData>(initialHero);
  const [aboutData, setAboutData] = useState<AboutData>(initialAbout);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(initialBoard);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [podcasts, setPodcasts] = useState<Podcast[]>(initialPodcasts);
  const [pastTenures, setPastTenures] = useState<PastTenure[]>(initialPastTenures);
  const [pastLeadTenures, setPastLeadTenures] = useState<PastLeadTenure[]>(initialPastLeadTenures);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [recruitment, setRecruitment] = useState<RecruitmentData>(initialRecruitment);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(initialSocialLinks);

  // Load from LocalStorage on mount
  useEffect(() => {
    const loadData = () => {
      const storedHero = localStorage.getItem('voiceit_hero');
      if (storedHero) setHeroData(JSON.parse(storedHero));

      const storedAbout = localStorage.getItem('voiceit_about');
      if (storedAbout) setAboutData(JSON.parse(storedAbout));

      const storedDepts = localStorage.getItem('voiceit_departments');
      if (storedDepts) setDepartments(JSON.parse(storedDepts));

      const storedEvents = localStorage.getItem('voiceit_events');
      if (storedEvents) setEvents(JSON.parse(storedEvents));

      const storedBoard = localStorage.getItem('voiceit_board');
      if (storedBoard) setBoardMembers(JSON.parse(storedBoard));

      const storedLeads = localStorage.getItem('voiceit_leads');
      if (storedLeads) setLeads(JSON.parse(storedLeads));
      
      const storedPodcasts = localStorage.getItem('voiceit_podcasts');
      if (storedPodcasts) setPodcasts(JSON.parse(storedPodcasts));

      const storedPastTenures = localStorage.getItem('voiceit_past_tenures');
      if (storedPastTenures) setPastTenures(JSON.parse(storedPastTenures));

      const storedPastLeadTenures = localStorage.getItem('voiceit_past_lead_tenures');
      if (storedPastLeadTenures) setPastLeadTenures(JSON.parse(storedPastLeadTenures));
      
      const storedTestimonials = localStorage.getItem('voiceit_testimonials');
      if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));

      const storedRecruitment = localStorage.getItem('voiceit_recruitment');
      if (storedRecruitment) setRecruitment(JSON.parse(storedRecruitment));
      
      const storedSocial = localStorage.getItem('voiceit_social');
      if (storedSocial) setSocialLinks(JSON.parse(storedSocial));

      const storedUser = localStorage.getItem('voiceit_user');
      if (storedUser) setUser(JSON.parse(storedUser));

      setLoading(false);
    };
    loadData();
  }, []);

  // Helper to save to state and localStorage
  const save = (key: string, data: any, setter: React.Dispatch<any>) => {
    setter(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  // --- AUTH ---

  const login = async (email: string, pass: string) => {
    // Mock Login
    if (email === 'admin@voiceit.com' && pass === 'admin') {
      const u = { uid: 'admin-123', email };
      save('voiceit_user', u, setUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('voiceit_user');
    setIsLoginOpen(false);
  };

  // --- ACTIONS ---

  const updateHero = async (data: Partial<HeroData>) => {
    const newData = { ...heroData, ...data };
    save('voiceit_hero', newData, setHeroData);
  };

  const updateAbout = async (data: AboutData) => {
    save('voiceit_about', data, setAboutData);
  };

  const updateDepartment = async (id: string, data: Partial<Department>) => {
    const newData = departments.map(d => d.id === id ? { ...d, ...data } : d);
    save('voiceit_departments', newData, setDepartments);
  };

  const addEvent = async (event: Omit<EventItem, 'id'>) => {
    const newItem = { ...event, id: Date.now().toString() };
    const newData = [...events, newItem];
    save('voiceit_events', newData, setEvents);
  };

  const updateEvent = async (id: string, data: Partial<EventItem>) => {
    const newData = events.map(e => e.id === id ? { ...e, ...data } : e);
    save('voiceit_events', newData, setEvents);
  };

  const deleteEvent = async (id: string) => {
    const newData = events.filter(e => e.id !== id);
    save('voiceit_events', newData, setEvents);
  };

  const addBoardMember = async (member: Omit<BoardMember, 'id'>) => {
    const newItem = { ...member, id: Date.now().toString() };
    const newData = [...boardMembers, newItem];
    save('voiceit_board', newData, setBoardMembers);
  };

  const deleteBoardMember = async (id: string) => {
    const newData = boardMembers.filter(m => m.id !== id);
    save('voiceit_board', newData, setBoardMembers);
  };

  const addLead = async (lead: Omit<Lead, 'id'>) => {
    const newItem = { ...lead, id: Date.now().toString() };
    const newData = [...leads, newItem];
    save('voiceit_leads', newData, setLeads);
  };

  const deleteLead = async (id: string) => {
    const newData = leads.filter(l => l.id !== id);
    save('voiceit_leads', newData, setLeads);
  };

  const addPodcast = async (podcast: Omit<Podcast, 'id'>) => {
    const newItem = { ...podcast, id: Date.now().toString() };
    const newData = [...podcasts, newItem];
    save('voiceit_podcasts', newData, setPodcasts);
  };

  const deletePodcast = async (id: string) => {
    const newData = podcasts.filter(p => p.id !== id);
    save('voiceit_podcasts', newData, setPodcasts);
  };

  const archiveBoard = async (year: string) => {
    const newTenure: PastTenure = {
        id: Date.now().toString(),
        year: year,
        members: [...boardMembers]
    };
    const newData = [newTenure, ...pastTenures];
    save('voiceit_past_tenures', newData, setPastTenures);
  };

  const deletePastTenure = async (id: string) => {
    const newData = pastTenures.filter(t => t.id !== id);
    save('voiceit_past_tenures', newData, setPastTenures);
  };

  const archiveLeads = async (year: string) => {
    const newTenure: PastLeadTenure = {
        id: Date.now().toString(),
        year: year,
        leads: [...leads]
    };
    const newData = [newTenure, ...pastLeadTenures];
    save('voiceit_past_lead_tenures', newData, setPastLeadTenures);
  };

  const deletePastLeadTenure = async (id: string) => {
    const newData = pastLeadTenures.filter(t => t.id !== id);
    save('voiceit_past_lead_tenures', newData, setPastLeadTenures);
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    const newItem = { ...testimonial, id: Date.now().toString() };
    const newData = [...testimonials, newItem];
    save('voiceit_testimonials', newData, setTestimonials);
  };

  const deleteTestimonial = async (id: string) => {
    const newData = testimonials.filter(t => t.id !== id);
    save('voiceit_testimonials', newData, setTestimonials);
  };

  const updateRecruitment = async (data: RecruitmentData) => {
    save('voiceit_recruitment', data, setRecruitment);
  };

  const updateSocialLinks = async (data: SocialLinks) => {
    save('voiceit_social', data, setSocialLinks);
  };

  return (
    <AdminContext.Provider value={{
      user, loading, heroData, aboutData, departments, events, boardMembers, leads, podcasts, pastTenures, pastLeadTenures, testimonials, recruitment, socialLinks,
      isLoginOpen, openLoginModal: () => setIsLoginOpen(true), closeLoginModal: () => setIsLoginOpen(false),
      login, logout,
      updateHero, updateAbout, updateDepartment,
      addEvent, updateEvent, deleteEvent,
      addBoardMember, deleteBoardMember,
      addLead, deleteLead,
      addPodcast, deletePodcast,
      archiveBoard, deletePastTenure,
      archiveLeads, deletePastLeadTenure,
      addTestimonial, deleteTestimonial,
      updateRecruitment, updateSocialLinks
    }}>
      {children}
    </AdminContext.Provider>
  );
};
