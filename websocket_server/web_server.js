const express = require('express')
const http = require('http')
const ip = require('ip')
const { Server } = require('socket.io')

app = express()
const server = http.createServer(app)
const io = new Server(server)

server.listen((port = 3333), function () {
  console.log(`Server is running at ${ip.address()}:${port}`)
})

io.on('connection', function (socket) {
  console.log('ESP8266 connected')

  io.on('disconnect', function () {
    console.log('Disconnected')
  })
})

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>')
})
