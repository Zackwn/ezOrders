import { Order } from '../entities/Order'

export interface IOrderRepository {
  find(options: FindOptions<Order>): Promise<Order[]>
  store(order: Order): Promise<void>
  update(order: Order, id: Pick<Order, 'id'>): Promise<Order>
}