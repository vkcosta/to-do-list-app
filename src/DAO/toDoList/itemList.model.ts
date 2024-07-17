export interface IItemListDb {
  id: string,
  id_user: string,
  title: string,
  status: boolean,
  notes: string,
}

export interface IItemListDAO {
  getItemListByID(id: string): Promise<IItemListDb | IItemListDb[]>;
  createItemList(toDo: IItemListDb): Promise<IItemListDb>;
  updateItemList(id: string, toDo: IItemListDb): Promise<IItemListDb>;
  deleteItemList(id: string): Promise<void>;
}
