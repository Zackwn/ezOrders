export interface ISocketIO {
  send(channel: Channels, message: any): void
}