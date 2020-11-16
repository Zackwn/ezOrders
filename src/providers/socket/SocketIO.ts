import { Server } from 'socket.io'
import { ISocketIO } from './ISocketIO'

export class SocketIO implements ISocketIO {
  private socket: Server

  constructor(socket: Server) {
    this.socket = socket
  }

  async send(channel: Channels, message: any) {
    this.socket.emit(channel, message)
  }
}