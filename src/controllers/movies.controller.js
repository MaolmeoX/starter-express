import asyncHandler from '../utils/asyncHandler';
import MovieApiServices from '../services/MovieApi.services';
import MovieModel from '../models/movie';
import CommentModel from '../models/comment';

export const getMovies = asyncHandler(async (req, res, next) => {
  const { query } = req.query;

  const movies = await MovieApiServices.get('search/movie', {
    params: {
      query,
      page: 1,
    },
  });

  res.status(201).json(movies.results);
});

export const getTopRatedMovies = asyncHandler(async (req, res, next) => {
  const movies = await MovieApiServices.get('movie/top_rated');
  res.status(201).json(movies.results);
});

export const postComment = asyncHandler(async (req, res, next) => {
  const movie = await MovieModel.findById(req.params.id);
  if (!movie) {
    throw new Error("Movie doesn't exist");
  }

  const comment = new CommentModel();
  comment.text = req.body.text;
  comment.user = req.user;

  movie.comments.push(comment);
  res.status(201).json(await movie.save());
});
