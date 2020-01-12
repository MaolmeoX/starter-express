import {Router} from "express";
import UserRouter from './users.route';

const apiRouter = Router();

apiRouter.use('/users/', UserRouter);

export default apiRouter;