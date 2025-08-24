import { auth } from '@/firebaseconfig';
import { getUser } from '@/services/users';
import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  uid: string;
  firstName: string;
  member: any;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  uid: '',
  firstName: '',
  member: {},
});

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uid, setUid] = useState('');
  const [firstName, setFirstName] = useState('');
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuthenticated(!!user);
      if (user) {
        setUid(user.uid);
        setFirstName(user.displayName ? user.displayName : '');
        const memberFromDB = await getUser(user?.uid);
        setMember(memberFromDB);

        setLoading(false);
      } else {
        console.log('User is logged out');
      }
    });
    const fetchMember = async () => {};
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, uid, firstName, member, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
