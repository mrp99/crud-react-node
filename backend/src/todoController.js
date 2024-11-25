const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTodo = async (req, res) => {
  const { name } = req.body;
  try {
    const todoCreate = await prisma.todo.create({
      data: { name },
    });
    return res.status(201).json(todoCreate);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar a tarefa" });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({
      error: "Erro interno no servidor. Tente novamente mais tarde.",
      details: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  const { id, name, status } = req.body;
  if (!id) return res.status(400).json({ error: "ID é obrigatório" });

  const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });
  if (!todoAlreadyExist) return res.status(404).json({ error: "Todo não encontrado!" });

  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: { name, status },
    });
    return res.status(200).json(todo);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        error: "Todo não encontrado",
      });
    }
    return res.status(500).json({
      error: "Erro interno no servidor. Tente novamente mais tarde.",
      details: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  const intId = parseInt(id);

  if (!intId) return res.status(400).json({ error: "ID é obrigatório" });

  try {
    const todoExist = await prisma.todo.findUnique({ where: { id: intId } });
    if (!todoExist) return res.status(404).json({ error: "Todo não encontrado!" });

    await prisma.todo.delete({ where: { id: intId } });

    return res.status(200).json({ message: "Todo deletado com sucesso!" });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao deletar o todo",
      details: error.message,
    });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
