
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { HeroData, Department, EventItem, BoardMember, Lead, Podcast, PastTenure, PastLeadTenure, Testimonial, RecruitmentData, SocialLinks, AboutData, SiteConfig } from '../types';
import { initialHero, initialDepartments, initialEvents, initialBoard, initialLeads, initialPodcasts, initialPastTenures, initialPastLeadTenures, initialTestimonials, initialRecruitment, initialSocialLinks, initialAbout, initialSiteConfig } from '../lib/initialData';
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
  pastTenures: PastTenure[];
  pastLeadTenures: PastLeadTenure[];
  testimonials: Testimonial[];
  recruitment: RecruitmentData;
  socialLinks: SocialLinks;
  siteConfig: SiteConfig;
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
  updatePodcast: (id: string, data: Partial<Podcast>) => Promise<void>;
  deletePodcast: (id: string) => Promise<void>;
  archiveBoard: (year: string) => Promise<void>;
  deletePastTenure: (id: string) => Promise<void>;
  archiveLeads: (year: string) => Promise<void>;
  deletePastLeadTenure: (id: string) => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;
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

// Helper to ensure data is a plain object without circular references or Firestore-internal types
const sanitize = <T,>(data: T): T => {
    return JSON.parse(JSON.stringify(data));
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // States initialized with local data
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
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(initialSiteConfig);

  // --- 1. AUTH ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? { uid: currentUser.uid, email: currentUser.email } : null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- 2. SEEDING (One-time check) ---
  useEffect(() => {
    const seedIfNeeded = async () => {
        try {
            const checkRef = collection(db, 'departments');
            const snap = await getDocs(query(checkRef, limit(1)));
            
            if (snap.empty) {
                console.log("Database empty. Seeding initial data...");
                // Seed content docs
                await setDoc(doc(db, 'content', 'hero'), sanitize(initialHero));
                await setDoc(doc(db, 'content', 'about'), sanitize(initialAbout));
                await setDoc(doc(db, 'content', 'recruitment'), sanitize(initialRecruitment));
                await setDoc(doc(db, 'content', 'social'), sanitize(initialSocialLinks));
                await setDoc(doc(db, 'content', 'config'), sanitize(initialSiteConfig));
                
                // Seed collections
                const seedCol = async (name: string, data: any[]) => {
                    for (const item of data) {
                        const { id, ...clean } = item;
                        if (id) await setDoc(doc(db, name, id), sanitize(clean));
                        else await addDoc(collection(db, name), sanitize(clean));
                    }
                };

                await seedCol('departments', initialDepartments);
                await seedCol('events', initialEvents);
                await seedCol('boardMembers', initialBoard);
                await seedCol('leads', initialLeads);
                await seedCol('podcasts', initialPodcasts);
                await seedCol('testimonials', initialTestimonials);
            }
        } catch (error: any) {
            // Silently fail seeding if permission denied - the user might not be an admin
            if (error.code === 'permission-denied') {
                console.debug("Seeding skipped: Missing permissions. This is normal for guest users.");
            } else {
                console.error("Seeding error:", error);
            }
        }
    };
    seedIfNeeded();
  }, []);

  // --- 3. LISTENERS ---
  useEffect(() => {
    const logError = (name: string) => (err: any) => {
        if (err.code === 'permission-denied') {
            console.warn(`Firestore permission denied for "${name}". Falling back to local initial data.`);
        } else {
            console.error(`Firestore error in "${name}":`, err);
        }
    };

    const unsubs = [
        onSnapshot(doc(db, 'content', 'hero'), s => s.exists() && setHeroData(s.data() as HeroData), logError('hero')),
        onSnapshot(doc(db, 'content', 'about'), s => s.exists() && setAboutData(s.data() as AboutData), logError('about')),
        onSnapshot(doc(db, 'content', 'recruitment'), s => s.exists() && setRecruitment(s.data() as RecruitmentData), logError('recruitment')),
        onSnapshot(doc(db, 'content', 'social'), s => s.exists() && setSocialLinks(s.data() as SocialLinks), logError('social')),
        onSnapshot(doc(db, 'content', 'config'), s => s.exists() && setSiteConfig(s.data() as SiteConfig), logError('config')),
        
        onSnapshot(collection(db, 'departments'), s => {
            const data = s.docs.map(d => ({...d.data(), id: d.id} as Department));
            if (data.length > 0) setDepartments(data);
        }, logError('departments')),
        
        onSnapshot(collection(db, 'events'), s => {
            const data = s.docs.map(d => ({...d.data(), id: d.id} as EventItem));
            if (data.length > 0) setEvents(data);
        }, logError('events')),
        
        onSnapshot(collection(db, 'boardMembers'), s => {
            const data = s.docs.map(d => ({...d.data(), id: d.id} as BoardMember));
            if (data.length > 0) setBoardMembers(data);
        }, logError('boardMembers')),
        
        onSnapshot(collection(db, 'leads'), s => {
            const data = s.docs.map(d => ({...d.data(), id: d.id} as Lead));
            if (data.length > 0) setLeads(data);
        }, logError('leads')),
        
        onSnapshot(collection(db, 'podcasts'), s => {
            const data = s.docs.map(d => ({...d.data(), id: d.id} as Podcast));
            if (data.length > 0) setPodcasts(data);
        }, logError('podcasts')),
        
        onSnapshot(collection(db, 'pastTenures'), s => {
            const data = s.docs.map(d => ({...d.data(), id: d.id} as PastTenure));
            if (data.length > 0) setPastTenures(data);
        }, logError('pastTenures')),
        
        onSnapshot(collection(db, 'pastLeadTenures'), s => {
            const data = s.docs.map(d => ({...d.data(), id: d.id} as PastLeadTenure));
            if (data.length > 0) setPastLeadTenures(data);
        }, logError('pastLeadTenures')),
        
        onSnapshot(collection(db, 'testimonials'), s => {
            const data = s.docs.map(d => ({...d.data(), id: d.id} as Testimonial));
            if (data.length > 0) setTestimonials(data);
        }, logError('testimonials'))
    ];
    return () => unsubs.forEach(u => u());
  }, []);

  // --- 4. ACTIONS ---
  const login = async (e: string, p: string) => {
    try { 
        await signInWithEmailAndPassword(auth, e, p); 
        return true; 
    } catch (err) { 
        console.error("Login attempt failed:", err); 
        return false; 
    }
  };

  const logout = () => signOut(auth);

  const updateHero = async (data: Partial<HeroData>) => {
    const next = sanitize({ ...heroData, ...data });
    await setDoc(doc(db, 'content', 'hero'), next);
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

  const deleteBoardMember = (id: string) => deleteDoc(doc(db, 'boardMembers', id));

  const addLead = async (lead: Omit<Lead, 'id'>) => {
    await addDoc(collection(db, 'leads'), sanitize(lead));
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

  const archiveBoard = async (year: string) => {
    const members = sanitize(boardMembers);
    await addDoc(collection(db, 'pastTenures'), { year, members });
  };

  const deletePastTenure = (id: string) => deleteDoc(doc(db, 'pastTenures', id));

  const archiveLeads = async (year: string) => {
    const leadData = sanitize(leads);
    await addDoc(collection(db, 'pastLeadTenures'), { year, leads: leadData });
  };

  const deletePastLeadTenure = (id: string) => deleteDoc(doc(db, 'pastLeadTenures', id));

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    await addDoc(collection(db, 'testimonials'), sanitize(testimonial));
  };

  const deleteTestimonial = (id: string) => deleteDoc(doc(db, 'testimonials', id));

  const updateRecruitment = async (data: RecruitmentData) => {
    await setDoc(doc(db, 'content', 'recruitment'), sanitize(data));
  };

  const updateSocialLinks = async (data: SocialLinks) => {
    await setDoc(doc(db, 'content', 'social'), sanitize(data));
  };

  const updateSiteConfig = async (data: Partial<SiteConfig>) => {
    const next = sanitize({ ...siteConfig, ...data });
    await setDoc(doc(db, 'content', 'config'), next);
  };

  return (
    <AdminContext.Provider value={{
      user, loading, heroData, aboutData, departments, events, boardMembers, leads, podcasts, pastTenures, pastLeadTenures, testimonials, recruitment, socialLinks, siteConfig,
      isLoginOpen, openLoginModal: () => setIsLoginOpen(true), closeLoginModal: () => setIsLoginOpen(false),
      login, logout,
      updateHero, updateAbout, updateDepartment,
      addEvent, updateEvent, deleteEvent,
      addBoardMember, deleteBoardMember,
      addLead, deleteLead,
      addPodcast, updatePodcast, deletePodcast,
      archiveBoard, deletePastTenure,
      archiveLeads, deletePastLeadTenure,
      addTestimonial, deleteTestimonial,
      updateRecruitment, updateSocialLinks, updateSiteConfig
    }}>
      {children}
    </AdminContext.Provider>
  );
};
