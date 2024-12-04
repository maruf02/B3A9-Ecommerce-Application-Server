import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
// import router from "./app/routes";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/globalErrorHandler";
// import { bookRoutes } from "./app/modules/Books/books.route";
// import { memberRoutes } from "./app/modules/members/members.route";
// import { borrowReturnRoutes } from "./app/modules/BRBooks/BRBooks.route";

// import globalErrorHandler from "./app/globalErrorHandler";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all apis
// app.use("/api", bookRoutes);
// app.use("/api", memberRoutes);
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
