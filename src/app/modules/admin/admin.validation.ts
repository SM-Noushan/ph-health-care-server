import { z } from "zod";

const commonAdminValidationSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  profilePhoto: z.string().url("Invalid URL").optional(),
  contactNumber: z.string().min(6, "Contact number is required"),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().trim().min(6, "Password is required"),
    admin: z.object({
      email: z.string().trim().email(),
      ...commonAdminValidationSchema.shape,
    }),
  }),
});

const updateAdminValidationSchema = z.object({
  body: commonAdminValidationSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one valid field must be provided for update.",
    }),
});

export const adminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
