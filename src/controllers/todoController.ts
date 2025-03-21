import { Request, Response } from 'express';
import { Todo } from '../models/Todo';
import { sendEmail } from '../middlewares/sendGridConfig';
import logger from "../middlewares/LoggerConfig";

export const getTodos = async (req: Request, res: Response) => {
    const todos = await Todo.findAll();
    res.json({ success: true, data: todos, timestamp: new Date().toISOString() });
};

export const addTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    const newTodo = await Todo.create({ title, completed: false });
    newTodo.dataValues.id = newTodo.id;
    res.status(201).json({ success: true, message: "Todo created successfully.", data: newTodo, timestamp: new Date().toISOString() });
    await sendEmail(
        'ankit@yopmail.com',
        'New Todo Created',
        `A new todo with title "${title}" has been created.`,
        `<p>A new todo with title "<strong>${title}</strong>" has been created.</p>`
    );
    logger.info(`Todo created with title: ${title}`);
};

export const updateTodo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found", timestamp: new Date().toISOString() });
        }
        await todo.update(req.body);
        res.json({ success: true, message: "Todo updated successfully.", data: todo, timestamp: new Date().toISOString() });
        logger.info(`Todo updated with id: ${id}`);
    } catch (error) {
        logger.error('Error updating todo:', error);
        res.status(500).json({ success: false, message: "Error updating todo", timestamp: new Date().toISOString() });
    }
};

export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ success: false, message: "Todo not found", timestamp: new Date().toISOString() });
        }
        await todo.destroy();
        res.json({ success: true, message: "Todo deleted successfully", timestamp: new Date().toISOString() });
        logger.info(`Todo deleted with id: ${id}`);
    } catch (error) {
        logger.error('Error deleting todo:', error);
        res.status(500).json({ success: false, message: "Error deleting todo", timestamp: new Date().toISOString() });
    }
};