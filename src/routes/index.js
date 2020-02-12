import { Router } from 'express';
import passport from 'passport';
import * as UsersController from '../controllers/users.controller';
import * as MoviesController from '../controllers/movies.controller';
import apiRouter from './api';

const appRouter = Router();

appRouter.post('/users', UsersController.postUser);
appRouter.post('/login', UsersController.loginUser);
appRouter.use(
  '/api/',
  passport.authenticate('jwt', { session: false }),
  apiRouter
);
appRouter.get('/movies/top_rated', MoviesController.getTopRatedMovies);

export default appRouter;
