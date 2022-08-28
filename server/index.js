import "dotenv/config";
import { createServer } from "http";
import mongoose from "mongoose";
import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// CONSTANTS
// ----------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// GLOBALS
// ----------------------------------------------------------------------------
let count = 0;

// ROUTES
// ----------------------------------------------------------------------------

/**
 * serve the build folder
 */
app.use(express.static(path.join(__dirname, "../build")));

/**
 * websocket server endpoint
 */
io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("Got socket: %s", socket.id);
  const msg = {
    count,
  };
  // emit to the socket that just connected
  socket.emit("SERVER_EMIT_COUNT", msg);

  const size = io.of("/").sockets.size;
  console.log("Number of sockets: %s", size);

  socket.on("CLIENT_EMIT_COUNT", () => {
    console.log("CLIENT_EMIT_COUNT %s", socket.id);
    count++;
    const msg = {
      count,
    };
    // emit to all sockets
    io.emit("SERVER_EMIT_COUNT", msg);
  });
});

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
    httpServer.listen(PORT);
  })
  .catch((err) => console.log(err));
