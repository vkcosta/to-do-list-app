// import { faAt, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
// import { FirebaseContextProps, useFirebase } from "../../firebase/firebaseContext";

import { useState } from "react"
import FormEntrar from "./formEntrar";



export default function Login() {
  // const firebaseContext: FirebaseContextProps | undefined= useFirebase();
  // const auth = useRef<Auth | undefined>(undefined);

  // useEffect(() => {
  //   if (firebase) {

  //   }
  // }, [firebase])

  const [rotaAtual, setRotaAtual] = useState<"entrar" | 'cadastrar' | 'login'>('login');


  const handleEventFromChild = (data: "entrar" | 'cadastrar') => {
    setRotaAtual(data);
  };


  return (
    (rotaAtual === "entrar") ?

      <FormEntrar onButtonClick={handleEventFromChild}></FormEntrar>
      :
      (<div>Cadastrar</div>)


  )
}