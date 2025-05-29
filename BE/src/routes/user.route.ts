import express from 'express';
import { UserController } from '../controllers/user.controller';
import { User } from '../models/user.model';
import { verifyToken } from '../middleware/auth.middleware';
const userRouters = express.Router();
const userController = new UserController(User as any);
// Define user routes
userRouters.get('', userController.getAll);
userRouters.get('/:id', userController.getOne);
userRouters.post('/', userController.createOne, );
userRouters.post('/google-login', userController.googleLogin);
userRouters.post('/login', userController.login);
userRouters.post('/register', userController.register);
userRouters.post('/logout', userController.logout);
userRouters.post('/refresh-token', userController.refreshToken);
userRouters.put('/:id', verifyToken, userController.updateOne);
userRouters.delete('/:id', userController.deleteOne);

export default userRouters;
