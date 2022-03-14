import 'dotenv/config'
import { createServer } from "http";
import mongoose from 'mongoose';
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {

});
io.on("connection", (socket) => {
  console.log('Received socc');
  // socket.emit("hello", "world");
  // console.log('received: %s', data);
  // data = JSON.parse(data.toString());
  // counter.increment();
  // await counter.save();
});
const thing = httpServer.listen(8080)
thing.keepAliveTimeout = 30000; 
thing.headersTimeout = 31000;
//
// const counterSchema = new mongoose.Schema({
//   count: Number
// })
//
// counterSchema.methods.increment = function increment() {
//   this.count++
// }
//
// const Counter = mongoose.model('counter', counterSchema);
//
// const counter = new Counter({ count: 0 });
//
// const uri = process.env.MONGODB_URI;
//
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//   })
//   .catch((err) => console.log(err));
//
