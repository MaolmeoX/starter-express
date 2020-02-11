import { Router } from 'express';
import * as MoviesController from '../../controllers/movies.controller';

const moviesRouter = Router();

moviesRouter.get('/search', MoviesController.getMovies);

export default moviesRouter;
