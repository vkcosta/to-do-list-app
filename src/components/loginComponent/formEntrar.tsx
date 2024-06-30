import { faAt, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseContextProps, useFirebase } from "../../firebase/firebaseContext";
import { useState } from "react";
import FormService from "./formService";

interface FormLogin {
  email: string,
  password: string
}

export default function FormEntrar() {
  const firebaseContext: FirebaseContextProps | undefined = useFirebase();

  const [formLogin, setFormLogin] = useState<FormLogin>({
    email: '',
    password: ''
  });


  const acao = FormService.initialize();

  function login() {
    // console.log('logar', formLogin)

    if (formLogin.email && formLogin.password) {

      firebaseContext?.firebaseAuth?.entrar(formLogin.email, formLogin.password)
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
    <div className="flex justify-center items-center h-screen">

      <div className="flex flex-col items-center gap-4 w-1/2 bg-gray-200 p-4" >
        <label >Login</label>

        <div className="flex flex-col gap-4 w-full">
          <div className="relative flex items-center">
            <FontAwesomeIcon icon={faAt} className="absolute left-3 text-gray-500" />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={(event) => updateForm(event)}
            />
          </div>
          <div className="relative flex items-center">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={(event) => updateForm(event)}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between w-1/2">


          <button onClick={login} title="Save" className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
            <FontAwesomeIcon icon={faSignInAlt}></FontAwesomeIcon>
            Entrar</button>
          <button onClick={(_e) => { acao.$action?.next('cadastrar') }} title="Save" className="flex items-center gap-1 bg-white-500 hover:bg-white-600 text-black px-3 py-1 rounded">
            {/* <FontAwesomeIcon icon={}></FontAwesomeIcon> */}
            Registrar</button>
        </div>

      </div>
    </div>
  )
}