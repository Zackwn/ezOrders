import { Order } from '../../entities/Order';
import { IOrderRepository } from '../IOrderRepository'
import { Pool } from 'pg'
import { buildFindQuery } from '../../modules/queryBuilder/select';
import { buildUpdateQuery } from '../../modules/queryBuilder/update';
import { databaseConfig } from '../../constants';

export class OrderRepository implements IOrderRepository {
  private connection: Pool

  constructor() {
    this.connection = new Pool(databaseConfig)
  }

  async find(options?: FindOptions<Order>) {
    const db = await this.connection.connect()

    const { query, values } = buildFindQuery(options)

    console.log({ query, values })

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

  async update(fields: UpdateOptions<Omit<Order, "id">>, id: string) {
    const db = await this.connection.connect()

    const { query, values } = buildUpdateQuery(fields, id)

    console.log({ query, values })

    await db.query(query, values)

    db.release()
  }
}