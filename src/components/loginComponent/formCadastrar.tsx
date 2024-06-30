import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormService from "./formService";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
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

  const firebaseContext = useFirebase();

  async function register() {
    if (!account.email || !account.password) {
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

  function updateForm(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setAccount({
      ...account,
      [name]: value
    })
  }

  const acao = FormService.initialize();

  return (

    <div className="flex justify-center items-center h-screen">

      <div className="flex flex-col items-center gap-4 w-1/2 bg-gray-200 p-4" >

        <label>Registre-se</label>
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input
              id='email'
              type="text"
              name="email"
              placeholder="Email"
              className="h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={updateForm} required />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input
              id='password'
              type="password"
              name="password"
              placeholder="Password"
              className="h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={updateForm} required
            />
          </div>
          {/* <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
            <input
              id="repeat-password"
              type="password"
              name="repeat-password"
              placeholder="Repeat Password"
              className="h-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" required
            />
          </div> */}
          {/* <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
          </div>
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
        </div> */}
          <button type="submit" className="flex items-center gap-1 bg-white-500 hover:bg-white-600 text-black px-3 py-1 rounded h-10 mb-5" onClick={register}>Register new account</button>

          <button title="Voltar" className="flex items-center gap-1 bg-white-500 hover:bg-white-600 text-black px-3 py-1 rounded h-10 mb-5" onClick={(_e) => { acao.$action?.next('entrar') }}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon>
            voltar</button>
        </form>


      </div>
    </div>


  )
}