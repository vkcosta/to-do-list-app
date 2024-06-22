import ListComponent from "./components/listComponent/listComponent";
import NavBarComponent from "./components/navBarComponent/navBarComponent";

function App() {
  return (
    <div>
      <NavBarComponent title={"To Do List - Learning"} />
      <ListComponent />
    </div>
  );
}

export default App;
