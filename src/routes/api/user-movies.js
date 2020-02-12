import { Router } from 'express';
import * as UserMovieController from '../../controllers/user-movies.controller';

const UserMovieRouter = Router();

UserMovieRouter.post('/movies', UserMovieController.postUserMovie);

export default UserMovieRouter;
