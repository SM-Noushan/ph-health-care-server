import cors from "cors";
import router from "./app/routes";
import express, { Application, Request, Response } from "express";

const app: Application = express();
app.use(cors());

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the PH_HealthCare API");
});

export default app;
