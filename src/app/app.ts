import cors from "cors";
import express, { Request, Response } from "express";
import { userRoutes } from "./models/user/user.route";
const app = express();
const router = express.Router();

// parser
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Assignment");
});

export default app;
