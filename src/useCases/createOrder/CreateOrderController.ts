import { Request, Response } from 'express'
import { CreateOrderUseCase } from './CreateOrderUseCase'
import { ICreateOrderDTO } from './ICreateOrderDTO'

export class CreateOrderController {
  createOrderUseCase: CreateOrderUseCase

  constructor(createOrderUseCase: CreateOrderUseCase) {
    this.createOrderUseCase = createOrderUseCase
  }

  async handle(req: Request, res: Response) {
    const {
      description,
      table
    } = req.body

    const data = {
      description,
      table
    }

    try {
      await this.createOrderUseCase.execute(data)
    } catch (error) {
      console.log(error)
    }

    res.json('OK')
  }
}