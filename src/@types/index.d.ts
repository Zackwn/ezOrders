type Status = 'PENDING' | 'DONE' | 'CANCELED'

/**
 * @param operator SQL Comparison Operators and "LIKE" Operator, default value is "="
 */
type FindOptions<Entity> = {
  where: {
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
