import express from 'express'
import routes from './routes'
import http from 'http'
import { Server } from 'socket.io'
import { SocketIO } from './providers/socket'

const app = express()
const server = http.createServer(app)

const io = require('socket.io')(server)

app.use((req, _, next) => {
  const SocketIo = new SocketIO(io as Server)
  req.socketIo = SocketIo
  next()
})
app.use(express.json())
app.use(routes)

const PORT = 3333
server.listen(PORT, () => console.log(PORT))