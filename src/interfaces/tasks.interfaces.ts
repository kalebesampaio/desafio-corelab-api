import { AnyZodObject, z } from "zod";
import {
  taskSchema,
  taskCreateSchema,
  taskArraySchema,
} from "../schemas/tasks.schemas";
import { DeepPartial } from "typeorm";
import { Task } from "../entities/task.entity";

type TaskRead = z.infer<typeof taskSchema>;

type CreateTask = z.infer<typeof taskCreateSchema>;

type UpdateTask = DeepPartial<Task>;

type TaskArray = z.infer<typeof taskArraySchema>;

interface RequestSchema {
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}

export { TaskRead, CreateTask, UpdateTask, TaskArray, RequestSchema };
