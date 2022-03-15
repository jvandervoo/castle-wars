import React, { useState, createContext, useContext } from "react";
import { SocketContext } from "./SocketContext";

interface IContext {
  counter: number;
  sendIncrement: () => void;
}

interface ISocketIncrementMessage {
  count: number;
}

// interface ServerToClientEvents {
//   getIncrement: (msg: ISocketIncrementMessage) => void;
// }

// interface ClientToServerEvents {
//   setIncrement: () => void;
// }

export const LiveCounterContext = createContext<IContext>({
  counter: 0,
  sendIncrement: () => {},
});

const LiveCounterContextProvider: React.FC = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const [counter, setCounter] = useState<number>(0);
  console.log("LiveCounterContextProvider render");

  if (!socket) {
    return <></>;
  }

  socket.on("getIncrement", (msg: ISocketIncrementMessage) => {
    console.log("getIncrement", socket.id);
    const { count } = msg;
    setCounter(count);
  });

  const sendIncrement = () => {
    console.log("setIncrement", socket.id);
    socket.emit("setIncrement");
  };

  return (
    <LiveCounterContext.Provider value={{ counter, sendIncrement }}>
      {children}
    </LiveCounterContext.Provider>
  );
};

export default LiveCounterContextProvider;
