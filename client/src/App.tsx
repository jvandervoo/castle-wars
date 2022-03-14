import { useContext } from "react";
import "./App.css";
import { Counter } from "./Counter";
import { LiveCounterContext } from "./contexts/LiveCounterContext";

function App() {
  // const [count, setCount] = useState<number>(0);
  const { counter, sendIncrement } = useContext(LiveCounterContext);

  return (
    <div className="App">
      <header className="App-header" onClick={sendIncrement}>
        <Counter count={counter} />
      </header>
    </div>
  );
}

export default App;
