import { Router } from 'express';
import * as MoviesController from '../../controllers/movies.controller';

const moviesRouter = Router();

moviesRouter.get('/search', MoviesController.getMovies);
moviesRouter.post('/:id/comment', MoviesController.postComment);

export default moviesRouter;
