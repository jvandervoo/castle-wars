import { useState } from "react";
import "./App.css";
import { Counter } from "./Counter";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="App">
      <header className="App-header" onClick={() => setCount((s) => s + 1)}>
        <Counter count={count} />
      </header>
    </div>
  );
}

export default App;
