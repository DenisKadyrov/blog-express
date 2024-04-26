import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { checkAuth, handleValidationErrors } from './utils/index.js';
import {UserController, PostController} from './controllers/index.js';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

// Connnect to mongoDB in docker container
mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("connection to MongoDB successfull"))
  .catch((err) => console.log("Connection Error", err));

const app = express();

// create storage for static files
// use original name
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.json()); 
app.use('/uploads', express.static('uploads'));

// user end points
app.post("/register", registerValidation, handleValidationErrors, UserController.register);
app.post('/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// post end points
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.createPost);
app.delete('/posts/:id', checkAuth, PostController.removePost);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.updatePost);


app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server starting at http://localhost:4444');
});

