import { useState } from "react";
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
  const itemsInitial = [{
    key: 0,
    title: "Atividade 1",
    notes: "Minha atividade 1",
    done: false
  }, {
    key: 1,
    title: "Atividade 2",
    notes: "Minha atividade 2",
    done: false
  }, {
    key: 2,
    title: "Atividade 3",
    notes: "Minha atividade 3",
    done: true
  }];

  const [items, setItems] = useState<IItemList[]>(itemsInitial);
  const [editingItem, setEditingItem] = useState<IItemList | null>(null);

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
        <div className="formEditingItem">
          <div>
            <input name='done' type="checkbox" checked={editingItem.done} onChange={handlerChange}></input>
            <label>Done</label>
          </div>

          <div>Title</div>
          <input name='title' type="text" value={editingItem.title} onChange={handlerChange}></input>

          <div>Notes</div>
          <textarea name='notes' value={editingItem.notes} onChange={handlerChange}></textarea>
          <br />

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


/* 
<div key={item.key.toString()}>
          <div > {item.title} </div>
          
          <button onClick={() => {
            update(item.key);
          }}>Update</button>
          <button onClick={() => {
            remove(item.key);
          }}>Remove</button>
        </div> */