import { z } from "zod";

export const stockAdjustmentSchema = z.object({
  productId: z.string().trim().min(1, "Product is required"),

  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .positive("Quantity must be greater than zero"),

  adjustmentType: z.enum(["IN", "OUT"]),

  reason: z.enum(["PURCHASE", "RETURN", "DAMAGE", "CORRECTION", "EXPIRED"]),

  note: z
    .string()
    .trim()
    .max(500, "Note cannot exceed 500 characters")
    .optional(),
});

export type StockAdjustmentInput = z.infer<typeof stockAdjustmentSchema>;
