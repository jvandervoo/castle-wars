import 'dotenv/config'
import { createServer } from "http";
import mongoose from 'mongoose';
import express from "express";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});
io.on("connection", (socket) => {
  console.log(socket.id);
  console.log('Got socket: %s', socket.id);
  const size = io.of("/").sockets.size;
  console.log('Number of sockets: %s', size);
  socket.on("setIncrement", () => {
    console.log("incrementing %s", socket.id);
    counter.increment();
    counter.save();
    const msg = {
      count: counter.count
    };
    io.emit("getIncrement", msg);

  });
});

const counterSchema = new mongoose.Schema({
  count: Number
})

counterSchema.methods.increment = function increment() {
  this.count++
}

const Counter = mongoose.model('counter', counterSchema);

const counter = new Counter({ count: 0 });

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(8080)
  })
  .catch((err) => console.log(err));

