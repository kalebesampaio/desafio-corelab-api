import { z } from "zod";

const taskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(3).max(50),
  description: z.string().max(300),
  favorite: z.boolean(),
  color: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

const taskCreateSchema = taskSchema.omit({
  id: true,
  favorite: true,
  createdAt: true,
  updatedAt: true,
});

const taskCreate2Schema = taskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const taskUpdateSchema = taskCreate2Schema.partial();

const taskArraySchema = taskSchema.array();

export { taskSchema, taskCreateSchema, taskUpdateSchema, taskArraySchema };
