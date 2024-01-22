import { DataSource, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Task } from "../../entities/task.entity";
import { TaskServices } from "../../services/TaskServices";

describe("Unit test: listTaskService functionalites", () => {
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

  test("Should list all registered tasks", async () => {
    const taskList = await taskService.getTasks();

    expect(taskList).toHaveProperty("map");
  });
});
