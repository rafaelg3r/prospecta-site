const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** "R$ 1.490" or "R$ 3.490 a R$ 4.490" (plain words, no dash). */
export function formatPrice(min: number, max: number = min) {
  return min === max ? brl.format(min) : `${brl.format(min)} a ${brl.format(max)}`;
}
