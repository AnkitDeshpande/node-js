import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

interface SignupRequestBody {
    username: string;
    email: string;
    password: string;
}

interface SignInRequestBody {
    email: string;
    password: string;
}

export const registerUser = async (req: Request<SignupRequestBody>, res: Response): Promise<any> => {
    try {
        const { username, email, password } = req.body;
        const userExists = await User.findOne({ where: { email }, raw: true });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "Email is already associated with an account.",
                timestamp: new Date().toISOString()
            });
        }

        const hashedPassword = await bcrypt.hash(password, 15);
        await User.create({ username, email, password: hashedPassword });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
            timestamp: new Date().toISOString()
        });
    }
};

export const loginUser = async (req: Request<{}, {}, SignInRequestBody>, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email }, raw: true });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
                timestamp: new Date().toISOString()
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
                timestamp: new Date().toISOString()
            });
        }

        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({
                success: false,
                message: "Server error: Missing JWT secret key.",
                timestamp: new Date().toISOString()
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            timestamp: new Date().toISOString(),
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
            timestamp: new Date().toISOString()
        });
    }
};
