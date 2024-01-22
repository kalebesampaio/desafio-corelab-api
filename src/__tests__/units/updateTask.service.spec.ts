import { DataSource, Repository } from "typeorm";
import { Task } from "../../entities/task.entity";
import { AppDataSource } from "../../data-source";
import createTasksServiceMock from "../mocks/tasks/createTasks.service.mock";
import { TaskServices } from "../../services/TaskServices";
import { AppError } from "../../errors/AppError";

describe("Unit test: updateTaskService functionalites", () => {
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

  it("Shoul be capable to update a task - Valid payload", async () => {
    const { valid } = createTasksServiceMock;

    const createTask = await taskService.createTask(valid);

    const result = await taskService.updateTask(createTask.id, {
      description: "A expressão Lorem ipsum em design gráfico e editoração",
    });

    const expectedResult = {
      id: expect.any(Number),
      title: "Lista de compras",
      description: "A expressão Lorem ipsum em design gráfico e editoração",
      favorite: false,
      color: "FFFFF",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    };

    expect(result).toStrictEqual(expectedResult);

    const task = await taskRepo.findOneBy({ id: result.id });

    expect(task).not.toBeNull();
  });

  it("Shoul not be capable to update a task", async () => {
    const resultId = taskService.updateTask(1, { id: 5 });

    await expect(resultId).rejects.toThrowError(AppError);
    await expect(resultId).rejects.toThrow("Field id");

    const resultUpdate = taskService.updateTask(1, { updatedAt: "05/11/2022" });

    await expect(resultUpdate).rejects.toThrowError(AppError);
    await expect(resultUpdate).rejects.toThrow("Field id");

    const resultTitle = taskService.updateTask(1, { title: "si" });

    await expect(resultTitle).rejects.toThrowError(AppError);
    await expect(resultTitle).rejects.toThrow(
      "The field title cannot be smaller than 3"
    );
  });
});
