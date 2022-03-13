#!/usr/bin/env python

import asyncio
import websockets

async def hello(websocket):
    loop = True
    while loop:
        input = await websocket.recv()
        greeting = f"Hello {input}!"
        await websocket.send(greeting)
        if (input == 'stop'):
            await websocket.send("Stopping! Cya!")
            loop = False

async def main():
    print("running websocket serve")
    async with websockets.serve(hello, "0.0.0.0", 5000):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    print("running main")
    asyncio.run(main())
