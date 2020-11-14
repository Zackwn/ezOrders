import { Router } from 'express'

import createOrder from '../useCases/createOrder'

const routes = Router()

routes.post('/orders', (req, res) => {
  createOrder.handle(req, res)
})

export default routes