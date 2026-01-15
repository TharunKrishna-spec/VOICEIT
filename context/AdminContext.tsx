
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { HeroData, Department, EventItem, BoardMember, Lead, Podcast, PastTenure, PastLeadTenure, Testimonial, RecruitmentData, SocialLinks, AboutData, SiteConfig, Memory, MerchItem } from '../types';
import { initialHero, initialDepartments, initialEvents, initialBoard, initialLeads, initialPodcasts, initialPastTenures, initialPastLeadTenures, initialTestimonials, initialRecruitment, initialSocialLinks, initialAbout, initialSiteConfig, initialMemories, initialMerch } from '../lib/initialData';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, setDoc, deleteDoc, updateDoc, onSnapshot, addDoc, getDocs, query, limit } from 'firebase/firestore';

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
  merch: MerchItem[];
  pastTenures: PastTenure[];
  pastLeadTenures: PastLeadTenure[];
  testimonials: Testimonial[];
  memories: Memory[];
  recruitment: RecruitmentData;
  socialLinks: SocialLinks;
  siteConfig: SiteConfig;
  isLoginOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  syncDatabase: () => Promise<void>;
  updateHero: (data: Partial<HeroData>) => Promise<void>;
  updateAbout: (data: AboutData) => Promise<void>;
  updateDepartment: (id: string, data: Partial<Department>) => Promise<void>;
  addEvent: (event: Omit<EventItem, 'id'>) => Promise<void>;
  updateEvent: (id: string, data: Partial<EventItem>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  addBoardMember: (member: Omit<BoardMember, 'id'>) => Promise<void>;
  updateBoardMember: (id: string, data: Partial<BoardMember>) => Promise<void>;
  deleteBoardMember: (id: string) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id'>) => Promise<void>;
  updateLead: (id: string, data: Partial<Lead>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  addPodcast: (podcast: Omit<Podcast, 'id'>) => Promise<void>;
  updatePodcast: (id: string, data: Partial<Podcast>) => Promise<void>;
  deletePodcast: (id: string) => Promise<void>;
  addMerch: (item: Omit<MerchItem, 'id'>) => Promise<void>;
  updateMerch: (id: string, data: Partial<MerchItem>) => Promise<void>;
  deleteMerch: (id: string) => Promise<void>;
  archiveBoard: (year: string) => Promise<void>;
  deletePastTenure: (id: string) => Promise<void>;
  archiveLeads: (year: string) => Promise<void>;
  deletePastLeadTenure: (id: string) => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => Promise<void>;
  updateTestimonial: (id: string, data: Partial<Testimonial>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
  addMemory: (memory: Omit<Memory, 'id'>) => Promise<void>;
  updateMemory: (id: string, data: Partial<Memory>) => Promise<void>;
  deleteMemory: (id: string) => Promise<void>;
  updateRecruitment: (data: RecruitmentData) => Promise<void>;
  updateSocialLinks: (data: SocialLinks) => Promise<void>;
  updateSiteConfig: (data: Partial<SiteConfig>) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};

const sanitize = <T,>(data: T): T => {
    return JSON.parse(JSON.stringify(data));
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [heroData, setHeroData] = useState<HeroData>(initialHero);
  const [aboutData, setAboutData] = useState<AboutData>(initialAbout);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(initialBoard);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [podcasts, setPodcasts] = useState<Podcast[]>(initialPodcasts);
  const [merch, setMerch] = useState<MerchItem[]>(initialMerch);
  const [pastTenures, setPastTenures] = useState<PastTenure[]>(initialPastTenures);
  const [pastLeadTenures, setPastLeadTenures] = useState<PastLeadTenure[]>(initialPastLeadTenures);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [memories, setMemories] = useState<Memory[]>(initialMemories);
  const [recruitment, setRecruitment] = useState<RecruitmentData>(initialRecruitment);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(initialSocialLinks);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(initialSiteConfig);

  const syncDatabase = useCallback(async () => {
    const seedCollection = async (name: string, data: any, isSingletonDoc: boolean = false) => {
        try {
            if (isSingletonDoc) {
                const s = await getDocs(query(collection(db, 'content'), limit(100))); 
                if (!s.docs.find(d => d.id === name)) {
                    await setDoc(doc(db, 'content', name), sanitize(data));
                }
            } else {
                const snap = await getDocs(query(collection(db, name), limit(1)));
                if (snap.empty) {
                    for (const item of (data as any[])) {
                        const { id, ...clean } = item;
                        if (id) await setDoc(doc(db, name, id), sanitize(clean));
                        else await addDoc(collection(db, name), sanitize(clean));
                    }
                }
            }
        } catch (e: any) { 
            console.error(`[Firestore] Sync failed for ${name}:`, e.message); 
        }
    };

    await seedCollection('hero', initialHero, true);
    await seedCollection('about', initialAbout, true);
    await seedCollection('recruitment', initialRecruitment, true);
    await seedCollection('social', initialSocialLinks, true);
    await seedCollection('config', initialSiteConfig, true);
    await seedCollection('departments', initialDepartments);
    await seedCollection('events', initialEvents);
    await seedCollection('boardMembers', initialBoard);
    await seedCollection('leads', initialLeads);
    await seedCollection('podcasts', initialPodcasts);
    await seedCollection('merch', initialMerch);
    await seedCollection('testimonials', initialTestimonials);
    await seedCollection('memories', initialMemories);
    await seedCollection('pastTenures', initialPastTenures);
    await seedCollection('pastLeadTenures', initialPastLeadTenures);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? { uid: currentUser.uid, email: currentUser.email } : null);
      setLoading(false);
      if (currentUser) syncDatabase();
    });
    return () => unsubscribe();
  }, [syncDatabase]);

  useEffect(() => {
    const logError = (name: string) => (err: any) => {
        if (err.code === 'permission-denied') console.warn(`[Firestore] Access denied for "${name}". Fallback active.`);
    };

    const unsubs = [
        onSnapshot(doc(db, 'content', 'hero'), s => s.exists() && setHeroData(s.data() as HeroData), logError('hero')),
        onSnapshot(doc(db, 'content', 'about'), s => s.exists() && setAboutData(s.data() as AboutData), logError('about')),
        onSnapshot(doc(db, 'content', 'recruitment'), s => s.exists() && setRecruitment(s.data() as RecruitmentData), logError('recruitment')),
        onSnapshot(doc(db, 'content', 'social'), s => s.exists() && setSocialLinks(s.data() as SocialLinks), logError('social')),
        onSnapshot(doc(db, 'content', 'config'), s => s.exists() && setSiteConfig(s.data() as SiteConfig), logError('config')),
        
        onSnapshot(collection(db, 'departments'), s => {
            setDepartments(s.docs.map(d => ({...d.data(), id: d.id} as Department)));
        }, logError('departments')),
        onSnapshot(collection(db, 'events'), s => {
            setEvents(s.docs.map(d => ({...d.data(), id: d.id} as EventItem)));
        }, logError('events')),
        onSnapshot(collection(db, 'boardMembers'), s => {
            setBoardMembers(s.docs.map(d => ({...d.data(), id: d.id} as BoardMember)));
        }, logError('boardMembers')),
        onSnapshot(collection(db, 'leads'), s => { 
            setLeads(s.docs.map(d => ({...d.data(), id: d.id} as Lead)));
        }, logError('leads')),
        onSnapshot(collection(db, 'podcasts'), s => {
            setPodcasts(s.docs.map(d => ({...d.data(), id: d.id} as Podcast)));
        }, logError('podcasts')),
        onSnapshot(collection(db, 'merch'), s => {
            setMerch(s.docs.map(d => ({...d.data(), id: d.id} as MerchItem)));
        }, logError('merch')),
        onSnapshot(collection(db, 'pastTenures'), s => {
            setPastTenures(s.docs.map(d => ({...d.data(), id: d.id} as PastTenure)));
        }, logError('pastTenures')),
        onSnapshot(collection(db, 'pastLeadTenures'), s => {
            setPastLeadTenures(s.docs.map(d => ({...d.data(), id: d.id} as PastLeadTenure)));
        }, logError('pastLeadTenures')),
        onSnapshot(collection(db, 'testimonials'), s => {
            setTestimonials(s.docs.map(d => ({...d.data(), id: d.id} as Testimonial)));
        }, logError('testimonials')),
        onSnapshot(collection(db, 'memories'), s => {
            setMemories(s.docs.map(d => ({...d.data(), id: d.id} as Memory)));
        }, logError('memories'))
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  const login = async (e: string, p: string) => {
    try { 
        await signInWithEmailAndPassword(auth, e, p); 
        return true; 
    } catch (err) { return false; }
  };

  const logout = () => signOut(auth);

  const updateHero = async (data: Partial<HeroData>) => {
    await setDoc(doc(db, 'content', 'hero'), sanitize({ ...heroData, ...data }));
  };

  const updateAbout = async (data: AboutData) => {
    await setDoc(doc(db, 'content', 'about'), sanitize(data));
  };

  const updateDepartment = async (id: string, data: Partial<Department>) => {
    const { id: _, ...payload } = data;
    await updateDoc(doc(db, 'departments', id), sanitize(payload));
  };

  const addEvent = async (event: Omit<EventItem, 'id'>) => {
    await addDoc(collection(db, 'events'), sanitize(event));
  };

  const updateEvent = async (id: string, data: Partial<EventItem>) => {
    const { id: _, ...payload } = data;
    await updateDoc(doc(db, 'events', id), sanitize(payload));
  };

  const deleteEvent = (id: string) => deleteDoc(doc(db, 'events', id));

  const addBoardMember = async (member: Omit<BoardMember, 'id'>) => {
    await addDoc(collection(db, 'boardMembers'), sanitize(member));
  };

  const updateBoardMember = async (id: string, data: Partial<BoardMember>) => {
    const { id: _, ...payload } = data;
    await updateDoc(doc(db, 'boardMembers', id), sanitize(payload));
  };

  const deleteBoardMember = (id: string) => deleteDoc(doc(db, 'boardMembers', id));

  const addLead = async (lead: Omit<Lead, 'id'>) => {
    await addDoc(collection(db, 'leads'), sanitize(lead));
  };

  const updateLead = async (id: string, data: Partial<Lead>) => {
    const { id: _, ...payload } = data;
    await updateDoc(doc(db, 'leads', id), sanitize(payload));
  };

  const deleteLead = (id: string) => deleteDoc(doc(db, 'leads', id));

  const addPodcast = async (podcast: Omit<Podcast, 'id'>) => {
    await addDoc(collection(db, 'podcasts'), sanitize(podcast));
  };

  const updatePodcast = async (id: string, data: Partial<Podcast>) => {
    const { id: _, ...payload } = data;
    await updateDoc(doc(db, 'podcasts', id), sanitize(payload));
  };

  const deletePodcast = (id: string) => deleteDoc(doc(db, 'podcasts', id));

  const addMerch = async (item: Omit<MerchItem, 'id'>) => {
    await addDoc(collection(db, 'merch'), sanitize(item));
  };

  const updateMerch = async (id: string, data: Partial<MerchItem>) => {
    const { id: _, ...payload } = data;
    await updateDoc(doc(db, 'merch', id), sanitize(payload));
  };

  const deleteMerch = async (id: string) => {
    try {
        const docRef = doc(db, 'merch', id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Firestore: Error deleting merch item:", error);
        throw error;
    }
  };

  const archiveBoard = async (year: string) => {
    await addDoc(collection(db, 'pastTenures'), { year, members: sanitize(boardMembers) });
  };

  const deletePastTenure = (id: string) => deleteDoc(doc(db, 'pastTenures', id));

  const archiveLeads = async (year: string) => {
    await addDoc(collection(db, 'pastLeadTenures'), { year, leads: sanitize(leads) });
  };

  const deletePastLeadTenure = (id: string) => deleteDoc(doc(db, 'pastLeadTenures', id));

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    await addDoc(collection(db, 'testimonials'), sanitize(testimonial));
  };

  const updateTestimonial = async (id: string, data: Partial<Testimonial>) => {
    const { id: _, ...payload } = data;
    await updateDoc(doc(db, 'testimonials', id), sanitize(payload));
  };

  const deleteTestimonial = (id: string) => deleteDoc(doc(db, 'testimonials', id));

  const addMemory = async (memory: Omit<Memory, 'id'>) => {
    await addDoc(collection(db, 'memories'), sanitize(memory));
  };

  const updateMemory = async (id: string, data: Partial<Memory>) => {
    const { id: _, ...payload } = data;
    await updateDoc(doc(db, 'memories', id), sanitize(payload));
  };

  const deleteMemory = (id: string) => deleteDoc(doc(db, 'memories', id));

  const updateRecruitment = async (data: RecruitmentData) => {
    await setDoc(doc(db, 'content', 'recruitment'), sanitize(data));
  };

  const updateSocialLinks = async (data: SocialLinks) => {
    await setDoc(doc(db, 'content', 'social'), sanitize(data));
  };

  const updateSiteConfig = async (data: Partial<SiteConfig>) => {
    await setDoc(doc(db, 'content', 'config'), sanitize({ ...siteConfig, ...data }));
  };

  return (
    <AdminContext.Provider value={{
      user, loading, heroData, aboutData, departments, events, boardMembers, leads, podcasts, merch, pastTenures, pastLeadTenures, testimonials, memories, recruitment, socialLinks, siteConfig,
      isLoginOpen, openLoginModal: () => setIsLoginOpen(true), closeLoginModal: () => setIsLoginOpen(false),
      login, logout, syncDatabase,
      updateHero, updateAbout, updateDepartment,
      addEvent, updateEvent, deleteEvent,
      addBoardMember, updateBoardMember, deleteBoardMember,
      addLead, updateLead, deleteLead,
      addPodcast, updatePodcast, deletePodcast,
      addMerch, updateMerch, deleteMerch,
      archiveBoard, deletePastTenure,
      archiveLeads, deletePastLeadTenure,
      addTestimonial, updateTestimonial, deleteTestimonial,
      addMemory, updateMemory, deleteMemory,
      updateRecruitment, updateSocialLinks, updateSiteConfig
    }}>
      {children}
    </AdminContext.Provider>
  );
};
