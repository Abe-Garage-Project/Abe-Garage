// Display only. The backend remains authoritative for all money calculations.
export function formatMoney(value, currency = 'ETB') {
  return new Intl.NumberFormat('en-ET', { style: 'currency', currency }).format(Number(value));
}
