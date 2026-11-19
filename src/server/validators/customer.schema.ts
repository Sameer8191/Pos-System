import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z.email("Please enter a valid email address").trim().toLowerCase(),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),

  address: z
    .string()
    .trim()
    .max(250, "Address cannot exceed 250 characters")
    .optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
