import { buildFindQuery } from '../../src/modules/queryBuilder/select'

describe('Select QueryBuilder Module Tests', () => {
  it('should build a "select all" query', (done) => {
    const { query } = buildFindQuery()
    expect(query).toBe("SELECT * FROM Orders")
    done()
  })

  it('should build a "select where" query', (done) => {
    const descriptionValue = '...'
    const result = buildFindQuery({
      where: {
        description: {
          operator: 'LIKE',
          value: descriptionValue
        }
      }
    })

    expect(JSON.stringify(result)).toBe(JSON.stringify({
      query: "SELECT * FROM Orders WHERE description LIKE $1",
      values: [`%${descriptionValue}%`]
    }))
    done()
  })

  it('should build a "select ...fiels" query', (done) => {
    const fields = ['description', 'id']
    const { query } = buildFindQuery({
      select: fields
    })
    expect(query).toBe(`SELECT ${fields.join(', ')} FROM Orders`)
    done()
  })
})