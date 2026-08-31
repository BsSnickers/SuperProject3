import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import {
  syncUserProfile,
  subscribeToUser,
  subscribeToUserProgress,
  saveLessonScore,
  setUserRole,
  seedDemoStudentsIfEmpty,
  updateUserEmailVerified,
} from '../firebase/services';
import { UserProfile, LessonProgress, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  progress: Record<string, LessonProgress>;
  loading: boolean;
  isEmailVerified: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name?: string) => Promise<{ verificationEmailSent: boolean }>;
  sendVerificationEmail: () => Promise<void>;
  checkEmailVerification: () => Promise<boolean>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  saveProgress: (lessonId: string, score: number, correct: number, total: number, threshold?: number) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(true);

  useEffect(() => {
    // Seed initial mock student profiles if admin view is opened on fresh database
    seedDemoStudentsIfEmpty();

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Google auth is pre-verified; email/pass relies on currentUser.emailVerified
        const isVerified = currentUser.emailVerified || currentUser.providerData.some((p) => p.providerId === 'google.com');
        setIsEmailVerified(isVerified);

        try {
          // Sync profile in Firestore
          const initialProfile = await syncUserProfile(
            currentUser.uid,
            currentUser.email || 'user@delfi.de',
            currentUser.displayName || undefined,
            isVerified
          );
          setProfile(initialProfile);
        } catch (e) {
          console.error('Error syncing profile:', e);
        }
        setLoading(false);
      } else {
        setUser(null);
        setProfile(null);
        setProgress({});
        setIsEmailVerified(false);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to profile updates when user is authenticated
  useEffect(() => {
    if (!user) return;
    const unsubProfile = subscribeToUser(user.uid, (p) => {
      if (p) {
        setProfile(p);
        if (p.emailVerified !== undefined) {
          setIsEmailVerified((prev) => prev || p.emailVerified === true);
        }
      }
    });
    const unsubProgress = subscribeToUserProgress(user.uid, (prog) => {
      setProgress(prog);
    });

    return () => {
      unsubProfile();
      unsubProgress();
    };
  }, [user?.uid]);

  const signIn = async (email: string, pass: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      const isVerified = cred.user.emailVerified;
      setIsEmailVerified(isVerified);
      await syncUserProfile(cred.user.uid, cred.user.email || email, cred.user.displayName || undefined, isVerified);
    } catch (error: any) {
      throw error;
    }
  };

  const signUp = async (email: string, pass: string, name?: string): Promise<{ verificationEmailSent: boolean }> => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      
      let verificationEmailSent = false;
      try {
        await sendEmailVerification(cred.user);
        verificationEmailSent = true;
      } catch (verificationErr) {
        console.warn('Could not send verification email automatically:', verificationErr);
      }

      setIsEmailVerified(false);
      await syncUserProfile(cred.user.uid, email, name, false);
      return { verificationEmailSent };
    } catch (error: any) {
      throw error;
    }
  };

  const sendVerificationEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const checkEmailVerification = async (): Promise<boolean> => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      const updated = auth.currentUser.emailVerified;
      setIsEmailVerified(updated);
      if (updated && profile) {
        await updateUserEmailVerified(auth.currentUser.uid, true);
        setProfile((prev) => (prev ? { ...prev, emailVerified: true } : null));
      }
      return updated;
    }
    return isEmailVerified;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    setIsEmailVerified(true);
    await syncUserProfile(
      cred.user.uid,
      cred.user.email || 'user@delfi.de',
      cred.user.displayName || undefined,
      true
    );
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (e) {
      // ignore
    }
    setUser(null);
    setProfile(null);
    setProgress({});
    setIsEmailVerified(false);
  };

  const saveProgress = async (
    lessonId: string,
    score: number,
    correct: number,
    total: number,
    threshold: number = 70
  ) => {
    if (!user) return;
    await saveLessonScore(user.uid, lessonId, score, correct, total, threshold);
  };

  // Only users who have role === 'admin' in their Firestore document have admin access
  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        progress,
        loading,
        isEmailVerified,
        signIn,
        signUp,
        sendVerificationEmail,
        checkEmailVerification,
        signInWithGoogle,
        signOut,
        saveProgress,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
