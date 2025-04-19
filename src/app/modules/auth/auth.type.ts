import { z } from "zod";
import { AuthValidation } from "./auth.validation";

export type TChangePassword = z.infer<
  typeof AuthValidation.changePasswordValidationSchemaBody
>;

export type TResetPassword = z.infer<
  typeof AuthValidation.resetPasswordValidationSchemaBody
>;
