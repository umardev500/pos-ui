const toDecimal = (num: number, locale = 'id-ID') => {
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(num);
};

export const numberUtils = {
  toDecimal,
};
