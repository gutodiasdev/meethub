export function formatCurrency(value: string | number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
  })
}