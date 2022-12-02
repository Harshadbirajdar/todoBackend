const express = require("express");
const {
  createTodo,
  getAllTodos,
  getTodoById,
  addTask,
  deleteTask,
  deleteTodo,
  updateTitle,
} = require("../controller/todo");

const router = express.Router();

router.route("/").get((req, res) => {
  return res.json({
    message: "Hello from Harshad",
  });
});

router.route("/todo").get(getAllTodos).post(createTodo);

router.route("/todo/:id").get(getTodoById).delete(deleteTodo).put(updateTitle);

router.route("/todo/task/:id").post(addTask).put(deleteTask);

module.exports = router;
