import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithGoogle, signOutUser } from '../lib/firebase';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state error:', error);
        setAuthError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      setAuthError(null);
      await signInWithGoogle();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to sign in with Google';
      setAuthError(message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setAuthError(message);
    }
  };

  const isAdmin = user?.email === 'ryan@shepdesign.com';

  return {
    user,
    loading,
    authError,
    isAdmin,
    signIn: handleSignIn,
    signOut: handleSignOut
  };
}
