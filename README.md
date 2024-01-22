# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)
    - [Instalando Dependências](#21-instalando-dependências)
    - [Variáveis de Ambiente](#22-variáveis-de-ambiente)
    - [Migrations](#23-migrations)
- [Autenticação](#3-autenticação)
- [Endpoints](#4-endpoints)

---

## 1. Visão Geral

Visão geral do projeto, um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [Zod](https://zod.dev/)
- [Jest](https://jestjs.io/pt-BR/)
- [Helmet](https://helmetjs.github.io)

---

## 2. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 2.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
npm install
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 2.3. Migrations

Execute as migrations com o comando:

```
npm run typeorm migration:run -d src/data-source.ts
```

---
## 3. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Por enquanto, não foi implementada autenticação.

---

## 4. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Tasks](#1-tasks)
    - [POST - /tasks](#11-criação-da-tarefa)
    - [GET - /tasks](#12-listando-tarefas)
	- [GET - /tasks/:id](#13-listar-tarefa-por-id)
    - [PATCH - /tasks/:id](#14-atualizando-tarefa)
    - [DELETE - /tasks/:id](#15-apagando-tarefa)

---

## 1. **Tasks**
[ Voltar para os Endpoints ](#4-endpoints)

O objeto User é definido como:

| Campo        | Tipo   | Descrição                                        |
| -------------|---------|-------------------------------------------------|
| id           | number  | Identificador único da tarefa.                  |
| title        | string  | O título da tarefa.                             |
| description  | string  | A descrição da tarefa.                          |
| color        | string  | A cor do card da tarefa em hex.                 |
| favorite     | boolean | Booleano se a tarefa é marcada como favorita.   |
| createdAt    | date    | Data de criação da tarefa.                      |
| updatedAt    | date    | Data de atualização da tarefa.                  |


### Endpoints

| Método   | Rota       | Descrição                                           |
|----------|------------|-----------------------------------------------------|
| POST     | /tasks     | Criação de uma tarefa.                              |
| GET      | /tasks     | Lista todas as tarefas.                             |
| GET      | /tasks/:id | Lista uma tarefa usando seu ID como parâmetro       |
| PATCH    | /tasks/:id | Atualizando uma tarefa usando seu ID como parâmetro.|
| DELETE   | /tasks/:id | Deletando uma tarefa usando seu ID como parâmetro.  |

---

### 1.1. **Criação de Tarefa**

[ Voltar para os Endpoints ](#4-endpoints)

### `/tasks`

### Exemplo de Request:
```
POST /tasks
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
 {
    "title": "Lista de compras",
    "description":
      "Comprar: pão, queijo, presunto, macarrão, arroz, feijão, carne.",
    "favorite": false,
    "color": "FFFFF"
    }
```

### Schema de Validação com Zod:
```javascript
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
```
OBS.: Chaves não presentes no schema/no userSchema.omit serão removidas.

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": 6,
	"title": "Lista de compras",
	"description": "Comprar: pão, queijo, presunto, macarrão, arroz, feijão, carne.",
	"favorite": false,
	"color": "FFFFF",
	"createdAt": "2024-01-22",
	"updatedAt": "2024-01-22"
}
```

### Possíveis Erros:
| Código do Erro | Descrição                                    |
|----------------|----------------------------------------------|
| 409 Conflict   | String must contain at least 3 character(s). |
| 409 Conflict   | Title Required.                              |

---

### 1.2. **Listando Tarefas**

[ Voltar aos Endpoints ](#4-endpoints)

### `/tasks`

### Exemplo de Request:
```
GET /tasks
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": 3,
		"title": "Lista de compras",
		"description": "Comprar: pão, queijo, presunto, macarrão, arroz, feijão, carne.",
		"favorite": true,
		"color": "FFFFF",
		"createdAt": "2024-01-22",
		"updatedAt": "2024-01-22"
	},
	{
		"id": 6,
		"title": "Lista de compras",
		"description": "Comprar: pão, queijo, presunto, macarrão, arroz, feijão, carne.",
		"favorite": false,
		"color": "FFFFF",
		"createdAt": "2024-01-22",
		"updatedAt": "2024-01-22"
	}
]
```

### Possíveis Erros:
Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **Listar Tarefa por ID**

[ Voltar aos Endpoints ](#4-endpoints)

### `/tasks/:id`

### Exemplo de Request:
```
GET /tasks/1
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | number       | Identificador único da tarefa (Task) |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
	{
		"id": 6,
		"title": "Lista de compras",
		"description": "Comprar: pão, queijo, presunto, macarrão, arroz, feijão, carne.",
		"favorite": false,
		"color": "702963",
		"createdAt": "2024-01-22",
		"updatedAt": "2024-01-22"
	}
```

### Possíveis Erros:
| Código do Erro   | Descrição                                           |
|------------------|-----------------------------------------------------|
| 404 Not Found    | Task not found.                                     |

---

### 1.4. **Atualizar Tarefa**

[ Voltar aos Endpoints ](#4-endpoints)

### `/tasks/:id`

### Exemplo de Request:
```
PATCH /tasks/6
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | number      | Identificador único da Tarefa (Task)  |

### Corpo da Requisição:
```json
{
	"favorite": true
}

```

### Exemplo de Response:
```
200 OK
```
```json
	{
		"id": 6,
		"title": "Lista de compras",
		"description": "Comprar: pão, queijo, presunto, macarrão, arroz, feijão, carne.",
		"favorite": true,
		"color": "702963",
		"createdAt": "2024-01-22",
		"updatedAt": "2024-01-22"
	}
```

### Possíveis Erros:
| Código do Erro   | Descrição                                           |
|------------------|-----------------------------------------------------|
| 404 Not Found    | Task not found.                                     |
| 401 Unauthorized | Field id, createdAt, updatedAt  n cannot be changed.|
| 401 Unauthorized | The field title cannot be smaller than 3.           |

---

### 1.5. **Deletar Tarefa**

[ Voltar aos Endpoints ](#4-endpoints)

### `/tasks/:id`

### Exemplo de Request:
```
PATCH /tasks/1
Host: http://localhost:3000
Authorization: None
Content-type: application/json
```

### Parâmetros da Requisição:
| Parâmetro   | Tipo        | Descrição                             |
|-------------|-------------|---------------------------------------|
| id          | number      | Identificador único do tarefa (Task)  |

### Corpo da Requisição:
```json
Vazio
```

### Exemplo de Response:
```
200 OK
```
```json
Vazio
```

### Possíveis Erros:
| Código do Erro   | Descrição                                           |
|------------------|-----------------------------------------------------|
| 404 Not Found    | Task not found.                                     |


---

