import { Order } from '../entities/Order'

export interface IOrderRepository {
  find(options?: FindOptions<Order>): Promise<Order[]>
  store(order: Order): Promise<void>
  update(fields: UpdateOptions<Omit<Order, "id">>, id: string): Promise<Order>
}