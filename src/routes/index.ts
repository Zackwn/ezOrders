import { Router } from 'express'

import createOrder from '../useCases/createOrder'
import findOrders from '../useCases/findOrders'
import updateOrderStatus from '../useCases/updateOrderStatus'

const routes = Router()

routes.post('/orders', (req, res) => {
  createOrder.handle(req, res)
})

// "/orders?description=###"
routes.get('/orders', async (req, res) => {
  findOrders.handle(req, res)
})

routes.patch('/orders/:id/status', async (req, res) => {
  updateOrderStatus.handle(req, res)
})

export default routes