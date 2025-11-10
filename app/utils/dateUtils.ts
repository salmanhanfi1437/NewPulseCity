export const getNextMonthDate = (): string => {
  const today = new Date();
  const nextMonthDate = new Date(today);
  nextMonthDate.setMonth(today.getMonth() + 1);

  // Format as dd/mm/yyyy
  const day = String(nextMonthDate.getDate()).padStart(2, '0');
  const month = String(nextMonthDate.getMonth() + 1).padStart(2, '0');
  const year = nextMonthDate.getFullYear();

  return `${day}-${month}-${year}`;
};


export const getNextNDaysDate = (days: number): string => {
  const today = new Date();
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + days);

  const day = String(nextDate.getDate()).padStart(2, '0');
  const month = String(nextDate.getMonth() + 1).padStart(2, '0');
  const year = nextDate.getFullYear();

  return `${day}-${month}-${year}`;
};