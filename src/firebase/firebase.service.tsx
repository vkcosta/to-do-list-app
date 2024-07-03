import { FirebaseApp, FirebaseOptions, initializeApp, getApps } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics'
import { Auth, FacebookAuthProvider, GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDuM67qj3AYlYL0QkTSXOygQwrq2SazaUc",
  authDomain: "to-do-list-app-eee7d.firebaseapp.com",
  projectId: "to-do-list-app-eee7d",
  storageBucket: "to-do-list-app-eee7d.appspot.com",
  messagingSenderId: "795051855028",
  appId: "1:795051855028:web:93b007d17d609b86c39be1",
  measurementId: "G-HP83HGCJQY"
}

class Firebase {
  private app: FirebaseApp = {} as FirebaseApp;

  constructor(protected configuracao: FirebaseOptions, protected name: string) {
    try {
      if (!this.isFirebaseInitialized()) {
        this.app = initializeApp(this.configuracao, this.name);
        console.log('Firebase inicializado com sucesso');
      } else {
        this.app = getApps()[0];
        console.log('Firebase já estava inicializado');
      }
    } catch (error) {
      console.error("Erro ao inicializar o Firebase", error);
    }
  }

  private isFirebaseInitialized() {
    return getApps().length > 0
  }

  getApp(): FirebaseApp {
    return this.app;
  }
}

class FirebaseAuth extends Firebase {

  constructor(protected configuracao: FirebaseOptions, protected name: string) {
    super(configuracao, name)
  }

  getAuth(): Auth {
    return getAuth(super.getApp())
  }

  async entrar(email: string, password: string): Promise<UserCredential> {
    try {
      const auth = this.getAuth();
      if (!auth) throw new Error('Firebase auth não inicializado');
      const credential = await signInWithEmailAndPassword(auth, email, password);
      // this.registerSession(credential)
      return credential
    } catch (error) {
      console.error(error)
      throw new Error(`Falha ao realizar o login ${JSON.stringify(error)}`);
    }
  }

  async entrarComGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const auth = this.getAuth();

      const result: UserCredential = await signInWithPopup(auth, provider)
      GoogleAuthProvider.credentialFromResult(result);

    } catch (error) {

      console.error('Ocorreu um erro ao autenticar com Google.', error);
    }
  }

  async entrarComFacebook(): Promise<void>{
    try {
      const provider = new FacebookAuthProvider();
      const auth = this.getAuth();

      const result: UserCredential = await signInWithPopup(auth, provider)
      FacebookAuthProvider.credentialFromResult(result);

    } catch (error) {

      console.error('Ocorreu um erro ao autenticar com Facebook.', error);
    }
  }

  cadastrar(email: string, password: string): Promise<UserCredential> {
    const auth = this.getAuth();
    if (!auth) throw new Error('Firebase auth não inicializado');
    return createUserWithEmailAndPassword(auth, email, password)
  }

  async sair(): Promise<void> {
    try {
      const auth = this.getAuth();
      if (!auth) throw new Error('Firebase auth não inicializado');
      await signOut(auth);
      // this.cleanSession();
      return
    } catch (error) {
      console.error(error)
      throw new Error(`Falha ao Sair ${JSON.stringify(error)}`);
    }
  }

  // private cleanSession() {
  //   sessionStorage.removeItem('credential');
  // }
}

class FirebaseAnalytics extends Firebase {
  constructor(protected configuracao: FirebaseOptions, protected name: string) {
    super(configuracao, name)
  }

  getAnalytics(): Analytics {
    return getAnalytics(super.getApp())
  }
}

class FirebaseFirestore extends Firebase {
  constructor(protected configuracao: FirebaseOptions, protected name: string) {
    super(configuracao, name)
  }

  /*  getFirestore(): Firestore {
     return getFirestore(super.getApp())
   } */
}

export { Firebase, FirebaseAuth, FirebaseAnalytics, FirebaseFirestore }

