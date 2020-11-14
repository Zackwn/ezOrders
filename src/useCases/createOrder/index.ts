import { CreateOrderController } from './CreateOrderController'
import { CreateOrderUseCase } from './CreateOrderUseCase'
import { OrderRepository } from '../../repositories/implementations/OrderRepository'

const orderRepository = new OrderRepository()
const createOrderUseCase = new CreateOrderUseCase(orderRepository)
const createOrderController = new CreateOrderController(createOrderUseCase)

export default createOrderController