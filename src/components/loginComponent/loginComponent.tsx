import { faAt, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useFirebase } from "../../firebase/firebaseContext";
import { FirebaseAuth } from "../../firebase/firebase.service";
// import { useEffect } from "react";

interface FormLogin {
  email: string,
  password: string
}

export default function Login() {
  const firebaseAuth: FirebaseAuth | undefined = useFirebase();
  // const auth = useRef<Auth | undefined>(undefined);

  // useEffect(() => {
  //   if (firebase) {

  //   }
  // }, [firebase])

  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: ''
  });

  function login() {
    // console.log('logar', formLogin)

    if (formLogin.email && formLogin.password) {

      firebaseAuth?.entrar(formLogin.email, formLogin.password)
        .then(result => {
          console.log(result)
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }

  function updateForm(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormLogin({
      ...formLogin,
      [name]: value
    })
  }

  return (
    <div>Login

      <div className="w-1/2">
        <div className="relative flex items-center">
          <FontAwesomeIcon icon={faAt} className="absolute left-3 text-gray-500" />
          <input
            type="text"
            name="email"
            className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={(event) => updateForm(event)}
          />
        </div>
        <div className="relative flex items-center">
          <FontAwesomeIcon icon={faLock} className="absolute left-3 text-gray-500" />
          <input
            type="text"
            name="password"
            className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={(event) => updateForm(event)}
          />
        </div>
      </div>

      {/* <button onClick={login} title="Save" className="flex items-center gap-1 bg-white-500 hover:bg-white-600 text-black px-3 py-1 rounded">
        <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon>
        Registrar</button> */}
      <button onClick={login} title="Save" className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
        <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon>
        Entrar</button>

    </div>
  )
}