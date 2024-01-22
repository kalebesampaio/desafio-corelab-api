import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import taskRepository from "../repositories/task.repository";
import { Task } from "../entities/task.entity";

export class TaskMiddlewares {
  verifyTaskId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = Number(req.params.id);
    const task: Task | null = await taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new AppError(404, "Task not found.");
    }

    res.locals.TaskId = id;

    return next();
  };
}
