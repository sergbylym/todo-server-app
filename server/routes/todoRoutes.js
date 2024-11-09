import express from 'express'
import { createTodo, deleteTodoStatus, getTodo, updateTodoSatus, } from '../controllers/todoControllers.js'

const router = express.Router()

router.post('/todos',createTodo )
router.get('/todos', getTodo)
router.put('/todos/:id', updateTodoSatus);
router.delete('/todos/:id', deleteTodoStatus);
export default router;


 