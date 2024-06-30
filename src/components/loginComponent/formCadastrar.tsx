import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormService from "./formService";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function FormCadastrar() {

 
  const acao = FormService.initialize();

  return (
    
     <div>
      <button title="Voltar" className="flex items-center gap-1 bg-white-500 hover:bg-white-600 text-black px-3 py-1 rounded" onClick={(_e) =>{ acao.$action?.next('entrar')}}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon>
        voltar</button>
     </div>

     
    
  )
}