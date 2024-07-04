import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFirebase } from "../../firebase/firebaseContext";

interface NavBarComponentProps {
  title: string
}

function NavBarComponent({ title }: NavBarComponentProps) {

  const firebaseContext = useFirebase();

  async function sair() {
    await firebaseContext?.firebaseAuth?.sair();
  }

  return (
    <div className="w-full h-10 flex justify-center items-center text-white bg-backgroundNavBar">
      <label className="flex-grow text-center">{title}</label>

      <button onClick={sair} title="Save" className="ml-auto flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
        <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>
        Log out</button>
    </div>
  )
}

export default NavBarComponent;
