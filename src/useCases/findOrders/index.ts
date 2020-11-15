import { FindOrdersController } from './FindOrdersController'
import { FindOrdersUseCase } from './FindOrdersUseCase'
import { OrderRepository } from '../../repositories/implementations/OrderRepository'

const orderRepository = new OrderRepository()
const findOrdersUseCase = new FindOrdersUseCase(orderRepository)
const findOrdersController = new FindOrdersController(findOrdersUseCase)

export default findOrdersController