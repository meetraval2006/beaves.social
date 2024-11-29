'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface EmailContextProps {
  email: string;
  setEmail: (email: string) => void;
}

export const EmailContext = createContext<EmailContextProps | undefined>(undefined);

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string>('');

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};