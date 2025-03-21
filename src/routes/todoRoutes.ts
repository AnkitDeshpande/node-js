import {Router} from "express";
import {addTodo, deleteTodo, getTodos, updateTodo} from "../controllers/todoController";
import {verifyToken} from "../middlewares/AuthConfig";

const router = Router();

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 */
router.get("/todos", verifyToken, getTodos);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Add a new todo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Todo added successfully
 */
router.post("/todos", verifyToken, addTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 */
router.put("/todos/:id", verifyToken, updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete("/todos/:id", verifyToken, deleteTodo);

export default router;