import { Router } from 'express';
import UserRouter from './users.route';
import UserMovieRouter from './user-movies';
import MoviesRouter from './movies.route';

const apiRouter = Router();

apiRouter.use('/users/', UserRouter);
apiRouter.use('/user/', UserMovieRouter);
apiRouter.use('/movies/', MoviesRouter);

export default apiRouter;
