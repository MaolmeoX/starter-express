import { Router } from 'express';
import UserRouter from './users.route';
import UserMovieRouter from './user-movies';

const apiRouter = Router();

apiRouter.use('/users/', UserRouter);
apiRouter.use('/user/', UserMovieRouter);

export default apiRouter;
