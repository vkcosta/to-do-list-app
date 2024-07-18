import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEdit, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ItemListDAO } from "../../DAO/toDoList/itemListDAO";
import { FirebaseContext } from "../../firebase/firebaseContext";
import { IItemListDb } from "../../DAO/toDoList/itemList.model";
import { generateUUID } from "../../adapters/uuidAdapter";


interface IItemList {
  key: string,
  done: boolean,
  title: string,
  notes: string,
}

function ListComponent() {
  const [items, setItems] = useState<IItemList[]>([]);
  const [editingItem, setEditingItem] = useState<IItemList | null>(null);
  const [filteredItem, setFilteredItem] = useState<IItemList[]>([]);
  const [inputSearch, setInputSearch] = useState('');

  const firebaseContext = useContext(FirebaseContext)

  // Usar useRef para armazenar a instância do DAO
  const daoRef = useRef<ItemListDAO>();

  useEffect(() => {

    if (!firebaseContext?.firebaseFirestore || !firebaseContext?.currentUser?.uid) {
      return;
    }

    // Inicializar o DAO apenas uma vez
    if (!daoRef.current) {
      const firestore = firebaseContext.firebaseFirestore.getFirestore();
      daoRef.current = new ItemListDAO(firestore);
    }

    const loadItems = async () => {
      const firestore = firebaseContext?.firebaseFirestore.getFirestore();
      if (!firestore) return;
      const DAO = daoRef.current;
      const id = firebaseContext?.currentUser?.uid
      if (!id) return
      const items = await DAO?.getItemListByID(id);
      if (!items) return;
      const data: IItemList[] = Array.isArray(items) ? items.map(i => {
        return {
          key: i.id,
          done: i.status,
          title: i.title,
          notes: i.notes
        }
      }) : [{
        key: items.id,
        done: items.status,
        title: items.title,
        notes: items.notes
      }]

      setItems(data)
    }

    loadItems();
  }, [firebaseContext?.currentUser?.uid, firebaseContext?.firebaseFirestore])

  useEffect(() => {
    setFilteredItem(items);
  }, [items]);

  // function fillArray(length: number) {
  //   const newArray = Array.from({ length: length }, (_, index) => ({
  //     key: index,
  //     title: `Title ${index + 1}`,
  //     notes: `Notes ${index + 1}`,
  //     done: index % 2 === 0
  //   }));
  //   setItems([...newArray]);
  // };

  function add() {
    setEditingItem({
      done: false,
      key: '',
      notes: '',
      title: ''
    })
  }

  async function save() {
    const DAO = daoRef.current;

    if (editingItem) {
      //Atualiza
      if (editingItem.key) {
        try {
          const itemUpdate: IItemListDb = {
            id: editingItem.key,
            id_user: firebaseContext?.currentUser?.uid ?? '',
            notes: editingItem.notes,
            status: editingItem.done,
            title: editingItem.title
          }
          await DAO?.updateItemList(editingItem.key, itemUpdate)
          setItems(items =>
            items.map(item => (item.key === editingItem.key) ? { ...editingItem } : item
            )

          )
        } catch (error) {
          console.error('Ocorreu um erro ao atualizar a tarefa')
          console.error(error)
        }
      } else {
        try {

          const itemInsert: IItemListDb = {
            id: generateUUID(),
            id_user: firebaseContext?.currentUser?.uid ?? '',
            notes: editingItem.notes,
            status: editingItem.done,
            title: editingItem.title
          }
          const newItem = await DAO?.createItemList(itemInsert)
          if (!newItem) return
          //Adiciona
          setItems([...items, {
            ...editingItem,
            key: newItem?.id,//pensar em gerar uma chave
          }])

        } catch (error) {
          console.error('Ocorreu um erro ao atualizar a tarefa');
          console.error(error)
        } finally {
          setEditingItem(null);
        }
      }

      //Limpo o estado de editingItem
      setEditingItem(null);
    }
  }

  function startEdit(item: IItemList) {
    setEditingItem(item);
  }

  async function remove(key: string) {

    try {
      const DAO = daoRef.current;
      await DAO?.deleteItemList(key)
      setItems([...items.filter(item => item.key !== key)]);
    } catch (error) {
      console.error("Ocorreu um erro ao remover a tarefa");
      console.error(error)
    }
  }

  function cancel() {
    setEditingItem(null);
  }

  function handlerChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (editingItem) {
      const { name, value, type, checked } = e.target as HTMLInputElement;
      setEditingItem({
        ...editingItem,
        [name]: (type === 'checkbox') ? checked : value
      })
    }
  }

  function filterItems(e: React.ChangeEvent<HTMLInputElement>) {

    const value: string = e.target.value?.toLocaleLowerCase() ?? '';
    setInputSearch(value);

    if (value) {
      const findItems = items.filter(item => item.title.toLocaleLowerCase().includes(value));
      setFilteredItem(findItems)
    } else {
      setFilteredItem(items);
    }
  }

  function limpar() {
    const input: HTMLInputElement = document.getElementById('searchButton') as HTMLInputElement
    if (input) input.value = ""
    setFilteredItem(items)
    setInputSearch('');
  }

  return (
    <div className="flex flex-col items-center mt-2">

      {(editingItem) ?
        //Visualização para edição
        <div className="flex flex-col gap-4 w-1/2">
          <div>
            <input name='done' type="checkbox" checked={editingItem.done} onChange={handlerChange}></input>
            <label>Done</label>
          </div>

          <div className="flex flex-col">
            <label>Title:</label>
            <input name='title' type="text" value={editingItem.title} onChange={handlerChange}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"></input>
          </div>


          <div className="flex flex-col">
            <label>Notes:</label>
            <textarea name='notes' rows={10} value={editingItem.notes} onChange={handlerChange}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"></textarea>
          </div>

          <div className="flex mt-4 justify-end gap-1">

            <button onClick={cancel} className="flex items-center gap-1 bg-white-200 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded">
              {/* <FontAwesomeIcon icon={faCancel}></FontAwesomeIcon> */}
              Cancel</button>



            <button onClick={save} title="Save" className="flex items-center gap-1 bg-blue-500 hover:bg-blue-500 text-white px-3 py-1 rounded">
              {/* <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> */}

              {(editingItem.key) ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>

        :
        //Visualização normal
        <div className="w-1/2">
          <div className="relative flex items-center w-full">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-500" />
            <input
              id="searchButton"
              type="text"
              name="search"
              placeholder="Texto aqui"
              className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={(e) => filterItems(e)}
            />
            {inputSearch && (
              <button onClick={limpar} className="absolute right-3">
                <FontAwesomeIcon icon={faClose} className="text-gray-500" />
              </button>
            )}

          </div>

          <div className="mt-4">
            <button onClick={add} className="flex items-center gap-1 bg-blue-500 hover:bg-blue-500 text-white px-3 py-1 rounded" title="Add Task">
              {/* <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> */}
              Add Task
            </button>
          </div>

          <div className="mt-4">
            {filteredItem
              .map((item: IItemList, index) => (
                <div key={item.key.toString()} className={`flex items-center justify-between h-12 px-4 ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>

                  <div className="rounded-md w-auto text-center p-1">{item.done ? "Done" : "Pending"}</div>

                  <div > {item.title} </div>

                  <div className="flex items-center gap-2">
                    <button title="Edit" className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded" onClick={() => {
                      startEdit(item);
                    }}>
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                      {/* Edit */}
                    </button>

                    <button title="Remove" className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" onClick={() => {
                      remove(item.key);
                    }}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      {/* Remove */}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>}
    </div>

  )
}

export default ListComponent;
