const toDecimal = (num: number, locale = 'id-ID') => {
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(num);
};

const formatCurrency = (amount: number) => `Rp${toDecimal(amount)}`;

export const numberUtils = {
  toDecimal,
  formatCurrency,
};
