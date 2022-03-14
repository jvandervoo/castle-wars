import 'dotenv/config'
import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';

const uri = process.env.MONGODB_URI;

const counterSchema = new mongoose.Schema({
  count: Number
})

counterSchema.methods.increment = function increment() {
  this.count++
}

const Counter = mongoose.model('counter', counterSchema);

const counter = new Counter({ count: 0 });

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    wss.on('connection', function connection(ws) {
      ws.on('message', async function message(data) {
        console.log('received: %s', data);
        data = JSON.parse(data.toString());
        counter.increment();
        await counter.save();
        ws.send(`received: ${data.action}`);
        ws.send(`count: ${counter.count}`);
      });
    });
    console.log("MongoDB Connected - soccc opened");
  })
  .catch((err) => console.log(err));

const wss = new WebSocketServer({ port: 8080 });

