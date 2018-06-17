'use strict'

const socketIO = require('socket.io-client');
const socketURL = 'http://localhost:3000';

const options = {
  transports: ['websocket'],
  'force new connection': true
};

test('Should receive confirmation when a message was sent', (done) => {
  let client = socketIO.connect(socketURL, options);

  client.on('connect', data => {
    client.emit('SEND_MESSAGE', 'Hello');
  });
  client.on('RECEIVE_MESSAGE', data => {
    expect(data).toEqual('You have sent a message.');
    done();
  });
});
