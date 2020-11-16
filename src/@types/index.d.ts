import { ISocketIO } from '../providers/socket/ISocketIO'

declare global {
  namespace Express {
    interface Request {
      socketIo: ISocketIO
    }
  }

  type Channels = 'newOrder' | 'changeOrderStatus'

  type Status = 'PENDING' | 'DONE' | 'CANCELED'

  /**
   * @param operator SQL Comparison Operators and "LIKE" Operator, default value is "="
   */
  type FindOptions<Entity> = {
    where?: {
      [key in keyof Entity]?: {
        operator?: string = "="
        value: Entity[key]
      }
    }
    select?: Array<keyof Entity>
  }

  type UpdateOptions<Entity> = {
    [key in keyof Entity]?: Entity[key]
  }
}