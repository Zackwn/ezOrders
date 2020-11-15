import { Router } from 'express'
import { OrderRepository } from '../repositories/implementations/OrderRepository'

import createOrder from '../useCases/createOrder'
import findOrders from '../useCases/findOrders'

const routes = Router()

routes.post('/orders', (req, res) => {
  createOrder.handle(req, res)
})

// "/orders?description=###"
routes.get('/orders', async (req, res) => {
  findOrders.handle(req, res)
})

export default routes