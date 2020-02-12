import asyncHandler from '../utils/asyncHandler';
import MovieModel from '../models/movie';
import { UserService } from '../services/user.service';
import PlaylistService from '../services/playlist.service';

export const postUserMovie = asyncHandler(async (req, res, next) => {
  const movie = new MovieModel();
  movie.idAPI = req.body.idAPI;
  await MovieModel.create(movie);
  const user = await UserService.getUser(req.user.id);
  await PlaylistService.getOrCreatePlaylistUser(user, movie.id, 'Ma playlist');
});
