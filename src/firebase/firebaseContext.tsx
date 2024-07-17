import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { Firebase, FirebaseAnalytics, FirebaseAuth, firebaseConfig, FirebaseFirestore } from "./firebase.service";
import { User, onAuthStateChanged } from "firebase/auth";


interface FirebaseProviderProps {
  children: ReactNode;
}

export interface FirebaseContextProps {
  firebase: Firebase | undefined,
  firebaseAuth: FirebaseAuth | undefined,
  currentUser: User | null,
  firebaseAnalytics: FirebaseAnalytics,
  firebaseFirestore: FirebaseFirestore
}

export const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const app = useMemo(() => new Firebase(firebaseConfig, 'do-to-list'), []);
  const auth = useMemo(() => new FirebaseAuth(firebaseConfig, 'do-to-list'), []);
  const analytics = useMemo(() => new FirebaseAnalytics(firebaseConfig, 'do-to-list'), []);
  const firestore = useMemo(() => new FirebaseFirestore(firebaseConfig, 'do-to-list'), []);

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
    <FirebaseContext.Provider value={{
      firebase: app,
      firebaseAuth: auth,
      currentUser,
      firebaseAnalytics: analytics,
      firebaseFirestore: firestore
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => {
  return useContext(FirebaseContext);
}