import { Post } from '../models/post.js';
import { User } from '../models/user.js';

export const getTags = async (req, res) => {
    try {
        // get last tags
        const posts = await Post.findAll({limit: 5});

        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5);

        res.json(tags);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Tags were not found'
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        
        const post = await Post.findOne({ 
            where: { id: postId }, 
            include: User
        });
        if (!post) {
            return res.status(404).json({
                message: 'Post was not found'
            });
        }
        post.viewsCount += 1;
        await post.save();

        res.json(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Post was not found'
        });
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        
        const post = await Post.findOne({ where: { id: postId }});
        if (!post) {
            return res.status(404).json({
                message: 'Post was not found'
            });
        }
        post.set({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags
        });
        await post.save();

        res.json(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Post was not found'
        });
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        
        const post = await Post.findOne({ where: { id: postId }});
        if (!post) {
            return res.status(404).json({
                message: 'Post was not found'
            });
        }
        await post.destroy();
        res.json({
            success: true
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Post was not found'
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await Post.findAll({ include: User});
        
        res.json(posts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Posts were not found'
        });
    }
}

export const create = async (req, res) => {
    try {
        const doc = new Post({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            userId: req.userId,
        });

        const post = await doc.save();
        res.json(post);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Post was not created'
        });
    }
}