import firebase from 'firebase/compat/app'
import { IUsuario, IUsuarioDAO } from "./usuario.model";

interface IUserFirebase {
  ID: string
  name: string
  password: string
}

export class FirestoreUsuarioDAO implements IUsuarioDAO {
  constructor(private db: firebase.firestore.Firestore) {

  }

  async getUserByID(id: string): Promise<IUsuario> {
    try {
      const users = await this.db.collection('usuario').doc(id).get()
      return this.firestoreToUsuario(users.data() as IUserFirebase ?? {})
    } catch (error) {
      throw error
    }
  }

  async createUser(usuario: IUsuario): Promise<IUsuario> {
    try {
      const newUser = this.usuarioToFirestore(usuario)
      await this.db.collection('usuario').add(newUser);
      return usuario
    } catch (error) {
      throw error
    }
  }

  async updateUser(id: string, usuario: IUsuario): Promise<IUsuario> {
    try {
      const newValue = this.usuarioToFirestore(usuario);
      await this.db.collection('usuario').doc(id).set(newValue);
      return usuario;
    } catch (error) {
      throw error
    }
  }

  deleteUser(id: string): Promise<void> {
    return this.db.collection('usuario').doc(id).delete()
  }

  private firestoreToUsuario(usuarioDb: IUserFirebase): IUsuario {
    return {
      ID: usuarioDb.ID,
      name: usuarioDb.name,
      password: usuarioDb.password
    }
  }

  private usuarioToFirestore(usuarioDb: IUsuario): IUserFirebase {
    return {
      ID: usuarioDb.ID,
      name: usuarioDb.name,
      password: usuarioDb.password
    }
  }
}