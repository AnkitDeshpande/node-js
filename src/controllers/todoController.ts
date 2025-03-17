import {Request, Response} from "express";
import {Todo} from "../models/Todo";

export const getTodos = async (req: Request, res: Response) => {
    const todos = await Todo.findAll();
    res.json(todos);
};

export const addTodo = async (req: Request, res: Response) => {
    const {title} = req.body;
    const newTodo = await Todo.create({title, completed: false});
    newTodo.dataValues.id = newTodo.id;
    res.status(201).json(newTodo);
};

export const updateTodo = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({message: "Todo not found"});
        }
        await todo.update(req.body);
        res.json(todo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({message: "Error updating todo"});
    }
};

export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({message: "Todo not found"});
        }
        await todo.destroy();
        res.json({message: "Todo deleted successfully"});
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({message: "Error deleting todo"});
    }
};