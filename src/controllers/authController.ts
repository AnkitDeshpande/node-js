import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Request, Response} from "express";
import jwt from "jsonwebtoken";

interface SignupRequestBody {
    username: string;
    email: string;
    password: string;
}

const secretKey = process.env.JWT_SECRET_KEY || null;

export const registerUser = async (req: Request<SignupRequestBody>, res: Response): Promise<any> => {
    try {
        const { username, email, password } = req.body as SignupRequestBody;
        const userExists = await User.findOne({
            where: { email }
        });
        if (userExists) {
            return res.status(400).send('Email is already associated with an account');
        }

        await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 15),
        });
        return res.status(200).send('Registration successful');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error in registering user');
    }
}

interface SignInRequest {
    body: {
        email: string;
        password: string;
    }
}

export const loginUser = async (req: Request<SignInRequest>, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email },
            raw:true,
        });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        if (!secretKey) {
            return res.status(500).json({ error: 'JWT_SECRET_KEY is not defined' });
        }
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

        res.status(200).send({
            id: user.id,
            name: user.username,
            email: user.email,
            accessToken: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
}