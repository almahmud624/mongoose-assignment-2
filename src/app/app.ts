import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { userRoutes } from "./models/user/user.route";
const app = express();
const router = express.Router();

// parser
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Assignment");
});

// error handling middleware
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const code = error?.code || 500;
  const message = error?.message;
  res.status(code).send({
    success: false,
    message: code === 404 ? message : "Something went wrong",
    error: {
      code: code,
      description: code === 404 ? message : error || "Internal Server Error",
    },
  });
};

app.use(errorHandler);

export default app;
