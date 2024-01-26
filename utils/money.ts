const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
});

export const formatCurrency = (money: number) => {
  return currency.format(money);
};
