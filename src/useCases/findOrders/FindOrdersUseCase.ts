import { Order } from "../../entities/Order";
import { IOrderRepository } from "../../repositories/IOrderRepository";
import { FindOrderDTO } from "./FindOrderDTO";

export class FindOrdersUseCase {
  orderRepository: IOrderRepository

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository
  }

  async execute(params: FindOrderDTO) {
    let options: FindOptions<Order> | undefined
    if (params.description) {
      options = {
        where: {
          description: params.description
        }
      }
    }
    const orders = this.orderRepository.find(options)
    return orders
  }
}