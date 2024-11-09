import asyncHandler from "express-async-handler";
import Todo from "../models/todoModel.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, isCompleted } = req.body;
  const todos = new Todo({ title, isCompleted });
  try {
    const newTodo = await todos.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const getTodo = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Error loading todos" });
  }
});

const updateTodoSatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    todo.isCompleted = isCompleted;
    await todo.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Error updating todo" });
  }
});

const deleteTodoStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Task not found" });
    }

    await todo.deleteOne(); 
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

export { createTodo, getTodo, updateTodoSatus, deleteTodoStatus };
