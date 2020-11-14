import { v4 as generateId } from 'uuid'

export class Order {
  id: string
  table: number
  description: string
  status: Status

  constructor(data: Omit<Order, 'id' | 'status'>, id?: string) {
    Object.assign(this, data)

    this.status = 'PENDING'

    if (!id) {
      this.id = generateId()
    }
  }
}