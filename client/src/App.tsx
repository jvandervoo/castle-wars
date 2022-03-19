import { useContext } from "react";
import "./App.css";
import { SocketContext } from "./contexts/SocketContext";
import { Counter } from "./Counter";

function App() {
  const { count, sendIncrement } = useContext(SocketContext);

  console.log("render app");
  return (
    <div className="App">
      <header className="App-header" onClick={sendIncrement}>
        <Counter count={count} />
      </header>
    </div>
  );
}

export default App;
