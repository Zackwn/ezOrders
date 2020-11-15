
export function buildFindQuery(options: FindOptions<any>) {
  let whereClauseQuery = []
  const whereClauseValues = []

  if (options?.where) {
    let index = 1

    whereClauseQuery.push(' WHERE ')

    for (let key in options.where) {
      whereClauseQuery.push(`${key} = $${index}`, ' AND ')
      whereClauseValues.push(options.where[key])
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