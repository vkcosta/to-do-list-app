import { faAt, faListUl, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FirebaseContextProps, useFirebase } from "../../firebase/firebaseContext";
import { useState } from "react";
import FormService from "./formService";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";


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

  const [errors, setErrors] = useState<FormLogin>({ email: '', password: '' });

  const acao = FormService.initialize();

  function login() {
    // console.log('logar', formLogin)

    if (formLogin.email && formLogin.password) {

      firebaseContext?.firebaseAuth?.entrar(formLogin.email, formLogin.password)
        .then(result => {
          console.log(result)
        })
        .catch((e) => {
          //Pensar numa forma de notificar - toast
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

  const validateField = (name: string, value: string) => {
    let error = '';

    if (name === 'email') {
      if (!value) {
        error = 'O email é obrigatório';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'O email é inválido';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'A senha é obrigatória';
      } else if (value.length < 6) {
        error = 'A senha deve ter pelo menos 6 caracteres';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  function handleSubmit() {
    for (const prop in formLogin) {
      // @ts-ignore
      validateField(prop, formLogin[prop])
    }

    const isValid = !Object.values(errors).some(error => error !== '') &&
      !Object.values(formLogin).some(value => value === '');

    if (isValid) {
      login();
    } else {
      console.log('Formulário inválido');
    }
  };

  return (
    <div className="flex justify-center items-center h-full ">

      <div className="flex flex-col items-center gap-4 w-1/4 bg-gray-200 p-4 rounded-md" >
        <FontAwesomeIcon icon={faListUl} size="lg" />
        <label >To Do List</label>

        <div className="flex flex-col gap-4 w-full">
          <div className="relative flex flex-col items-center">
            <FontAwesomeIcon icon={faAt} className="absolute top-3 left-3 text-gray-500" />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onBlur={handleBlur}
              className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={(event) => updateForm(event)}
              required
            />

            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="relative flex flex-col items-center">
            <FontAwesomeIcon icon={faLock} className="absolute top-3 left-3 text-gray-500" />
            <input
              type="password"
              name="password"
              onBlur={handleBlur}
              placeholder="Password"
              className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={(event) => updateForm(event)}
            />

            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
        </div>

        <div className="flex flex-col justify-between w-full gap-1">

          <button onClick={handleSubmit} title="Save" className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 h-10">
            Entrar</button>

          <button onClick={() => firebaseContext?.firebaseAuth?.entrarComGoogle()} title="Save" className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 h-10">
            <FontAwesomeIcon icon={faGoogle} className="absolute top-3 left-3 text-gray-500" />
            Entrar com Google</button>
          {/* <SocialButton platform="google" /> */}
        </div>

        <button onClick={(_e) => { acao.$action?.next('cadastrar') }} title="Save"
          className="flex items-center justify-center gap-2 bg-white-500 hover:bg-white-600 text-black font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 h-10">
          Registrar</button>

      </div>
    </div>
  )
}