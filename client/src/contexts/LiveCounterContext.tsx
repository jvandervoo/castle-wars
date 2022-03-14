import React, { useState, createContext } from "react";
import io from "socket.io-client";
import { WS_BASE } from "../config";

export const LiveCounterContext = createContext({});

const LiveCounterContextProvider: React.FC = ({ children }) => {
  const [counter, setCounter] = useState<number>(0);
  const socket = io(WS_BASE);

  socket.on("connection", () => console.log("connected!@!!!!!!!!!@!@"));

  socket.on("event://get-increment", (msg) => {
    const payload = JSON.parse(msg);
    console.log(payload);
    setCounter(payload);
  });

  const sendIncrement = () => {
    socket.emit("event://send-increment");
    setCounter((s) => s + 1);
  };

  return (
    <LiveCounterContext.Provider value={{ counter, sendIncrement }}>
      {children}
    </LiveCounterContext.Provider>
  );
};

export default LiveCounterContextProvider;

// import React, { useState, createContext } from "react";

// export const AppStateContext = createContext();

// const AppStateContextProvider = props => {
//   const [appState, setAppState] = useState({
//     cartOpen: false
//   });

//   return <AppStateContext.Provider value={{ appState, setAppState }}>{props.children}</AppStateContext.Provider>;
// };

// export default AppStateContextProvider;
