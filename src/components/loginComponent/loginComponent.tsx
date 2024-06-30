// import { faAt, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import React, { useState } from "react";
// import { FirebaseContextProps, useFirebase } from "../../firebase/firebaseContext";

import { useEffect, useState } from "react"
import FormEntrar from "./formEntrar";
import FormCadastrar from "./formCadastrar";
import FormService from "./formService";



export default function Login() {
  const [acaoAtual, setAcaoAtual] = useState('');

  useEffect(() => {
    const acao = FormService.initialize();
    acao.$action?.subscribe(acao => {
      setAcaoAtual(acao)
    })
  }, [acaoAtual]);

  return (
    (acaoAtual === "entrar") ?

      <FormEntrar></FormEntrar>
      :
      <FormCadastrar></FormCadastrar>
  )
}