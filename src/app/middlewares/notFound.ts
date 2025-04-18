import status from "http-status";
import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "API Not Found!!",
    errorSources: [
      {
        path: `${req.method} ${req.originalUrl}`,
        message: "This route is not defined",
      },
    ],
  });
};

export default notFound;
