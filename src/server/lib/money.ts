export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const roundMoney = (amount: number) => {
  const money = Math.round(amount * 100) / 100;
  return money;
};

export const calculatePercentage = (amount: number, percentage: number) => {
  const percentageAmount = (amount * percentage) / 100;
  return percentageAmount;
};

export const calculateDiscount = (
  amount: number,
  discountPercentage: number,
) => {
  const discountAmount = (amount * discountPercentage) / 100;

  const finalPrice = amount - discountAmount;

  return finalPrice;
};

export const calculateTax = (amount: number, taxPercentage: number) => {
  const taxAmount = calculatePercentage(amount, taxPercentage);

  return taxAmount;
};

export const calculateTotalWithTax = (
  amount: number,
  taxPercentage: number,
) => {
  const taxAmount = calculatePercentage(amount, taxPercentage);
  const totalAmount = taxAmount + amount;

  return totalAmount;
};

export const calculateSubTotal = (items: CartItem[]) => {
  return items.reduce((acc, item) => {
    return (acc + item.price * item.quantity);
  }, 0);
};
