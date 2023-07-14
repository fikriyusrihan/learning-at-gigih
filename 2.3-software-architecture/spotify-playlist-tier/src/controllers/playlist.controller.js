import httpStatus from 'http-status';
import Playlist from '../models/playlist.model.js';

class PlaylistController {
  constructor(playlistService) {
    this.playlistService = playlistService;

    this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this);
    this.handleGetPlaylists = this.handleGetPlaylists.bind(this);
    this.handleGetPlaylistById = this.handleGetPlaylistById.bind(this);
    this.handleUpdatePlaylistById = this.handleUpdatePlaylistById.bind(this);
    this.handleDeletePlaylistById = this.handleDeletePlaylistById.bind(this);
  }

  async handleCreatePlaylist(req, res) {
    const { name } = req.body;

    if (!name && typeof name !== 'string' && name.trim() === '') {
      res.status(httpStatus.BAD_REQUEST)
        .json({
          status: 'failed',
          message: 'Invalid request body, please check your request body and try again',
        });

      return;
    }

    const playlist = new Playlist(name);
    const data = await this.playlistService.createPlaylist(playlist);

    res.status(httpStatus.CREATED)
      .json({
        status: 'success',
        message: 'Playlist created successfully',
        data,
      });
  }

  async handleGetPlaylists(req, res) {
    const data = await this.playlistService.getAllPlaylists();

    res.status(httpStatus.OK)
      .json({
        status: 'success',
        message: 'Playlists retrieved successfully',
        data,
      });
  }

  async handleGetPlaylistById(req, res) {
    try {
      const { playlistId } = req.params;
      const data = await this.playlistService.getPlaylistById(playlistId);

      res.status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Playlist retrieved successfully',
          data,
        });
    } catch (e) {
      res.status(e.statusCode)
        .json({
          status: 'failed',
          message: e.message,
        });
    }
  }

  async handleUpdatePlaylistById(req, res) {
    try {
      const { playlistId } = req.params;
      const { name } = req.body;

      const playlist = new Playlist(name);
      const data = await this.playlistService.updatePlaylistById(playlistId, playlist);

      res.status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Playlist updated successfully',
          data,
        });
    } catch (e) {
      res.status(e.statusCode)
        .json({
          status: 'failed',
          message: e.message,
        });
    }
  }

  async handleDeletePlaylistById(req, res) {
    try {
      const { playlistId } = req.params;
      const isSuccess = await this.playlistService.deletePlaylistById(playlistId);

      if (!isSuccess) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({
            status: 'failed',
            message: 'Failed to delete playlist',
          });

        return;
      }

      res.status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Playlist deleted successfully',
        });
    } catch (e) {
      res.status(e.statusCode)
        .json({
          status: 'failed',
          message: e.message,
        });
    }
  }
}

export default PlaylistController;
