import httpStatus from 'http-status';
import { movieService } from '../services/index.js';
import handlerCatchWrapper from '../utils/handlerCatchWrapper.js';

const handlePostMovie = handlerCatchWrapper(async (req, res) => {
  const movie = await movieService.createMovie(req.body);
  const response = {
    status: 'success',
    message: 'Movie successfully created',
    data: movie,
  };

  res.status(httpStatus.CREATED).json(response);
});

const handleGetMovies = handlerCatchWrapper(async (req, res) => {
  const movies = await movieService.getMovies();
  const response = {
    status: 'success',
    message: 'Movies successfully fetched',
    data: movies,
  };

  res.json(response);
});

const handleGetMovie = handlerCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const movie = await movieService.getMovieById(id);
  const response = {
    status: 'success',
    message: 'Movie successfully fetched',
    data: movie,
  };

  res.json(response);
});

const handlePatchMovie = handlerCatchWrapper(async (req, res) => {
  const { id } = req.params;
  const movie = await movieService.updateMovieById(id, req.body);
  const response = {
    status: 'success',
    message: 'Movie successfully updated',
    data: movie,
  };

  res.json(response);
});

const handleDeleteMovie = handlerCatchWrapper(async (req, res) => {
  const { id } = req.params;
  await movieService.deleteMovieById(id);
  const response = {
    status: 'success',
    message: 'Movie successfully deleted',
  };

  res.json(response);
});

export {
  handlePostMovie,
  handleGetMovies,
  handleGetMovie,
  handlePatchMovie,
  handleDeleteMovie,
};
