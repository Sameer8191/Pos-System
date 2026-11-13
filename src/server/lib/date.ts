export const getFinancialYear = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  let startYear: number;

  if (month >= 3) {
    startYear = year;
  } else {
    startYear = year - 1;
  }
  const endYear = startYear + 1;

  const financialYear = `${startYear}-${String(endYear).slice(-2)}`;

  return financialYear;
};

export const getFinancialYearStart = (date: Date): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  let startYear: number;
  if (month >= 3) {
    startYear = year;
  } else {
    startYear = year - 1;
  }
  const startDate = new Date(startYear, 3, 1);

  return startDate;
};

export const getFinancialYearEnd = (date: Date): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  let startYear: number;
  if (month >= 3) {
    startYear = year;
  } else {
    startYear = year - 1;
  }
  const endYear = startYear + 1;

  const endDate = new Date(endYear, 2, 31);

  return endDate;
};
