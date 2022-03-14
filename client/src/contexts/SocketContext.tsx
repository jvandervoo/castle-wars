import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { WS_BASE } from "../config";

export interface ISocketIncrementMessage {
  count: number;
}

interface ServerToClientEvents {
  "getIncrement": (msg:ISocketIncrementMessage) => void;
}

interface ClientToServerEvents {
  "setIncrement": () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface IContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>|null;
}

export const SocketContext = createContext<IContext>({
  socket: null,
});

const SocketContextProvider: React.FC = ({ children }) => {
  console.log('creating socket');
  const socket = io(WS_BASE);
  socket.on("connection", () => console.log("connected"));

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;

// import React, { useState, createContext } from "react";

// export const AppStateContext = createContext();

// const AppStateContextProvider = props => {
//   const [appState, setAppState] = useState({
//     cartOpen: false
//   });

//   return <AppStateContext.Provider value={{ appState, setAppState }}>{props.children}</AppStateContext.Provider>;
// };

// export default AppStateContextProvider;
