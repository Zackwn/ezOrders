import { IOrderRepository } from "../../repositories/IOrderRepository";
import { IUpdateOrderStatusDTO } from "./UpdateOrderStatusDTO";

export class UpdateOrderStatusUseCase {
  orderRepository: IOrderRepository

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(data: IUpdateOrderStatusDTO) {
    const updatedOrder = await this.orderRepository.update({
      status: data.status
    }, data.id)
    return updatedOrder
  }
} 