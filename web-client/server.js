
var aedes = require('aedes')()
var colors = require('colors/safe')
var server = require('net').createServer(aedes.handle)
var httpServer = require('http').createServer()
var ws = require('websocket-stream')
var port = 1883
var wsPort = 3000

server.listen(port, function () {
  console.log(colors.green('[MQTT] Listening on port'), port)
})

ws.createServer({
  server: httpServer
}, aedes.handle)

httpServer.listen(wsPort, function () {
  console.log(colors.green('[MQTT] Websocket listening on port'), wsPort)
})

aedes.on('clientError', function (client, err) {
  console.log(colors.red('[MQTT] Client error'), client.id, err.message, err.stack)
})

aedes.on('connectionError', function (client, err) {
  console.log(colors.red('[MQTT] Client connection error'), client, err.message, err.stack)
})

aedes.on('publish', function (packet, client) {
  if (client) {
    console.log(colors.green('[MQTT] Message from client'), client.id)
  }
})

aedes.on('subscribe', function (subscriptions, client) {
  if (client) {
    console.log(colors.green('[MQTT] Subscribe from client'), subscriptions, client.id)
  }
})

aedes.on('client', function (client) {
  console.log(colors.green('[MQTT] New client'), client.id)
})
