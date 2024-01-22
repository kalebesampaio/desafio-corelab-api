import {
  CreateTask,
  TaskRead,
  UpdateTask,
  TaskArray,
} from "../interfaces/tasks.interfaces";
import taskRepository from "../repositories/task.repository";
import { taskSchema, taskArraySchema } from "../schemas/tasks.schemas";
import { AppError } from "../errors/AppError";

export class TaskServices {
  createTask = async (taskData: CreateTask): Promise<TaskRead> => {
    const task: TaskRead = taskRepository.create({
      ...taskData,
    });

    await taskRepository.save(task);

    return taskSchema.parse(task);
  };

  getTasks = async (): Promise<TaskArray> => {
    const tasks: TaskArray = await taskRepository.find();
    return taskArraySchema.parse(tasks);
  };

  retrieveTask = async (id: number): Promise<TaskRead> => {
    return taskSchema.parse(
      await taskRepository.findOne({
        where: { id },
      })
    );
  };

  updateTask = async (id: number, taskData: UpdateTask): Promise<TaskRead> => {
    if (taskData.id) {
      throw new AppError(
        401,
        "Field id, createdAt, updatedAt  n cannot be changed"
      );
    }
    if (taskData.updatedAt) {
      throw new AppError(
        401,
        "Field id, createdAt, updatedAt  n cannot be changed"
      );
    }
    if (taskData.createdAt) {
      throw new AppError(
        401,
        "Field id, createdAt, updatedAt  n cannot be changed"
      );
    }
    if (taskData.title) {
      if (taskData.title.length < 3) {
        throw new AppError(401, "The field title cannot be smaller than 3");
      }
    }
    await taskRepository.update(id, { ...taskData });
    return taskSchema.parse(
      await taskRepository.findOne({
        where: { id },
      })
    );
  };

  deleteTask = async (id: number): Promise<void> => {
    const taskList = await taskRepository.find();
    const task = taskList.find((t) => t.id === id);

    await taskRepository.delete(task!.id);
  };
}
