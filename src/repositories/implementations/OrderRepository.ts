import { Order } from '../../entities/Order';
import { IOrderRepository } from '../IOrderRepository'
import { Pool } from 'pg'
import { buildFindQuery } from '../../modules/queryBuilder/select';

export class OrderRepository implements IOrderRepository {
  private connection: Pool

  constructor() {
    this.connection = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'ezorders',
      password: 'docker',
      port: 5432,
    })
  }

  async find(options?: FindOptions<Order>) {
    const db = await this.connection.connect()

    const { query, values } = buildFindQuery(options)

    console.log({ query })

    const orders = (await db.query<Order>(
      query, values
    )).rows

    db.release()
    return orders
  }

  async store(order: Order) {
    const db = await this.connection.connect()
    await db.query(`
      INSERT INTO Orders (
        id, 
        "table",
        description,
        status
      ) VALUES (
        $1, 
        $2,
        $3,
        $4
      );`,
      [
        order.id,
        order.table,
        order.description,
        order.status
      ]
    )
    db.release()
  }

  async update(order: Order, id: Pick<Order, 'id'>) {
    return {} as Order
  }
}