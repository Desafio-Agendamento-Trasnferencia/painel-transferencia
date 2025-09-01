export const formatarData = (valor) => {
  if (!valor) return ''
  const [ano, mes, dia] = valor.split('-')
  return `${dia}/${mes}/${ano}`
}


export const formatarDataHora = (valor) => {
  if (!valor) return ''
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(valor))
}
