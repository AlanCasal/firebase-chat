import React, { useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import useAuthContext from '@/src/context/useAuthContext';
import useAuthContextValue from '@/src/context/useAuthContextValue';
import AuthContext from '@/src/context';
import { MenuProvider } from 'react-native-popup-menu';
import '@/global.css';

const MainLayout = () => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // check if user is authenticated
    if (typeof isAuthenticated === 'undefined') return;

    if (isAuthenticated) router.replace('/chatList');
    else if (isAuthenticated === false) router.replace('/signIn');
  }, [isAuthenticated, router]);

  return <Slot />;
};

const RootLayout = () => {
  const authContextValue = useAuthContextValue();

  return (
    <MenuProvider>
      <AuthContext.Provider value={authContextValue}>
        <MainLayout />
      </AuthContext.Provider>
    </MenuProvider>
  );
};

export default RootLayout;
