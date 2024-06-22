import { useState } from "react";

interface IItemList {
  key: number,
  done: boolean,
  title: string,
  notes: string,
}


function ListComponent() {

  const [items, setItems] = useState<IItemList[]>([{
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
  }]);


  function add() {
    setItems([...items, {
      key: items.length,
      done: false,
      title: `Atividade ${items.length + 1}`,
      notes: ''
    }])
  }

  return (

    <div>

      <button onClick={add}>Add</button>

      {items.map((item: IItemList) => (
        <div key={item.key.toString()}> {item.title} </div>
      ))}

    </div>

  )
}

export default ListComponent;