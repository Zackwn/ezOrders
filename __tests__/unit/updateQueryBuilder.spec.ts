import { buildUpdateQuery } from '../../src/modules/queryBuilder/update'

describe('Update QueryBuilder Module Tests', () => {
  it('should build a update query', (done) => {
    const id = 'id'
    const status = "DONE"
    const result = buildUpdateQuery({ status }, id)
    expect(JSON.stringify(result)).toBe(JSON.stringify({
      query: "UPDATE Orders SET status = $1 WHERE id = $2",
      values: [status, id]
    }))
    done()
  })
})
