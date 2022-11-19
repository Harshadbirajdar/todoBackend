const { commonResponse } = require("../helper");
const BigPromise = require("../middleware/BigPromise");
const Todo = require("../model/todo");

exports.createTodo = BigPromise(async (req, res, next) => {
  const { title } = req.body;

  if (!title) return next(new Error("Please provide the title"));

  const todo = await Todo.create({ title });

  return commonResponse(res, 200, "Todo added successfully", todo);
});

exports.getAllTodos = BigPromise(async (req, res, next) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;

  const todo = await Todo.find()
    .limit(limit)
    .skip(page * limit);

  return commonResponse(res, 200, "Todos are fetch successfully", {
    page,
    limit,
    todo,
  });
});

exports.getTodoById = BigPromise(async (req, res, next) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);
  if (!todo) return next(new Error("Todo not found"));

  return commonResponse(res, 200, "Todo fetch successfully", todo);
});

exports.addTask = BigPromise(async (req, res, next) => {
  const { tasks } = req.body;
  const { id } = req.params;

  if (!tasks) return next(new Error("Please provide task"));
  const todo = await Todo.findByIdAndUpdate(
    id,
    { $addToSet: { tasks } },
    { new: true }
  );
  if (!todo) return next(new Error("Todo Not found"));
  return commonResponse(res, 200, "Task added sucessfully", todo);
});

exports.deleteTask = BigPromise(async (req, res, next) => {
  const { id } = req.params;
  const { tasks } = req.body;

  if (!tasks) {
    res.status(400);
    return next(new Error("Please provide a task"));
  }
  const todo = await Todo.findById(id).select("tasks");

  const index = todo.tasks.indexOf(tasks);

  if (index === -1) return next(new Error("Task not found"));

  todo.tasks.splice(index, 1);
  await todo.save();

  return res.json(todo);
});

exports.deleteTodo = BigPromise(async (req, res, next) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) return next(new Error("Todo not found"));

  return commonResponse(res, 200, "Todo deleted successfully", todo);
});
