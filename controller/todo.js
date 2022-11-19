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
