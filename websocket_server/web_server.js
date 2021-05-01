const exphbs = require('express-handlebars')
const ip = require('ip')
const app = require('express')()
const server = require('http').createServer(app)
const WebSocket = require('ws')
const ws = new WebSocket.Server({
  server,
})

var weatherdata = {
  tempeture: 37,
  humidity: 15,
  pressure: 5,
  altitude: 10,
}

// Receive data
function receiveWeatherData(data) {
  weatherarr = data.split(',')

  let i = 0
  for (var key in weatherdata) {
    weatherdata[key] = parseFloat(weatherarr[i++])
  }

  console.log(weatherdata)
}

// Socket
ws.on('connection', function (client) {
  console.log('\n----- A client connected -----\n')

  client.on('message', function (message) {
    // Receive weather data
    if (message === 'weather data') {
      client.on('message', function (data) {
        receiveWeatherData(data)
      })
    }
    // Sth else
    else console.log(`Got message: ${message}`)
  })

  client.on('close', function () {
    console.log('A client disconnected')
  })
})

// Template engine
app.engine('hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', 'hbs')

// Routing
app.get('/', (req, res) => {
  res.render('home', { layout: false, weatherdata: weatherdata })
})

// Server listening
server.listen((PORT = 3333), function () {
  console.log(`Server is listening at ${ip.address()}:${PORT}`)
})
