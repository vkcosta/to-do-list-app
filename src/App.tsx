// import { useEffect, useRef } from "react";
import ListComponent from "./components/listComponent/listComponent";
import Login from "./components/loginComponent/loginComponent";
import NavBarComponent from "./components/navBarComponent/navBarComponent";
import { useFirebase } from "./firebase/firebaseContext";
// import { Auth } from "firebase/auth";

function App() {

  const firebaseContext = useFirebase();
  // const auth = useRef<Auth | undefined>(undefined);

  // useEffect(() => {
  //   if (firebaseContext) {
  //     auth.current = firebase.getAuth();
  //   }
  // }, [firebaseContext])

  console.log('currentUser', firebaseContext?.currentUser)

  return (
    <div>
      {!firebaseContext?.currentUser ?
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
