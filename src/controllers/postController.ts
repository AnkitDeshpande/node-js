import {Request, Response} from 'express';
import {Post} from '../models/Post';
import logger from "../middlewares/LoggerConfig";

interface PostRequestBody {
    title: string;
    content: string;
    userId: number;
}

export const createPost = async (req: Request<{}, {}, PostRequestBody>, res: Response): Promise<any> => {
    try {
        const {title, content, userId} = req.body;
        const newPost = await Post.create({title, content, userId, raw: true});
        res.status(201).json({
            success: true,
            message: "Post created successfully.",
            data: newPost,
            timestamp: new Date().toISOString()
        });
        logger.info(`Post created with title: ${title}`);
    } catch (error) {
        logger.error('Error creating post:', error);
        res.status(500).json({success: false, message: "Error creating post", timestamp: new Date().toISOString()});
    }
};

export const getAllPosts = async (_req: Request, res: Response): Promise<any> => {
    try {
        const posts = await Post.findAll();
        res.json({success: true, data: posts, timestamp: new Date().toISOString()});
    } catch (error) {
        logger.error('Error fetching posts:', error);
        res.status(500).json({success: false, message: "Error fetching posts", timestamp: new Date().toISOString()});
    }
};

export const getUserPosts = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.userId;
        const posts = await Post.findAll({where: {userId}});
        res.json({success: true, data: posts, timestamp: new Date().toISOString()});
    } catch (error) {
        logger.error('Error fetching user posts:', error);
        res.status(500).json({
            success: false,
            message: "Error fetching user posts",
            timestamp: new Date().toISOString()
        });
    }
};

export const updatePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;
        const {title, content} = req.body;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
                timestamp: new Date().toISOString()
            });
        }
        await post.update({title, content});
        res.json({
            success: true,
            message: "Post updated successfully.",
            data: post,
            timestamp: new Date().toISOString()
        });
        logger.info(`Post updated with id: ${id}`);
    } catch (error) {
        logger.error('Error updating post:', error);
        res.status(500).json({success: false, message: "Error updating post", timestamp: new Date().toISOString()});
    }
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
    try {
        const {id} = req.params;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
                timestamp: new Date().toISOString()
            });
        }
        await post.destroy();
        res.json({success: true, message: "Post deleted successfully", timestamp: new Date().toISOString()});
        logger.info(`Post deleted with id: ${id}`);
    } catch (error) {
        logger.error('Error deleting post:', error);
        res.status(500).json({success: false, message: "Error deleting post", timestamp: new Date().toISOString()});
    }
};