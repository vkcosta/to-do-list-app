import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import { getFirestore } from 'firebase/firestore'
// import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
// import { FirebaseApp, FirebaseOptions, initializeApp, getApps } from 'firebase/app';
// import { Analytics, getAnalytics } from 'firebase/analytics'


export const firebaseConfig: Object = {
  apiKey: "AIzaSyDuM67qj3AYlYL0QkTSXOygQwrq2SazaUc",
  authDomain: "to-do-list-app-eee7d.firebaseapp.com",
  projectId: "to-do-list-app-eee7d",
  storageBucket: "to-do-list-app-eee7d.appspot.com",
  messagingSenderId: "795051855028",
  appId: "1:795051855028:web:93b007d17d609b86c39be1",
  measurementId: "G-HP83HGCJQY"
}

class Firebase {
  private app: firebase.app.App = {} as firebase.app.App;

  constructor(protected configuracao: Object, protected name: string) {
    try {
      if (!this.isFirebaseInitialized()) {
        this.app = firebase.initializeApp(this.configuracao, this.name);
        console.log('Firebase inicializado com sucesso');
      } else {
        this.app = firebase.app(this.name);
        console.log('Firebase já estava inicializado');
      }
    } catch (error) {
      console.error("Erro ao inicializar o Firebase", error);
    }
  }

  private isFirebaseInitialized() {
    try {
      return firebase.app(this.name)
    } catch (error) {
      return false
    }
  }

  getApp(): firebase.app.App {
    return this.app;
  }
}

class FirebaseAuth extends Firebase {

  constructor(protected configuracao: Object, protected name: string) {
    super(configuracao, name)
  }

  getAuth(): firebase.auth.Auth {
    return firebase.auth(super.getApp())
  }

  async entrar(email: string, password: string): Promise<firebase.auth.UserCredential> {
    try {
      const auth = this.getAuth();
      if (!auth) throw new Error('Firebase auth não inicializado');

      const credential = await auth.signInWithEmailAndPassword(email, password);
      // this.registerSession(credential)
      return credential
    } catch (error) {
      console.error(error)
      throw new Error(`Falha ao realizar o login ${JSON.stringify(error)}`);
    }
  }

  async entrarComGoogle(): Promise<void> {
    try {

      // const provider = new GoogleAuthProvider();
      // const auth = this.getAuth();

      // const result: firebase.auth.UserCredential = await auth.signInWithPopup(provider)
      // GoogleAuthProvider.credentialFromResult(result);

    } catch (error) {

      console.error('Ocorreu um erro ao autenticar com Google.', error);
    }
  }

  async entrarComFacebook(): Promise<void> {
    try {
      // const provider = new auth.FacebookAuthProvider();
      // const auth = this.getAuth();

      // const result: UserCredential = await signInWithPopup(auth, provider)
      // FacebookAuthProvider.credentialFromResult(result);

    } catch (error) {

      console.error('Ocorreu um erro ao autenticar com Facebook.', error);
    }
  }

  cadastrar(email: string, password: string): Promise<firebase.auth.UserCredential> {
    const auth = this.getAuth();
    if (!auth) throw new Error('Firebase auth não inicializado');
    return auth.createUserWithEmailAndPassword(email, password)
  }

  async sair(): Promise<void> {
    try {
      const auth = this.getAuth();
      if (!auth) throw new Error('Firebase auth não inicializado');
      await auth.signOut();
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
  constructor(protected configuracao: Object, protected name: string) {
    super(configuracao, name)
  }

  getAnalytics(): firebase.analytics.Analytics {
    return firebase.analytics(super.getApp())
  }
}

class FirebaseFirestore extends Firebase {
  constructor(protected configuracao: Object, protected name: string) {
    super(configuracao, name)
  }

  getFirestore(): firebase.firestore.Firestore {
    return firebase.firestore(super.getApp())
  }
}

export { Firebase, FirebaseAuth, FirebaseAnalytics, FirebaseFirestore }

