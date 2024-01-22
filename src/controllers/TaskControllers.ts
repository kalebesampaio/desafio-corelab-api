import { Request, Response } from "express";
import { TaskServices } from "../services/TaskServices";
import { TaskArray, TaskRead } from "../interfaces/tasks.interfaces";

export class TaskControllers {
  private taskService = new TaskServices();

  createTask = async (req: Request, res: Response): Promise<Response> => {
    const newTask: TaskRead = await this.taskService.createTask(req.body);

    return res.status(201).json(newTask);
  };

  getTasks = async (req: Request, res: Response): Promise<Response> => {
    const tasks: TaskArray = await this.taskService.getTasks();

    return res.status(200).json(tasks);
  };

  retrieveTask = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(res.locals.TaskId);

    const taskFound: TaskRead = await this.taskService.retrieveTask(id);

    return res.status(200).json(taskFound);
  };
  updateTask = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(res.locals.TaskId);

    const updatedTask = await this.taskService.updateTask(id, req.body);

    return res.status(200).json(updatedTask);
  };
  deleteTask = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(res.locals.TaskId);
    await this.taskService.deleteTask(id);

    return res.status(204).send();
  };
}
