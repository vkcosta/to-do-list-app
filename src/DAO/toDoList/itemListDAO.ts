import { IItemListDAO, IItemListDb } from "./itemList.model";
import { Firestore, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';

export class ItemListDAO implements IItemListDAO {

  private collectionName: string = 'task';
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async getItemListByID(id: string): Promise<IItemListDb[]> {
    try {
      const collectionRef = collection(this.db, this.collectionName);
      const q = query(collectionRef, where('id_user', '==', id));
      const snapshot = await getDocs(q);
      const items: IItemListDb[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as IItemListDb);
      });
      return items;
    } catch (error: any) {
      if (error.code === 'unavailable') {
        throw new Error('Falha ao conectar ao Firestore. Verifique sua conexão de rede e tente novamente.');
      } else {
        throw error;
      }
    }
  }

  async createItemList(toDo: IItemListDb): Promise<IItemListDb> {
    try {
      const docRef = await addDoc(collection(this.db, this.collectionName), toDo);
      return { ...toDo, id: docRef.id };
    } catch (error) {
      throw error;
    }
  }

  async updateItemList(id: string, toDo: IItemListDb): Promise<IItemListDb> {
    console.log(id, toDo);
    try {
      const taskDocRef = doc(this.db, this.collectionName, id);
      // console.log('taskDocRef', taskDocRef);

      const docSnap = await getDoc(taskDocRef);
      if (docSnap.exists()) {
        // console.log('Documento encontrado:', docSnap.data()); // Verifique os dados
        const dataToUpdate = {
          title: toDo.title,
          notes: toDo.notes,
          status: toDo.status
        };
        await updateDoc(taskDocRef, dataToUpdate);
        return { ...toDo, id };
      } else {
        console.log('Documento não encontrado ao tentar ler.');
        throw new Error(`Documento com ID ${id} não encontrado.`);
      }
    } catch (error) {
      console.log('Erro ao atualizar ou ler:', error);
      throw error;
    }
  }

  async deleteItemList(id: string): Promise<void> {
    try {
      const taskDocRef = doc(this.db, this.collectionName, id);
      await deleteDoc(taskDocRef);
    } catch (error) {
      throw error;
    }
  }
}