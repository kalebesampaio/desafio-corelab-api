import "express-async-errors";
import express, { Application, json } from "express";
import helmet from "helmet";
import { GlobalErrors } from "./errors/GlobalErrors";
import { tasksRouter } from "./routes/task.routes";

const cors = require("cors");

const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(json());

const globalErrors = new GlobalErrors();

app.use("/tasks", tasksRouter);

app.use(globalErrors.handleErrors);

export default app;
