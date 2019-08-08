import * as io from "socket.io-client";

// checking if its connected
console.log("yo");

// calling this command make connection happen
// io.connect();

//// Option 2
const socket = io.connect();

// just logging
socket.on("greeting", payload => console.log(payload));

// send event back to server
socket.on("greeting", payload => console.log(payload);
socket.emit('niceToBeHere', {
    chicken: 'funky'
}));

socket.on('newPlayer', () => console.log("NEW PLAYER");)

// listen :: socket.on
// sending to server :: socket.emit

// research relationship on <-> emit


// --> this sends the handshake to the server

// going to localhost:8080 servers the html files
//

// files
// server.js as index.js
// socket-start.js
// socket-io.js

// right now, when same user has multiple tabs open it will generate separate Ids which can cause problems depending on feature


// if server is disconnected the socket will send the handshake repeatedly until the socket is connected --> seeing in network tab
