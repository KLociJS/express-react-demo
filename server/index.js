const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const todos = [
  {
    id: 1,
    description: "text 1",
    createdAt: new Date(),
    deadline: new Date(),
    completed: false,
  },
  {
    id: 2,
    description: "text 2",
    createdAt: new Date(),
    deadline: new Date(),
    completed: false,
  },
  {
    id: 3,
    description: "text 3",
    createdAt: new Date(),
    deadline: new Date(),
    completed: false,
  },
  {
    id: 4,
    description: "text 4",
    createdAt: new Date(),
    deadline: new Date(),
    completed: false,
  },
];

app.get("/", (req, res) => {
  console.log("GET /todos");
  res.json(todos);
});

app.post("/", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    description: req.body.description,
    createdAt: new Date(),
    deadline: req.body.deadline,
    completed: false,
  };

  todos.push(newTodo);

  res.json(newTodo);
});

app.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((todo) => todo.id === id);

  todos.splice(index, 1);

  res.json({ message: `Todo with id ${id} deleted` });
});

app.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((todo) => todo.id === id);

  todos[index] = { ...todos[index], ...req.body };

  res.json(todos[index]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
