'use client';

import { useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { motion } from "framer-motion";

import { useAppContext } from './AppContext';

// import { AuthProvider } from '@/app/components/AuthProvider';
// import { useAuth } from "@/app/components/AuthContext";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlcEh2v1rNxuzqzNfdKXyP1UV3hrm7sQQ",
  authDomain: "beavs-social.firebaseapp.com",
  databaseURL: "https://beavs-social-default-rtdb.firebaseio.com",
  projectId: "beavs-social",
  storageBucket: "beavs-social.firebasestorage.app",
  messagingSenderId: "972710406163",
  appId: "1:972710406163:web:75e6f84a6b56a7566e37e6",
  measurementId: "G-EWCP2VX0W3"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



const AuthenticationButton: React.FC = () => {
  const router = useRouter();  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignUp = async () => {  
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'oregonstate.edu'
    });
  
    firebase.auth().signInWithPopup(provider)
      .then(async (result) => {
        const emailPrefix = result.user?.email?.split("@")[0];

        // setEmail(emailPrefix);

        const response = await fetch("http://127.0.0.1:5000/api/get_user?email=" + emailPrefix, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json()

        if ("error" in json)
          router.push(`you/account?email=${emailPrefix}`);
        else {
          localStorage.setItem("email", emailPrefix ?? "");
          localStorage.setItem("id", json.id);
          localStorage.setItem("name", json.name);
          localStorage.setItem("username", json.username);
          localStorage.setItem("major", json.major);
          localStorage.setItem("minor", json.minor);
          localStorage.setItem("residence_hall", json.residence_hall);
          localStorage.setItem("year", json.year);

          setIsAuthenticated(true);
          router.push(`you/mainhome`);
        }
      })
      .catch((error) => {
        console.log("Error signing in:", error);
      })

      // const [data, setData] = useState<any[]>([]);

      // useEffect(() => {
      //   const fetchData = async () => {
      //     const response = await fetch("http://127.0.0.1:5000/api/get_gcs", {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });
      //     const data = await response.json();
      //     setData(data);
      //   };
        
      //   fetchData();
      // }, []);

      // // creae use effect thing and add emal to data, and then set email below as alr done

      // const { setEmail } = useAuth();
      // setEmail(emailPrefix);
  };

  return (
    <motion.button
    className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 tracking-wide"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    onClick={handleSignUp}
  >
    Get Started
  </motion.button>
  );
};

export default AuthenticationButton;