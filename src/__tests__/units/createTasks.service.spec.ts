import { DataSource, Repository } from "typeorm";
import { Task } from "../../entities/task.entity";
import { AppDataSource } from "../../data-source";
import createTasksServiceMock from "../mocks/tasks/createTasks.service.mock";
import { TaskServices } from "../../services/TaskServices";

describe("Unit test: create task functionalites", () => {
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

  it("Shoul be capable to create a task - Valid payload", async () => {
    const { valid } = createTasksServiceMock;

    const result = await taskService.createTask(valid);

    const expectedResult = {
      id: expect.any(Number),
      title: "Lista de compras",
      description:
        "Comprar: pão, queijo, presunto, macarrão, arroz, feijão, carne.",
      favorite: false,
      color: "FFFFF",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    expect(result).toStrictEqual(expectedResult);

    const product = await taskRepo.findOneBy({ id: result.id });

    expect(product).not.toBeNull();
  });
});
