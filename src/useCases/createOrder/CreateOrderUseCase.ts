import { Order } from '../../entities/Order'
import { ISocketIO } from '../../providers/socket/ISocketIO'
import { IOrderRepository } from '../../repositories/IOrderRepository'
import { ICreateOrderDTO } from './ICreateOrderDTO'

export class CreateOrderUseCase {
  orderRepository: IOrderRepository

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(data: ICreateOrderDTO, socket: ISocketIO) {
    const newOrder = new Order(data)

    console.log({ newOrder })

    await this.orderRepository.store(newOrder)

    socket.send('newOrder', { message: 'New Order', order: newOrder })
  }
}