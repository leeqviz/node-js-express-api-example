import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { User } from '../models/user.js';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new User({
            email: req.body.email,
            name: req.body.name,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
            roleId: 2,
        });

        const user = await doc.save();

        const token = jwt.sign({
            id: user.id,
        }, 
        'secret-word',
        {
            expiresIn: '30d'
        });

        res.json({
            user,
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Register was unsuccesful!'
        });
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ where: {
            email: req.body.email
        }});

        if (!user) {
            return res.status(404).json({
                message: 'This user does not exists'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);
        
        if (!isValidPass) {
            return res.status(404).json({
                message: 'Email or password are incorrect!'
            });
        }

        const token = jwt.sign({
            id: user.id,
        }, 
        'secret-word',
        {
            expiresIn: '30d'
        });

        res.json({
            user,
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Login was unsuccesful!'
        });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findOne({ where: {
            id: req.userId
        }});
        if (!user) {
            return res.status(404).json({
                message: 'user does not exists'
            });
        }
        
        res.json({
            user,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Server error!'
        });
    }
}