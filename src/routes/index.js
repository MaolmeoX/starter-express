import { Router } from 'express';
import * as UsersController from '../controllers/users.controller';
import apiRouter from './api';

const appRouter = Router();

appRouter.post('/users', UsersController.postUser);
appRouter.post('/login', UsersController.loginUser);
appRouter.use('/api/', apiRouter);

export default appRouter;
