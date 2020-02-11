import asyncHandler from '../utils/asyncHandler';
import MovieApiServices from '../services/MovieApi.services';

export const getMovies = asyncHandler(async (req, res, next) => {
  const { query } = req.query;

  res.status(201).json(
    await MovieApiServices.get('search/movie', {
      params: {
        query,
      },
    })
  );
});

export const getMovie = asyncHandler(async (req, res, next) => {
  const movie = {};

  res.status(201).json(movie);
});
