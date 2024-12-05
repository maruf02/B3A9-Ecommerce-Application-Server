import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import router from "./app/routes";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/globalErrorHandler";
import { userRoutes } from "./app/modules/Users/user.route";
import { AuthRoutes } from "./app/modules/Auth/auth.route";
// import { bookRoutes } from "./app/modules/Books/books.route";
// import { memberRoutes } from "./app/modules/members/members.route";
// import { borrowReturnRoutes } from "./app/modules/BRBooks/BRBooks.route";

// import globalErrorHandler from "./app/globalErrorHandler";

const app: Application = express();
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://car-rental-project-kappa.vercel.app",
      "*",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all apis
app.use("/api", AuthRoutes);
app.use("/api", userRoutes);
// app.use("/api", borrowReturnRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Peracommerce server is running..",
  });
});

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
