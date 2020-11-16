import { ISocketIO } from "../../providers/socket/ISocketIO";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IUpdateOrderStatusDTO } from "./UpdateOrderStatusDTO";

export class UpdateOrderStatusUseCase {
  orderRepository: IOrderRepository

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(data: IUpdateOrderStatusDTO, socket: ISocketIO) {
    await this.orderRepository.update({
      status: data.status
    }, data.id)

    const order = await this.orderRepository.find({
      where: { id: { value: data.id } }
    })

    socket.send('changeOrderStatus', order)

    return order
  }
} 