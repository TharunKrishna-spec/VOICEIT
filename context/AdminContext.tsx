
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HeroData, Department, EventItem, BoardMember, Lead, Podcast, PastTenure, PastLeadTenure, Testimonial, RecruitmentData, SocialLinks, AboutData, PrivacyData } from '../types';
import { initialHero, initialDepartments, initialEvents, initialBoard, initialLeads, initialPodcasts, initialPastTenures, initialPastLeadTenures, initialTestimonials, initialRecruitment, initialSocialLinks, initialAbout, initialPrivacy } from '../lib/initialData';
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
  privacyData: PrivacyData;
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
  updatePrivacy: (data: PrivacyData) => Promise<void>;
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
  const [privacyData, setPrivacyData] = useState<PrivacyData>(initialPrivacy);

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
        subscribeToDoc('privacy', setPrivacyData, initialPrivacy),
        
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

  const updateHero = async (data: Partial<HeroData>) => {
    const newData = { ...heroData, ...data };
    // Optimistic update
    setHeroData(newData);
    await setDoc(doc(db, 'content', 'hero'), newData, { merge: true });
  };

  const updateAbout = async (data: AboutData) => {
    setAboutData(data);
    await setDoc(doc(db, 'content', 'about'), data);
  };

  const updateDepartment = async (id: string, data: Partial<Department>) => {
    await updateDoc(doc(db, 'departments', id), data);
  };

  const addEvent = async (event: Omit<EventItem, 'id'>) => {
    await addDoc(collection(db, 'events'), event);
  };

  const updateEvent = async (id: string, data: Partial<EventItem>) => {
    await updateDoc(doc(db, 'events', id), data);
  };

  const deleteEvent = async (id: string) => {
    await deleteDoc(doc(db, 'events', id));
  };

  const addBoardMember = async (member: Omit<BoardMember, 'id'>) => {
    await addDoc(collection(db, 'boardMembers'), member);
  };

  const deleteBoardMember = async (id: string) => {
    await deleteDoc(doc(db, 'boardMembers', id));
  };

  const addLead = async (lead: Omit<Lead, 'id'>) => {
    await addDoc(collection(db, 'leads'), lead);
  };

  const deleteLead = async (id: string) => {
    await deleteDoc(doc(db, 'leads', id));
  };

  const addPodcast = async (podcast: Omit<Podcast, 'id'>) => {
    await addDoc(collection(db, 'podcasts'), podcast);
  };

  const updatePodcast = async (id: string, data: Partial<Podcast>) => {
    await updateDoc(doc(db, 'podcasts', id), data);
  };

  const deletePodcast = async (id: string) => {
    await deleteDoc(doc(db, 'podcasts', id));
  };

  const archiveBoard = async (year: string) => {
    const newTenure = {
        year: year,
        members: [...boardMembers]
    };
    await addDoc(collection(db, 'pastTenures'), newTenure);
  };

  const deletePastTenure = async (id: string) => {
    await deleteDoc(doc(db, 'pastTenures', id));
  };

  const archiveLeads = async (year: string) => {
     const newTenure = {
        year: year,
        leads: [...leads]
    };
    await addDoc(collection(db, 'pastLeadTenures'), newTenure);
  };

  const deletePastLeadTenure = async (id: string) => {
    await deleteDoc(doc(db, 'pastLeadTenures', id));
  };

  const addTestimonial = async (testimonial: Omit<Testimonial, 'id'>) => {
    await addDoc(collection(db, 'testimonials'), testimonial);
  };

  const deleteTestimonial = async (id: string) => {
    await deleteDoc(doc(db, 'testimonials', id));
  };

  const updateRecruitment = async (data: RecruitmentData) => {
    setRecruitment(data);
    await setDoc(doc(db, 'content', 'recruitment'), data);
  };

  const updateSocialLinks = async (data: SocialLinks) => {
    setSocialLinks(data);
    await setDoc(doc(db, 'content', 'social'), data);
  };

  const updatePrivacy = async (data: PrivacyData) => {
    setPrivacyData(data);
    await setDoc(doc(db, 'content', 'privacy'), data);
  };

  return (
    <AdminContext.Provider value={{
      user, loading, heroData, aboutData, departments, events, boardMembers, leads, podcasts, pastTenures, pastLeadTenures, testimonials, recruitment, socialLinks, privacyData,
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
      updateRecruitment, updateSocialLinks, updatePrivacy
    }}>
      {children}
    </AdminContext.Provider>
  );
};