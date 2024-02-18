import "./App.css";
import { GetTaskWindow } from "./components/getTaskWindow";
import PrimaryForm from "./components/primaryForm";

function App() {
  return (
    <div className="App">
      <PrimaryForm />
      <GetTaskWindow />
    </div>
  );
}

export default App;
