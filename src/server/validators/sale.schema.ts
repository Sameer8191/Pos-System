import { z } from "zod";

export const saleItemSchema = z.object({
  productId: z.string().trim().min(1, "Product is required"),

  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .positive("Quantity must be greater than zero"),
});

export type SaleItemInput = z.infer<typeof saleItemSchema>;

export const createSaleSchema = z.object({
  items: z
    .array(saleItemSchema)
    .min(1, "A sale must contain at least one item"),

  customerId: z.string().trim().min(1, "Invalid customer ID").optional(),

  discount: z
    .number()
    .nonnegative("Discount cannot be negative")
    .multipleOf(0.01, "Discount can have at most 2 decimal places")
    .default(0),

  paymentMethod: z.enum(
    ["CASH", "CARD", "UPI", "OTHER"],
    "Please select a valid payment method",
  ),

  amountPaid: z
    .number()
    .nonnegative("Amount paid cannot be negative")
    .multipleOf(0.01, "Amount paid can have at most 2 decimal places"),

  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>;
