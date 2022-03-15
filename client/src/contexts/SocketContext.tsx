import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { WS_BASE } from "../config";

interface IContext {
  socket: Socket | null;
}

export const SocketContext = createContext<IContext>({
  socket: null,
});

const SocketContextProvider: React.FC = ({ children }) => {
  console.log("SocketContextProvider render");
  const socket = io(WS_BASE);
  socket.on("connection", () => console.log("connected"));

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
