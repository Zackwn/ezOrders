import { UpdateOrderStatusUseCase } from "./UpdateOrderStatusUseCase";
import { Request, Response } from 'express'

export class UpdateOrderStatusController {
  updateOrderStatusUseCase: UpdateOrderStatusUseCase

  constructor(updateOrderStatusUseCase: UpdateOrderStatusUseCase) {
    this.updateOrderStatusUseCase = updateOrderStatusUseCase
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params
    const { status } = req.body

    const data = {
      id,
      status: status as Status
    }

    await this.updateOrderStatusUseCase.execute(data, req.socketIo)

    return res.send()
  }
}