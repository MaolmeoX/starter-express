import asyncHandler from '../utils/asyncHandler';
import MovieApiServices from '../services/MovieApi.services';

export const getMovies = asyncHandler(async (req, res, next) => {
  const { query } = req.query;

  const movies = await MovieApiServices.get('search/movie', {
    params: {
      query,
      page: 1,
    },
  });

  res.status(201).json(movies);
});

export const getMovie = asyncHandler(async (req, res, next) => {
  const movie = {};

  res.status(201).json(movie);
});
