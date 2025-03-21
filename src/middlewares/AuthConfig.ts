import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || null;

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access token is missing or invalid" });
        return;
    }
    if (!secretKey) {
        res.status(500).json({ message: "JWT_SECRET_KEY is not defined" });
        return;
    }
    try {
        jwt.verify(token, secretKey);
        next();
    } catch (error) {
       res.status(401).json({ message: "Invalid token" });
    }
};