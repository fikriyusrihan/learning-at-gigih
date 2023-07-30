import express from 'express';
import { movieController } from '../controllers/index.js';

const router = express.Router();

router
  .route('/movies')
  .post(movieController.handlePostMovie)
  .get(movieController.handleGetMovies);

router
  .route('/movies/:id')
  .get(movieController.handleGetMovie)
  .patch(movieController.handlePatchMovie)
  .delete(movieController.handleDeleteMovie);

export default router;
