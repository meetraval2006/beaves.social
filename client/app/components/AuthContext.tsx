"use client";

import { createContext, useContext } from 'react';

interface AuthContextType {
  userEmail: string | null;
  setEmail: (email: string | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  userEmail: null,
  setEmail: () => {},
});

export const useAuth = () => useContext(AuthContext);