import bcrypt from "bcrypt";
import config from "../../config";

const hashedPassword = (password: string): string => {
  return bcrypt.hashSync(password, config.saltRounds);
};

export const UserUtils = { hashedPassword };
