import { useState, useEffect } from 'react';

interface LocalStorageData {
  id: string
  name: string
  username: string
  major: string
  minor: string
  residence_hall: string
  year: string
  email: string
};

export const handleSave = (data: any) => {
  const [email, setEmail] = useState<any>({});
  
  if (typeof window !== "undefined" && window.localStorage) {
    
  }
};

