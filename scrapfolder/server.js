// npm install socket.io --save

const express = require("express");
const app = express();

// creating seperate server which listens for requests, everything else goes to app?
const server = require("http").Server(app);

// --> passing it the server from line before
const io = require("socket.io")(server, { origins: "localhost:8080" });
// for heroku : --> origins "mysocialnetwork.herokuapp.com:*"
// 'localhost:8080 mysocialnetwork.herokuapp.com:*'

app.get("/", function(req, res) {
    // just a normal route
    res.sendStatus(200);
});

// don't call listen on app like usually - call server!
// -->
server.listen(8080); // it's server, not app, that does the listening

// io has (maybeee) 10 events
// socket is an object

// Connected to WEIRD
let mySocketId;

// There are no cookies in socket IO
// there will be a different option

io.on("connection", socket => {
    console.log(`A socket with the id ${socket.id} just connected.`);

    // For no Cookies you can see something here. Like the info of the Cookie
    console.log(socket.request.headers);

    socket.emit("greeting", {
        message: "hi man"
    });

    // sends event to all users
    io.emit("newPlayer", {});

    // ALTERNATIV
    io.sockets.emit("newPlayer", {});

    //WEIRD -- sending Message to a specific socket
    if (mySocketId) {
        io.sockets.sockets[mySocketId].emit("targetedMessage");
    }

    socket.on("niceToBeHere", payload => console.log(payload));

    socket.on("disconnect", () => {
        console.log(`A socket with the id ${socket.id} just disconnected.`);
    });
});

// --> should work
