import { z } from "zod";

const changePasswordValidationSchemaBody = z.object({
  oldPassword: z.string().min(6, "Password is required"),
  newPassword: z.string().min(6, "Password is required"),
});

const changePasswordValidationSchema = z.object({
  body: changePasswordValidationSchemaBody,
});

export const AuthValidation = {
  changePasswordValidationSchema,
  changePasswordValidationSchemaBody,
};
