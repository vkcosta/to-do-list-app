import { useEffect, useState } from "react";
import './listComponent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCancel, faEdit, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";

interface IItemList {
  key: number,
  done: boolean,
  title: string,
  notes: string,
}

function ListComponent() {
  const [items, setItems] = useState<IItemList[]>([]);
  const [editingItem, setEditingItem] = useState<IItemList | null>(null);

  useEffect(() => {
    fillArray(100);
  }, [])

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

  return (
    <div className="container">

      {(editingItem) ?
        //Visualização para edição
        <div className="formEditing">
          <div>
            <input name='done' type="checkbox" checked={editingItem.done} onChange={handlerChange}></input>
            <label>Done</label>
          </div>

          <div className="formEditingItem">
            <label>Title:</label>
            <input name='title' type="text" value={editingItem.title} onChange={handlerChange}></input>
          </div>


          <div className="formEditingItem">
            <label>Notes:</label>
            <textarea name='notes' rows={10} value={editingItem.notes} onChange={handlerChange}></textarea>
          </div>

          <div className="buttons">
            <button onClick={save} title="Save" className="button">
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon>
              Save</button>
            <button onClick={cancel} className="button">
              <FontAwesomeIcon icon={faCancel}></FontAwesomeIcon>
              Cancel</button>
          </div>
        </div>

        :
        //Visualização normal
        <div>
          <div className="buttonAdd">
            <button onClick={add} className="button" title="Add">
              <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
              Add
            </button>
          </div>

          <div className="gridItem">
            {items
              .map((item: IItemList, index) => (
                <div key={item.key.toString()} className={
                  index % 2 === 0
                    ? 'itemList line'
                    : 'itemList'
                }>

                  <div className="itemListDone">{item.done ? "Done" : "Pending"}</div>

                  <div > {item.title} </div>

                  <div className="buttons">
                    <button title="Edit" className="button" onClick={() => {
                      startEdit(item);
                    }}>
                      <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                      {/* Edit */}
                    </button>

                    <button title="Remove" className="button" onClick={() => {
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
