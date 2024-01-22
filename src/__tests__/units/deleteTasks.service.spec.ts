import { DataSource, Repository } from "typeorm";
import { Task } from "../../entities/task.entity";
import { AppDataSource } from "../../data-source";
import createTasksServiceMock from "../mocks/tasks/createTasks.service.mock";
import { TaskServices } from "../../services/TaskServices";

describe("Unit test: updateProductService functionalites", () => {
  let taskRepo: Repository<Task>;
  let connection: DataSource;
  let taskService = new TaskServices();

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
        taskRepo = res.getRepository(Task);
      })
      .catch((err) => console.log(err));
  });

  beforeEach(async () => {
    await taskRepo.remove(await taskRepo.find());
  });

  afterAll(async () => await connection.destroy());

  it("Shoul be capable to delete a task - Valid payload", async () => {
    const { valid } = createTasksServiceMock;

    const createTaskData = await taskService.createTask(valid);

    await taskService.deleteTask(createTaskData.id);
    const result = await taskRepo.findOneBy({ id: createTaskData.id });

    expect(result).toBeNull();
  });

  it("Shoul not be capable to delete a task - Id not found", async () => {
    const { unique } = createTasksServiceMock;
    await taskRepo.save({ ...unique });

    const result = taskService.deleteTask(1);

    await expect(result).rejects.toThrowError(TypeError);
    await expect(result).rejects.toThrow(
      "Cannot read properties of undefined (reading 'id')"
    );

    const countProducts = await taskRepo.count();
    expect(countProducts).toBe(1);
  });
});
