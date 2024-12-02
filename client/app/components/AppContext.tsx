"use client";

import { createContext, useContext, useState } from 'react';

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children } : {
  children: React.ReactNode;
}) {
  let [email, setEmail] = useState("null@oregonstate.edu");

  return (
    <AppContext.Provider value={{ email, setEmail }}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  return useContext(AppContext);
}