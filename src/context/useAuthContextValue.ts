import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  AuthErrorCodes,
} from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { CustomUserData, AuthResponse, AuthError } from './types';

const AuthContextValue = () => {
  const [user, setUser] = useState<CustomUserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      return { success: true };
    } catch (error) {
      let message = (error as { message: string }).message;

      if (!email) message = 'Please enter your email';
      else if (!password) message = 'Please enter your password';
      else if (
        message.includes('auth/invalid-email') ||
        message.includes('auth/invalid-credential')
      )
        message = 'Invalid email or password';

      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: (error as { message: string }).message,
      };
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ): Promise<AuthResponse> => {
    try {
      if (!username) throw new Error(AuthError.USERNAME_REQUIRED);
      else if (!profileUrl) throw new Error(AuthError.PROFILE_URL_REQUIRED);

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // onAuthStateChanged will handle setUser(response?.user);
      // id is generated automatically so we don't need addDoc
      // setDoc creates or updates an existing document, and let us use manually doc id (user.uid in this case)
      // https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document
      await setDoc(doc(db, 'users', response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user.uid,
      });

      return { success: true };
    } catch (error) {
      let message = (error as { message: string }).message;

      if (!username) message = AuthError.USERNAME_REQUIRED;
      else if (message.includes(AuthErrorCodes.INVALID_EMAIL) || !email)
        message = AuthError.INVALID_EMAIL;
      else if (message.includes(AuthErrorCodes.EMAIL_EXISTS))
        message = AuthError.EMAIL_EXISTS;
      else if (message.includes(AuthErrorCodes.INVALID_PASSWORD) || !password)
        message = AuthError.INVALID_PASSWORD;
      else if (!profileUrl) message = AuthError.PROFILE_URL_REQUIRED;

      return { success: false, error: message };
    }
  };

  const updateUserData = async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUser({
        username: data.username,
        profileUrl: data.profileUrl,
        userId: data.userId,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        updateUserData(authUser.uid);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return unsubscribe;
  }, []);

  return {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };
};

export default AuthContextValue;
