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

export const calculateDiscountedPrice = (
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
  const taxAmount = calculateTax(amount, taxPercentage);
  const totalAmount = taxAmount + amount;

  return totalAmount;
};

export const calculateSubTotal = (items: CartItem[]) => {
  return items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};

export const calculateCartDiscount = (
  subtotal: number,
  discountPercentage: number,
) => {
  const discountAmount = calculatePercentage(subtotal, discountPercentage);

  return discountAmount;
};

export const calculateCartTax = (
  taxableAmount: number,
  taxPercentage: number,
) => {
  const taxAmount = calculateTax(taxableAmount, taxPercentage);

  return taxAmount;
};

export const calculateCartTotal = (
  subtotal: number,
  discountAmount: number,
  taxAmount: number,
) => {
  const totalAmount = subtotal - discountAmount + taxAmount;

  return totalAmount;
};

export const calculateItemTotal = (price: number, quantity: number) => {
  const itemAmount = price * quantity;
  return itemAmount;
};

export const formatPriceWithoutCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
