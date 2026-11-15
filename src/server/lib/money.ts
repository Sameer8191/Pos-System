export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

export const roundMoney = (amount: number): number => {
  return Math.round(amount * 100) / 100;
};

export const calculatePercentage = (
  amount: number,
  percentage: number,
): number => {
  return (amount * percentage) / 100;
};

export const calculateDiscountedPrice = (
  amount: number,
  discountPercentage: number,
): number => {
  return amount - calculatePercentage(amount, discountPercentage);
};

export const calculateTax = (amount: number, taxPercentage: number): number => {
  return calculatePercentage(amount, taxPercentage);
};

export const calculateTotalWithTax = (
  amount: number,
  taxPercentage: number,
): number => {
  return amount + calculateTax(amount, taxPercentage);
};

export const calculateSubTotal = (items: CartItem[]): number => {
  return items.reduce(
    (subtotal, item) =>
      subtotal + calculateItemTotal(item.price, item.quantity),
    0,
  );
};

export const calculateCartDiscount = (
  subtotal: number,
  discountPercentage: number,
): number => {
  return calculatePercentage(subtotal, discountPercentage);
};

// export const calculateCartTax = (
//   taxableAmount: number,
//   taxPercentage: number,
// ): number => {
//   return calculateTax(taxableAmount, taxPercentage);
// };

export const calculateCartTotal = (
  subtotal: number,
  discountAmount: number,
  taxAmount: number,
): number => {
  return subtotal - discountAmount + taxAmount;
};

export const calculateItemTotal = (price: number, quantity: number): number => {
  return price * quantity;
};

export const formatPriceWithoutCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
