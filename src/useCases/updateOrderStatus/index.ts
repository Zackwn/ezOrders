import { OrderRepository } from "../../repositories/implementations/OrderRepository";
import { UpdateOrderStatusController } from "./UpdateOrderStatusController";
import { UpdateOrderStatusUseCase } from "./UpdateOrderStatusUseCase";

const orderRepository = new OrderRepository()
const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository)
const updateOrderStatusController = new UpdateOrderStatusController(updateOrderStatusUseCase)

export default updateOrderStatusController