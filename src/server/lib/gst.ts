export const calculateGst = (amount: number, gstRate: number) => {
  const gst = (amount * gstRate) / 100;

  return gst;
};

export const addGst = (amount: number, gst: number) => {
  const gstAmount = calculateGst(amount, gst);

  const totalAmount = gstAmount + amount;

  return totalAmount;
};

export const removeGst = (amount: number, gstRate: number) => {
  const originalAmount = amount / (1 + gstRate / 100);

  return originalAmount;
};

export const splitGst = (amount: number, gstRate: number) => {
  const totalGst = calculateGst(amount, gstRate);

  const cgst = totalGst / 2;
  const sgst = totalGst / 2;

  return { cgst, sgst };
};

//For inter state transactions

export const calculateIgst = (amount: number, gstRate: number) => {
  const gst = calculateGst(amount, gstRate);

  return gst;
};
