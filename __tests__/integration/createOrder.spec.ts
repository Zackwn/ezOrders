import { Socket } from 'socket.io-client'
import request from 'superagent'
import { server } from '../../src/app'
import { Order } from '../../src/entities/Order'
const ioClient = require('socket.io-client')
import { Server as IServer } from 'http'

let socketClient: Socket
let Server: IServer
describe("create Order useCase tests", () => {
  beforeAll((done) => {
    Server = server.listen(3333)
    socketClient = ioClient("http://localhost:3333")
    done()
  })

  afterAll((done) => {
    socketClient.disconnect()
    Server.close()
    done()
  })

  // failing because socket is not up
  it('should create a new Order and send it by socket', async (done) => {
    const orderData = {
      table: 1,
      description: 'test order'
    }

    socketClient.on("newOrder", (order: Order) => {
      expect(order.description).toBe(orderData.description)
      done()
    })

    await request.post("http://localhost:3333/orders").send(orderData)

    jest.setTimeout(1000 * 10)
  })
})