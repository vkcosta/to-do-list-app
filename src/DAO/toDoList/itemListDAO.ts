import { IItemListDAO, IItemListDb } from "./itemList.model";
import firebase from 'firebase/compat/app';

export class ItemListDAO implements IItemListDAO {

  private collection: string = 'task';

  constructor(private db: firebase.firestore.Firestore) {

  }

  async getItemListByID(id: string): Promise<IItemListDb | IItemListDb[]> {
    
    try {
      const collectionRef = this.db.collection('task')
      const query = collectionRef.where('id_user', '==', id);
      const snapshot = await query.get();

      if (!snapshot.empty) {
        return snapshot.docs[0].data() as IItemListDb | IItemListDb[];
      } else {
        return []
      }
    } catch (error: any) {

      // Trata o erro específico de cliente offline
      if (error.code === 'unavailable') {
        throw new Error('Falha ao conectar ao Firestore. Verifique sua conexão de rede e tente novamente.');
      } else {
        throw error; // Lança outros erros não tratados
      }
    }
  }

  async createItemList(toDo: IItemListDb): Promise<IItemListDb> {
    try {
      await this.db.collection(this.collection).add(toDo);
      return toDo;
    } catch (error) {
      throw error
    }
  }

  async updateItemList(id: string, toDo: IItemListDb): Promise<IItemListDb> {
    try {
      const querySnapshot = await this.db
        .collection(this.collection)
        .where('id', '==', id)
        .limit(1)
        .get()

      if (querySnapshot.empty) {
        throw new Error(`Documento com ID ${id} não encontrado no Firestore.`);
      }

      //Todos os documentos do querySnapshot
      const docRef = querySnapshot.docs[0].ref;
      const docData = querySnapshot.docs[0].data();

      await docRef.update(toDo);

      return { ...docData, ...toDo } as IItemListDb;

    } catch (error) {
      throw error
    }
  }

  async deleteItemList(id: string): Promise<void> {
    const querySnapshot = await this.db
      .collection(this.collection)
      .where('id', '==', id)
      .limit(1)
      .get()
    if (querySnapshot.empty) {
      throw new Error(`Documento com ID ${id} não encontrado no Firestore.`);
    }
    return querySnapshot.docs[0].ref.delete();
  }

}