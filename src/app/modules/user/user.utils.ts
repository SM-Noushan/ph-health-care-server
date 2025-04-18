import bcrypt from "bcrypt";
import config from "../../config";

const hashedPassword = (password: string): string => {
  return bcrypt.hashSync(password, config.saltRounds);
};

const comparePassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

export const UserUtils = { hashedPassword, comparePassword };
