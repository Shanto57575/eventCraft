import express from 'express';
import { createGuestUser, createUser, getUser, loginUser } from '../controllers/user.controller.js';
import { loginRateLimiter } from '../middleware/rateLimiter.js';
import authenticate from '../middleware/verifyToken.js';

const userRouter = express.Router();

userRouter.post('/create-user', createUser)
userRouter.post('/login-user', loginRateLimiter, loginUser)
userRouter.post('/guest-login', loginRateLimiter, createGuestUser)
userRouter.get('/get-user', authenticate, getUser)

export default userRouter