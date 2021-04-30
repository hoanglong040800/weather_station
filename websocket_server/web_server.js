const http = require('http')
const WebSocket = require('ws')
const express = require('express')
const ip = require('ip')
const exphbs = require('express-handlebars')

// Setup server
const app = express()
const server = http.createServer(app)
const ws = new WebSocket.Server({
  server,
})

var weatherdata = {
  tempeture: 37,
  humidity: 15,
  pressure: 5,
  altitude: 10,
}

// Setup template engine
app.engine('hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')

// Socket
ws.on('connection', function (socket) {
  socket.on('message', function (message) {
    console.log(message)
  })

  socket.on('weather data', function (data) {
    console.log(data)
  })

  socket.on('ping', function () {
    console.log('Got a ping from client')
  })
})

// Routing
app.get('/', (req, res) => {
  res.render('home', { layout: false, weatherdata: weatherdata })
})

// Server listening
server.listen((PORT = 3333), function () {
  console.log(`Server is listening at ${ip.address()}:${PORT}`)
})
