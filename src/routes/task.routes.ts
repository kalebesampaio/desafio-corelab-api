import { Router } from "express";
import { TaskControllers } from "../controllers/TaskControllers";
import { TaskMiddlewares } from "../middlewares/Tasks.middlewares";
import { GlobalErrors } from "../errors/GlobalErrors";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/tasks.schemas";

export const tasksRouter = Router();
const taskControllers = new TaskControllers();
const taskMiddlewares = new TaskMiddlewares();
const globalErrors = new GlobalErrors();

tasksRouter.post(
  "/",
  globalErrors.validateBody({ body: taskCreateSchema }),
  taskControllers.createTask
);

tasksRouter.get("/", taskControllers.getTasks);

tasksRouter.use("/:id", taskMiddlewares.verifyTaskId);

tasksRouter.get("/:id", taskControllers.retrieveTask);

tasksRouter.patch("/:id", taskControllers.updateTask);

tasksRouter.delete("/:id", taskControllers.deleteTask);
