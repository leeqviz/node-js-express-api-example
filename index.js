import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { userController, postController } from './controllers/on-export.js';
import { registerValidation, loginValidation, postCreateValidation } from './validations/on-export.js'
import { handleValidationErrors, checkAuth, database } from './utils/on-export.js';

const port = 8080;
const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

database.createDatabase();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.json({
        msg: 'test'
    });
});
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});

app.post('/auth/register', registerValidation, handleValidationErrors, userController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, userController.login);
app.get('/auth/me', checkAuth, userController.getMe);

app.get('/posts', postController.getAll);
app.get('/posts/tags', postController.getTags);
app.get('/posts/:id', postController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, postController.create);
app.delete('/posts/:id', checkAuth, postController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, postController.update);


app.listen(port, (err) => {
    if (err) return console.log(err);
    console.log(`Server listening on localhost:${port}...`);
});