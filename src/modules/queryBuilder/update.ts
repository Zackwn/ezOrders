import { Order } from "../../entities/Order";

export function buildUpdateQuery(fields: UpdateOptions<Omit<Order, "id">>, id: string) {
  let updateFields = []
  let updateValues = []

  let index = 1

  if (fields) {
    for (let key in fields) {
      updateFields.push(`${key} = $${index} `, ', ')
      updateValues.push(fields[key])
      index++
    }
    updateFields.length = updateFields.length - 1
  }

  updateValues.push(id)

  const finalQuery = [
    `UPDATE Orders `,
    `SET ${updateFields.join('')}`,
    `WHERE id = $${index}`
  ].join('')

  return { query: finalQuery, values: updateValues }
}