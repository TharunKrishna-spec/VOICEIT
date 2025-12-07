import React, { createContext, useContext, useState, useEffect } from 'react';
import { HeroData, Department, EventItem, BoardMember, Lead, Podcast } from '../types';
import { initialHero, initialDepartments, initialEvents, initialBoard, initialLeads, initialPodcasts } from '../lib/initialData';

interface User {
  uid: string;
  email: string | null;
}

interface AdminContextType {
  user: User | null;
  loading: boolean;
  heroData: HeroData;
  departments: Department[];
  events: EventItem[];
  boardMembers: BoardMember[];
  leads: Lead[];
  podcasts: Podcast[];
  isLoginOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateHero: (data: Partial<HeroData>) => Promise<void>;
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
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(initialBoard);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [podcasts, setPodcasts] = useState<Podcast[]>(initialPodcasts);

  // Load from LocalStorage on mount
  useEffect(() => {
    const loadData = () => {
      const storedHero = localStorage.getItem('voiceit_hero');
      if (storedHero) setHeroData(JSON.parse(storedHero));

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

  return (
    <AdminContext.Provider value={{
      user, loading, heroData, departments, events, boardMembers, leads, podcasts,
      isLoginOpen, openLoginModal: () => setIsLoginOpen(true), closeLoginModal: () => setIsLoginOpen(false),
      login, logout,
      updateHero, updateDepartment,
      addEvent, updateEvent, deleteEvent,
      addBoardMember, deleteBoardMember,
      addLead, deleteLead,
      addPodcast, deletePodcast
    }}>
      {children}
    </AdminContext.Provider>
  );
};