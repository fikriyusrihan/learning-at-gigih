import httpStatus from 'http-status';
import Movie from '../models/movie.model.js';
import ApiError from '../utils/ApiError.js';

const createMovie = async (payload) => Movie.create(payload);

const getMovies = async () => Movie.find();

const getMovieById = async (id) => Movie.findById(id);

const updateMovieById = async (id, payload) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'The requested movie is not found');
  }

  return Movie.findByIdAndUpdate(id, payload, { new: true });
};

const deleteMovieById = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'The requested movie is not found');
  }

  return Movie.findByIdAndDelete(id);
};

export {
  createMovie,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};
