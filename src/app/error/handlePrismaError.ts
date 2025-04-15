import { TErrorSource, TGenericErrorResponse } from "../interface/error";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";

const prismaClientKnownRequestError = (
  err: PrismaClientKnownRequestError
): TGenericErrorResponse => {
  console.log("prisma err", err);
  let statusCode: number;
  const errorSources: TErrorSource = [
    {
      path: err.meta?.modelName as string,
      message: err.message,
    },
  ];
  switch (err.code) {
    case "P2002":
      statusCode = 409;
      break;
    case "P2001":
    case "P2025":
      statusCode = 404;
      break;
    case "P2003":
    case "P2000":
    case "P2006":
    case "P2011":
      statusCode = 400;
      break;
    default:
      statusCode = 500;
  }

  return {
    statusCode,
    message: err.name || "PrismaClientKnownRequestError",
    errorSources: errorSources,
  };
};

export const PrismaError = { prismaClientKnownRequestError };
