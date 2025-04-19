import { z } from "zod";
import { AuthValidation } from "./auth.validation";

export type TChangePassword = z.infer<
  typeof AuthValidation.changePasswordValidationSchemaBody
>;
