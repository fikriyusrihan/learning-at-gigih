import express from 'express';
import PlaylistController from '../../controllers/playlist.controller';
import PlaylistService from '../../services/playlist.service';
import db from '../../db/db.model';
import PlaylistSongsController from '../../controllers/playlist-songs.controller';
import PlaylistModel from '../../models/playlist.model';

const router = express.Router();
const playlistModel = new PlaylistModel(db);
const playlistService = new PlaylistService(playlistModel);
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
