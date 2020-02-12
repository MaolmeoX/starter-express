import { Router } from 'express';
import * as UserMovieController from '../../controllers/user-movies.controller';

const UserMovieRouter = Router();

UserMovieRouter.post('/movies', UserMovieController.postUserMovie);
UserMovieRouter.get('/playlist', UserMovieController.getPlaylist);

export default UserMovieRouter;
