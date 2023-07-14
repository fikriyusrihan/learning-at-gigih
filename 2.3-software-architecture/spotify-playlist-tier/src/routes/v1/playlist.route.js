import express from 'express';
import PlaylistController from '../../controllers/playlist.controller.js';
import PlaylistService from '../../services/playlist.service.js';
import PlaylistSongsController from '../../controllers/playlist-songs.controller.js';

const router = express.Router();
const playlistService = new PlaylistService();
const playlistController = new PlaylistController(playlistService);
const playlistSongsController = new PlaylistSongsController(playlistService);

router
  .route('/')
  .get(playlistController.handleGetPlaylists)
  .post(playlistController.handleCreatePlaylist);

router
  .route('/:playlistId')
  .get(playlistController.handleGetPlaylistById)
  .put(playlistController.handleUpdatePlaylistById)
  .delete(playlistController.handleDeletePlaylistById);

router
  .route('/:playlistId/songs')
  .post(playlistSongsController.handleAddSong);

router
  .route('/:playlistId/songs/:songId')
  .delete(playlistSongsController.handleDeleteSong);

router
  .route('/:playlistId/songs/:songId/play')
  .put(playlistSongsController.handlePlaySong);

export default router;
