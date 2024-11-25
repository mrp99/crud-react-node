const express = require('express');
const todosRoutes = express.Router();
const { createTodo, getTodos, updateTodo, deleteTodo } = require('./todoController');

todosRoutes.post("/todos", createTodo);
todosRoutes.get("/todos", getTodos);
todosRoutes.put("/todos", updateTodo);
todosRoutes.delete("/todos/:id", deleteTodo);

module.exports = todosRoutes;
