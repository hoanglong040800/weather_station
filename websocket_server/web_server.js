// const express = require('express')
// const http = require('http')
// const ip = require('ip')
// const { Server } = require('socket.io')

// app = express()
// const server = http.createServer(app)
// const io = new Server(server)

// server.listen((port = 3333), function () {
//   console.log(`Server is running at ${ip.address()}:${port}`)
// })

// io.on('connection', function (socket) {
//   console.log('ESP8266 connected')
//   socket.on('disconnect', function () {
//     console.log('Disconnected')
//   })
//   socket.on('error', function (err) {
//     console.log(err);
//   })
// })




// app.get('/', function (req, res) {
//   res.send('<h1>Hello world</h1>')
// })

  
var http = require("http");
var WebSocket = require("ws");
var express = require("express");
var app = express();

var server = http.createServer(app);
var ws = new WebSocket.Server({
  server,
  // path: "/ws", 
});

app.get("/", (req, res) => {
  res.send(`<h1> hello world </h1>`);
});

ws.on("connection", function (socket) {
  socket.on("message", function (message) {
    console.log(message);
    ws.clients.forEach(function (client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  socket.on("ping", function(){
    console.log("hello");
  })
});

server.listen(3333);
console.log("Server listening on port 3333");
