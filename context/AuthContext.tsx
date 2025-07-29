import { auth } from '@/firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  uid: string;
  firstName: string;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  uid: '',
  firstName: '',
});

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUid] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        setUid(user.uid);
        setFirstName(user.displayName ? user.displayName : '');
      } else {
        console.log('User is logged out');
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, uid, firstName }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
