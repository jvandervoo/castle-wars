import React, { useState, createContext, useContext } from "react";
import { SocketContext } from "./SocketContext";
import { ISocketIncrementMessage } from "./SocketContext";

interface IContext {
  counter: number;
  sendIncrement: () => void;
}

export const LiveCounterContext = createContext<IContext>({
  counter: 0,
  sendIncrement: () => {},
});

const LiveCounterContextProvider: React.FC = ({ children }) => {
  const { socket } = useContext(SocketContext);
  const [counter, setCounter] = useState<number>(0);
  console.log('Hello');

  if (!socket) {
    return <></>;
  }

  socket.on("getIncrement", (msg:ISocketIncrementMessage) => {
    console.log('Incrementing the counter interface for socket: ', socket.id);
    console.log(msg);
    const { count } = msg;
    setCounter(count);
  });

  const sendIncrement = () => {
    console.log('sending increment event %s', socket.id);
    socket.emit("setIncrement");
  };

  return (
    <LiveCounterContext.Provider value={{ counter, sendIncrement }}>
      {children}
    </LiveCounterContext.Provider>
  );
};

export default LiveCounterContextProvider;
