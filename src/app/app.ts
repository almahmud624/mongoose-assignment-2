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
  const statusCode = error?.statusCode || 500;
  const message = error?.message;
  res.status(statusCode).json({
    success: false,
    message: message || "Something went wrong",
    error: {
      code: statusCode,
      description: message || "Internal Server Error",
    },
  });
};

app.use(errorHandler);

export default app;
