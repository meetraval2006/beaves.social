import { useState, ReactNode } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userEmail, setEmail] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userEmail, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};