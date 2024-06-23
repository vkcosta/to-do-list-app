import { useState } from "react";

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

  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");



  function add() {
    setItems([...items, {
      key: items.length,
      done: false,
      title: `Atividade ${items.length + 1}`,
      notes: ''
    }])
  }

  function save() {
    if (typeof editingKey === 'number') {
      setItems(items =>
        items.map(item =>
          (item.key === editingKey) ?
            { ...item, title: editingTitle } :
            item
        )
      )

      setEditingKey(null);
      setEditingTitle("");
    }
  }

  function startUpdate(key: number, title: string) {
    setEditingKey(key);
    setEditingTitle(title);
  }

  function remove(key: number) {
    setItems([...items.filter(item => item.key !== key)]);
  }

  function cancel() {
    setEditingKey(null);
    setEditingTitle("");
  }

  return (
    <div>
      <button onClick={add}>Add</button>

      {
        items.map((item: IItemList) => (

          (item.key === editingKey) ?  //Modo de edição         
            <div key={item.key.toString()}>
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => {
                  setEditingTitle(e.target.value)
                }}
              ></input>
              <button onClick={() => {
                save();
              }}>Save</button>
              <button onClick={() => {
                cancel();
              }}>Cancel</button>
            </div>
            :
            (
              <div key={item.key.toString()}>
                <div > {item.title} </div>

                <button onClick={() => {
                  startUpdate(item.key, item.title);
                }}>Update</button>

                <button onClick={() => {
                  remove(item.key);
                }}>Remove</button>
              </div>
            )

        )

        )}

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