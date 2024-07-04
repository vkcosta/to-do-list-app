import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormService from "./formService";
import { faAt, faListUl, faLock } from "@fortawesome/free-solid-svg-icons";
import { useFirebase } from "../../firebase/firebaseContext";
import { useState } from "react";

interface FormAccount {
  email: string,
  password: string
}

export default function FormCadastrar() {

  const [account, setAccount] = useState<FormAccount>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<FormAccount>({ email: '', password: '' });

  const firebaseContext = useFirebase();

  async function register() {
    for (const prop in account) {
      // @ts-ignore
      validateField(prop, account[prop])
    }

    const isValid = !Object.values(errors).some(error => error !== '') &&
      !Object.values(account).some(value => value === '');

    if (isValid) {
      try {
        await firebaseContext?.firebaseAuth?.cadastrar(
          account.email,
          account.password
        );

        console.log("Conta criada com sucesso!")

      } catch (error) {
        console.error('Ocorreu um erro ao registrar a conta', error)
      }
    }
  }

  function validateField(name: string, value: string) {
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

  function updateForm(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    validateField(name, value);

    setAccount({
      ...account,
      [name]: value
    })
  }

  const acao = FormService.initialize();

  return (

    <div className="flex justify-center items-center h-full ">

      <div className="flex flex-col items-center gap-4 w-1/4 bg-gray-200 p-4 rounded-md" >
        <FontAwesomeIcon icon={faListUl} size="lg" />
        <label >Register To Do List</label>

        <div className="flex flex-col gap-4 w-full">
          <div className="relative flex flex-col items-center">
            <FontAwesomeIcon icon={faAt} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={(event) => updateForm(event)}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="relative flex flex-col items-center">
            <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-500" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="pl-10 h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={(event) => updateForm(event)}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
        </div>

        <div className="flex flex-col justify-between w-full gap-1">


          <button onClick={register} title="Register" className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 h-10">
            Registrar</button>
          <button onClick={(_e) => { acao.$action?.next('entrar') }} title="Save"
            className="flex items-center justify-center gap-2 bg-white-500 hover:bg-white-600 text-black font-semibold px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 h-10"  >

            voltar</button>
        </div>

      </div>
    </div>


  )
}