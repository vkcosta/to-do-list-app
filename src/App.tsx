import { useEffect, useRef } from "react";
import ListComponent from "./components/listComponent/listComponent";
import Login from "./components/loginComponent/loginComponent";
import NavBarComponent from "./components/navBarComponent/navBarComponent";
import { useFirebase } from "./firebase/firebaseContext";
import { Auth } from "firebase/auth";

function App() {

  const firebase = useFirebase();
  const auth = useRef<Auth | undefined>(undefined);

  useEffect(() => {
    if (firebase) {
      auth.current = firebase.getAuth();
    }
  }, [firebase])

  return (
    <div>
      {!auth.current?.currentUser ?
        <Login></Login> :
        <div>
          <NavBarComponent title={"To Do List"} />
          <ListComponent />
        </div>
      }
    </div>
  );
}

export default App;
