
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HeroData, Department, EventItem, BoardMember, Lead, Podcast, PastTenure, PastLeadTenure, Testimonial, RecruitmentData, SocialLinks, AboutData } from '../types';
import { initialHero, initialDepartments, initialEvents, initialBoard, initialLeads, initialPodcasts, initialPastTenures, initialPastLeadTenures, initialTestimonials, initialRecruitment, initialSocialLinks, initialAbout } from '../lib/initialData';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, doc, setDoc, deleteDoc, updateDoc, onSnapshot, addDoc, getDoc } from 'firebase/firestore';

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

  // --- AUTH LISTENER ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({ uid: currentUser.uid, email: currentUser.email });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- DATA LISTENERS & SEEDING ---
  // Helper to subscribe to a collection
  const subscribeToCollection = (colName: string, setter: React.Dispatch<any>, initial: any[]) => {
    const colRef = collection(db, colName);
    return onSnapshot(colRef, (snapshot) => {
        if (snapshot.empty && initial.length > 0) {
            // Seed if empty (Auto-Migration)
            initial.forEach(item => {
                // If item has an id, use it, otherwise let firestore gen it
                if (item.id) {
                    setDoc(doc(db, colName, item.id), item).catch(console.error);
                } else {
                    addDoc(colRef, item).catch(console.error);
                }
            });
            setter(initial);
        } else {
            const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            if (data.length > 0) setter(data);
        }
    });
  };

  // Helper to subscribe to a single document (content)
  const subscribeToDoc = (docName: string, setter: React.Dispatch<any>, initial: any) => {
    const docRef = doc(db, 'content', docName);
    return onSnapshot(docRef, (snapshot) => {
        if (!snapshot.exists()) {
            // Seed
            setDoc(docRef, initial).catch(console.error);
            setter(initial);
        } else {
            setter(snapshot.data());
        }
    });
  };

  useEffect(() => {
    const unsubs = [
        subscribeToDoc('hero', setHeroData, initialHero),
        subscribeToDoc('about', setAboutData, initialAbout),
        subscribeToDoc('recruitment', setRecruitment, initialRecruitment),
        subscribeToDoc('social', setSocialLinks, initialSocialLinks),
        
        subscribeToCollection('departments', setDepartments, initialDepartments),
        subscribeToCollection('events', setEvents, initialEvents),
        subscribeToCollection('boardMembers', setBoardMembers, initialBoard),
        subscribeToCollection('leads', setLeads, initialLeads),
        subscribeToCollection('podcasts', setPodcasts, initialPodcasts),
        subscribeToCollection('pastTenures', setPastTenures, initialPastTenures),
        subscribeToCollection('pastLeadTenures', setPastLeadTenures, initialPastLeadTenures),
        subscribeToCollection('testimonials', setTestimonials, initialTestimonials)
    ];

    return () => {
        unsubs.forEach(unsub => unsub());
    };
  }, []);


  // --- AUTH ACTIONS ---

  const login = async (email: string, pass: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, pass);
        return true;
    } catch (e) {
        console.error("Login Error", e);
        return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setIsLoginOpen(false);
  };

  // --- DATA ACTIONS ---
  // We sanitize inputs here to ensure no circular references (like Events or DOM nodes) reach Firestore.

  const updateHero = async (data: Partial<HeroData>) => {
    const cleanData = {
      title: data.title || '',
      subtitle_p1: data.subtitle_p1 || '',
      subtitle_highlight: data.subtitle_highlight || '',
      description: data.description || ''
    };
    const newData = { ...heroData, ...cleanData };
    setHeroData(newData);
    await setDoc(doc(db, 'content', 'hero'), newData, { merge: true });
  };

  const updateAbout = async (data: AboutData) => {
    // Deep sanitize needed for nested arrays if they come from mixed sources, but typically safe if typed.
    // Ensure we don't pass the state object itself if it has extra props.
    const cleanData: AboutData = {
        sectionTitle: data.sectionTitle || '',
        mainTitle: data.mainTitle || '',
        description: data.description || '',
        features: data.features.map(f => ({ id: f.id, title: f.title, text: f.text, icon: f.icon })),
        images: [...data.images]
    };
    setAboutData(cleanData);
    await setDoc(doc(db, 'content', 'about'), cleanData);
  };

  const updateDepartment = async (id: string, data: Partial<Department>) => {
    // Only allow specific fields
    const payload: any = {};
    if (data.name !== undefined) payload.name = data.name;
    if (data.description !== undefined) payload.description = data.description;
    if (data.icon !== undefined) payload.icon = data.icon;
    if (data.color !== undefined) payload.color = data.color;
    
    await updateDoc(doc(db, 'departments', id), payload);
  };

  const addEvent = async (event: Omit<EventItem, 'id'>) => {
    const cleanEvent = {
        title: event.title || '',
        year: event.year || '',
        icon: event.icon || 'Mic',
        description: event.description || '',
        image: event.image || '',
        longDescription: event.longDescription || ''
    };
    await addDoc(collection(db, 'events'), cleanEvent);
  };

  const updateEvent = async (id: string, data: Partial<EventItem>) => {
    const payload: any = {};
    if (data.title !== undefined) payload.title = data.title;
    if (data.year !== undefined) payload.year = data.year;
    if (data.icon !== undefined) payload.icon = data.icon;
    if (data.description !== undefined) payload.description = data.description;
    if (data.image !== undefined) payload.image = data.image;
    if (data.longDescription !== undefined) payload.longDescription = data.longDescription;
    
    await updateDoc(doc(db, 'events', id), payload);
  };

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, 'events', id));
  };

  const addBoardMember = async (member: Omit<BoardMember, 'id'>) => {
    const cleanMember = {
        name: member.name || '',
        role: member.role || '',
        image: member.image || ''
    };
    await addDoc(collection(db, 'boardMembers'), cleanMember);
  };

  const deleteBoardMember = async (id: string) => {
    await deleteDoc(doc(db, 'boardMembers', id));
  };

  const addLead = async (lead: Omit<Lead, 'id'>) => {
    const cleanLead = {
        name: lead.name || '',
        designation: lead.designation || '',
        department: lead.department || '',
        image: lead.image || '',
        quote: lead.quote || ''
    };
    await addDoc(collection(db, 'leads'), cleanLead);
  };

  const deleteLead = async (id: string) => {
    await deleteDoc(doc(db, 'leads', id));
  };

  const addPodcast = async (podcast: Omit<Podcast, 'id'>) => {
    const cleanPodcast = {
        title: podcast.title || '',
        host: podcast.host || '',
        duration: podcast.duration || '',
        image: podcast.image || '',
        link: podcast.link || ''
    };
    await addDoc(collection(db, 'podcasts'), cleanPodcast);
  };

  const deletePodcast = async (id: string) => {
    await deleteDoc(doc(db, 'podcasts', id));
  };

  const archiveBoard = async (year: string) => {
    // Deep clone members to strip any non-serializable properties
    const cleanMembers = boardMembers.map(m => ({
        id: m.id,
        name: m.name,
        role: m.role,
        image: m.image
    }));
    
    const newTenure = {
        year: year,
        members: cleanMembers
    };
    await addDoc(collection(db, 'pastTenures'), newTenure);
  };

  const deletePastTenure = async (id: string) => {
    await deleteDoc(doc(db, 'pastTenures', id));
  };

  const archiveLeads = async (year: string) => {
     const cleanLeads = leads.map(l => ({
         id: l.id,
         name: l.name,
         designation: l.designation,
         department: l.department,
         image: l.image,
         quote: l.quote || ''
     }));

     const newTenure = {
        year: year,
        leads: cleanLeads
    };
    await addDoc(collection(db, 'pastLeadTenures'), newTenure);
  };

  const deletePastLeadTenure = async (id: string) => {
    await deleteDoc(doc(db, 'pastLeadTenures', id));
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    const cleanTestimonial = {
        quote: testimonial.quote || '',
        name: testimonial.name || '',
        designation: testimonial.designation || '',
        src: testimonial.src || ''
    };
    await addDoc(collection(db, 'testimonials'), cleanTestimonial);
  };

  const deleteTestimonial = async (id: string) => {
    await deleteDoc(doc(db, 'testimonials', id));
  };

  const updateRecruitment = async (data: RecruitmentData) => {
    const cleanData = {
        isOpen: !!data.isOpen,
        link: data.link || ''
    };
    setRecruitment(cleanData);
    await setDoc(doc(db, 'content', 'recruitment'), cleanData);
  };

  const updateSocialLinks = async (data: SocialLinks) => {
    const cleanData = {
        instagram: data.instagram || '',
        youtube: data.youtube || '',
        linkedin: data.linkedin || ''
    };
    setSocialLinks(cleanData);
    await setDoc(doc(db, 'content', 'social'), cleanData);
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
