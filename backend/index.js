const uuid = require('uuid');
const express = require('express');
const app = express();

require('dotenv').config();

// http comes from Node
// creating a vanilla HTTP server that uses express behind the scenes. socket.io requires a vanilla HTTP server, not an express server.
const httpServer = require('http').Server(app);

const realTimeServer = require('socket.io')(httpServer);

const SEND_MESSAGE = 'SEND_MESSAGE';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

// by default, it gives you the client that just connected to your app
realTimeServer.on('connection', (socket) => {
  console.log('__CONNECTION__', socket.id);

  //here, I can add event listeners to that client

  socket.on(SEND_MESSAGE, (data) => {
    console.log('__SOCKET_EVENT__', SEND_MESSAGE);
    socket.emit(RECEIVE_MESSAGE, 'You have sent a message.');
    realTimeServer.emit(RECEIVE_MESSAGE, {
      ...data,
      id: uuid(),
      timestamp: new Date(),
    });
  });
});

realTimeServer.on('disconnect', () => {
  console.log('__SOCKET_DISCONNECT__ ', realTimeServer.id);
});

realTimeServer.on('error', (error) => {
  console.log('__ERROR__ ', error);
});

httpServer.listen(process.env.PORT, () => {
  console.log('__BACKEND_SERVER_UP__ on port ', process.env.PORT);
});