import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCancel, faEdit, faSave, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";

interface IItemList {
  key: number,
  done: boolean,
  title: string,
  notes: string,
}

function ListComponent() {
  const [items, setItems] = useState<IItemList[]>([]);
  const [editingItem, setEditingItem] = useState<IItemList | null>(null);
  const [filteredItem, setFilteredItem] = useState<IItemList[]>([]);

  useEffect(() => {
    fillArray(0);
  }, [])

  useEffect(() => {
    setFilteredItem(items);
  }, [items]);

  function fillArray(length: number) {
    const newArray = Array.from({ length: length }, (_, index) => ({
      key: index,
      title: `Title ${index + 1}`,
      notes: `Notes ${index + 1}`,
      done: index % 2 === 0
    }));
    setItems([...newArray]);
  };

  function add() {
    setEditingItem({
      done: false,
      key: -1,
      notes: '',
      title: ''
    })
  }

  function save() {

    if (editingItem) {
      //Atualiza
      if (editingItem.key > -1) {
        setItems(items =>
          items.map(item => (item.key === editingItem.key) ? { ...editingItem } : item
          )
        )
      } else {
        //Adiciona
        setItems([...items, {
          ...editingItem,
          key: items.length,
        }])
      }

      //Limpo o estado de editingItem
      setEditingItem(null);
    }
  }

  function startEdit(item: IItemList) {
    setEditingItem(item);
  }

  function remove(key: number) {
    setItems([...items.filter(item => item.key !== key)]);
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

    if (value) {
      const findItems = items.filter(item => item.title.toLocaleLowerCase().includes(value));
      setFilteredItem(findItems)
    } else {
      setFilteredItem(items);
    }
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
            <button onClick={save} title="Save" className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
              Save</button>
            <button onClick={cancel} className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
              <FontAwesomeIcon icon={faCancel}></FontAwesomeIcon>
              Cancel</button>
          </div>
        </div>

        :
        //Visualização normal
        <div className="w-1/2">
          <div className="relative flex items-center">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-500" />
            <input
              type="text"
              name="search"
              className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={(e) => filterItems(e)}
            />
          </div>

          <div className="mt-4">
            <button onClick={add} className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded" title="Add">
              <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
              Add
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
                      Edit
                    </button>

                    <button title="Remove" className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded" onClick={() => {
                      remove(item.key);
                    }}>
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      Remove
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
