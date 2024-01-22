import "express-async-errors";
import express, { Application, json } from "express";
import helmet from "helmet";
const cors = require("cors");

const app: Application = express();
app.use(cors());
app.use(helmet());
app.use(json());

export default app;
