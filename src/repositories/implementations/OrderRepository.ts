import { Order } from '../../entities/Order';
import { IOrderRepository } from '../IOrderRepository'
import { Pool } from 'pg'

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

    /* 
      where clause example
     "WHERE name = $1 AND age = $2"
    */

    let whereClauseQuery = []
    const whereClauseValues = []

    if (options?.where) {
      let index = 1

      whereClauseQuery.push(' WHERE ')

      for (let key in options.where) {
        whereClauseQuery.push(`${key} = $${index}`, ' AND ')
        whereClauseValues.push(options.where[key])
        index++
      }

      whereClauseQuery.length = whereClauseQuery.length - 1
    }

    const selectedFiels = []

    if (options?.select) {
      options.select.forEach(field => {
        selectedFiels.push(field, ', ')
      })

      selectedFiels.length = selectedFiels.length - 1
    }

    const finalQuery = [
      'SELECT ',
      `${selectedFiels.length >= 1
        ? `(${selectedFiels.join('')}) `
        : '* '
      }`,
      'FROM Orders',
      `${whereClauseQuery.length >= 1
        ? whereClauseQuery.join('')
        : ''
      }`
    ].join('')

    console.log({ finalQuery })

    const orders = (await db.query<Order>(
      finalQuery, whereClauseValues
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