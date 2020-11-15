import { Request, Response } from "express";
import { FindOrdersUseCase } from "./FindOrdersUseCase";


export class FindOrdersController {
  findOrdersUseCase: FindOrdersUseCase

  constructor(findOrdersUseCase: FindOrdersUseCase) {
    this.findOrdersUseCase = findOrdersUseCase
  }

  async handle(req: Request, res: Response) {
    const {
      description
    } = req.query

    const params = { description: description as string }

    try {
      const orders = await this.findOrdersUseCase.execute(params)
      return res.json(orders)
    } catch (error) {
      console.log(error)
    }
  }
}