import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { WS_BASE } from "../config";

interface IContext {
  count: number;
  sendIncrement: () => void;
}

export const SocketContext = createContext<IContext>({
  count: 0,
  sendIncrement: () => {},
});

interface ISocketIncrementMessage {
  count: number;
}

const socket = io(WS_BASE);

const SocketContextProvider: React.FC = ({ children }) => {
  console.log("SocketContextProvider render");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
    });
  }, []);

  useEffect(() => {
    socket.on("SERVER_EMIT_COUNT", (msg: ISocketIncrementMessage) => {
      console.log("SERVER_EMIT_COUNT", socket.id);
      const { count } = msg;
      setCount(count);
    });
  }, []);

  const sendIncrement = () => {
    console.log("CLIENT_EMIT_COUNT", socket?.id);
    socket?.emit("CLIENT_EMIT_COUNT");
  };

  return (
    <SocketContext.Provider value={{ count, sendIncrement }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
