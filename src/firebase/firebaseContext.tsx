import React, { ReactNode, createContext, useContext } from "react";
import { FirebaseAuth, firebaseConfig } from "./firebase.service";


interface FirebaseProviderProps {
  children: ReactNode;
}

/* interface FirebaseProviderFeature {
  firebase: Firebase | undefined,
  firebaseAuth: FirebaseAuth | undefined
} */

const FirebaseContext = createContext<FirebaseAuth | undefined>(undefined);

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  // const firebase = new Firebase(firebaseConfig, 'do-to-list');
  const firebaseAuth = new FirebaseAuth(firebaseConfig, 'do-to-list');

    return(
      <FirebaseContext.Provider value={firebaseAuth}>
        {children}
      </FirebaseContext.Provider>
    )
}

export const useFirebase = () => {
  return useContext(FirebaseContext);
}