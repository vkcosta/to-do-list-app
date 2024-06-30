import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { Firebase, FirebaseAuth, firebaseConfig } from "./firebase.service";
import { User, onAuthStateChanged } from "firebase/auth";


interface FirebaseProviderProps {
  children: ReactNode;
}

export interface FirebaseContextProps {
  firebase: Firebase | undefined,
  firebaseAuth: FirebaseAuth | undefined,
  currentUser: User | null
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const app = useMemo(() => new Firebase(firebaseConfig, 'do-to-list'), []);
  const auth = useMemo(() => new FirebaseAuth(firebaseConfig, 'do-to-list'), []);

  if (!app || !auth) {
    throw new Error("Não foi possível autenticar")
  }

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth.getAuth(), (usuario) => {
      setCurrentUser(usuario)
    })

    return () => unsubscribe();
  }, [auth])

  return (
    <FirebaseContext.Provider value={{ firebase: app, firebaseAuth: auth, currentUser }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => {
  return useContext(FirebaseContext);
}