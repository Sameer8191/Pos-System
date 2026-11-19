import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

  sku: z
    .string()
    .trim()
    .min(3, "SKU must be at least 3 characters")
    .max(30, "SKU cannot exceed 30 characters")
    .regex(
      /^[A-Z0-9-]+$/,
      "Only uppercase letters, numbers, and hyphens are allowed",
    ),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  price: z
    .number()
    .positive("Price must be greater than zero")
    .multipleOf(0.01, "Price can have at most 2 decimal places"),

  costPrice: z
    .number()
    .nonnegative("Price must not be negative")
    .multipleOf(0.01, "Price can have at most 2 decimal places"),

  barcode: z
    .string()
    .trim()
    .max(50, "Barcode cannot exceed 50 characters")
    .optional(),

  categoryId: z.string().trim().min(1, "Category is required"),

  imageUrl: z.url("Please enter a valid image URL").optional(),

  isActive: z.boolean().default(true),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema
  .omit({ isActive: true })
  .extend({
    isActive: z.boolean().optional(),
  })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided",
  );

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
