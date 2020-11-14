type Status = 'PENDING' | 'DONE' | 'CANCELED'

type FindOptions<Entity> = {
  where: {
    [key in keyof Entity]?: Entity[key]
  }
  select?: Array<keyof Entity>
}

type UpdateOptions<Entity> = {
  [key in keyof Entity]?: Entity[key]
}
