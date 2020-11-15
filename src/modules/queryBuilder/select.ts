
export function buildFindQuery(options: FindOptions<any>) {
  let whereClauseQuery = []
  const whereClauseValues = []

  if (options?.where) {
    let index = 1

    whereClauseQuery.push(' WHERE ')

    for (let key in options.where) {
      const operator = options.where[key].operator || "="
      whereClauseQuery.push(`${key} ${operator} $${index}`, ' AND ')
      const whereClauseValue = [options.where[key].value]
      if (operator === "LIKE") {
        whereClauseValue.unshift('%')
        whereClauseValue.push('%')
      }
      whereClauseValues.push(whereClauseValue.join(''))
      index++
    }

    whereClauseQuery.length = whereClauseQuery.length - 1
  }

  const selectedFiels = []

  if (options?.select) {
    options.select.forEach(field => {
      selectedFiels.push(field, ', ')
    })

    selectedFiels.length = selectedFiels.length - 1
  }

  const finalQuery = [
    'SELECT ',
    `${selectedFiels.length >= 1
      ? `${selectedFiels.join('')} `
      : '* '
    }`,
    'FROM Orders',
    `${whereClauseQuery.length >= 1
      ? whereClauseQuery.join('')
      : ''
    }`
  ].join('')

  return { query: finalQuery, values: whereClauseValues }
}