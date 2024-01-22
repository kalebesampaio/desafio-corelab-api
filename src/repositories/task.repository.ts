import { AppDataSource } from "../data-source";
import { Task } from "../entities/task.entity";

export default AppDataSource.getRepository(Task);
