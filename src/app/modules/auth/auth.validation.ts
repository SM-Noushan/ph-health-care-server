import { z } from "zod";

const changePasswordValidationSchemaBody = z.object({
  oldPassword: z.string().min(6, "Password is required"),
  newPassword: z.string().min(6, "Password is required"),
});

const changePasswordValidationSchema = z.object({
  body: changePasswordValidationSchemaBody,
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Email is required"),
  }),
});

const resetPasswordValidationSchemaBody = z.object({
  id: z.string().uuid("Invalid id"),
  password: z.string().min(6, "Password is required"),
});

const resetPasswordValidationSchema = z.object({
  body: resetPasswordValidationSchemaBody,
});

export const AuthValidation = {
  changePasswordValidationSchema,
  changePasswordValidationSchemaBody,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchemaBody,
  resetPasswordValidationSchema,
};
