import asyncHandler from '../utils/asyncHandler';
import MovieApiServices from '../services/MovieApi.services';

// eslint-disable-next-line import/prefer-default-export
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
