import asyncHandler from '../utils/asyncHandler';
import MovieModel from '../models/movie';
import { UserService } from '../services/user.service';
import PlaylistService from '../services/playlist.service';
import MovieApiServices from '../services/MovieApi.services';

export const postUserMovie = asyncHandler(async (req, res, next) => {
  const movie = new MovieModel();
  movie.idAPI = req.body.idAPI;
  await MovieModel.create(movie);
  const user = await UserService.getUser(req.user.id);
  const playlist = await PlaylistService.getOrCreatePlaylistUser(
    user,
    movie.id,
    'Ma playlist'
  );
  return res.status(201).json(playlist);
});

export const getPlaylist = asyncHandler(async (req, res, next) => {
  const user = await UserService.getUser(req.user.id);

  const playlist = await PlaylistService.getPlayListUser(user);

  const movies = await MovieModel.find()
    .where('_id')
    .in(playlist.movies)
    .exec();

  const newMovies = await Promise.all(
    movies.map(async movie => {
      return MovieApiServices.get(`movie/${movie.idAPI}`);
    })
  );
  res.status(200).json(newMovies);
});
