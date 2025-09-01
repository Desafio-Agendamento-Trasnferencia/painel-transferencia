export const maskConta = (value) => {
  if (!value) return ''

  let v = value.toString().replace(/\D/g, '')
  if (v.length > 3) v = v.slice(0, 3) + '.' + v.slice(3)
  if (v.length > 7) v = v.slice(0, 7) + '.' + v.slice(7)
  if (v.length > 11) v = v.slice(0, 11) + '-' + v.slice(11)
  if (v.length > 13) v = v.slice(0, 13)

  return v
}