import httpStatus from 'http-status';
import Song from '../models/song.model.js';

class PlaylistSongsController {
  constructor(playlistModel) {
    this.playlistModel = playlistModel;

    this.handleAddSong = this.handleAddSong.bind(this);
    this.handleDeleteSong = this.handleDeleteSong.bind(this);
    this.handlePlaySong = this.handlePlaySong.bind(this);
  }

  async handleAddSong(req, res) {
    try {
      const { playlistId } = req.params;
      const { title, artists, url } = req.body;

      if (!title || !artists || !url) {
        res.status(httpStatus.BAD_REQUEST)
          .json({
            status: 'failed',
            message: 'Invalid request body, please check your request body and try again',
          });

        return;
      }

      const song = new Song(title, artists, url);
      const playlist = this.playlistModel.getPlaylistById(playlistId);
      playlist.addSong(song);

      res.status(httpStatus.CREATED)
        .json({
          status: 'success',
          message: 'Song added successfully into playlist',
          data: playlist,
        });
    } catch (e) {
      res.status(e.statusCode)
        .json({
          status: 'failed',
          message: e.message,
        });
    }
  }

  async handleDeleteSong(req, res) {
    try {
      const { playlistId, songId } = req.params;

      const playlist = this.playlistModel.getPlaylistById(playlistId);
      playlist.removeSong(songId);

      res.status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Song deleted successfully from playlist',
          data: playlist,
        });
    } catch (e) {
      res.status(e.statusCode)
        .json({
          status: 'failed',
          message: e.message,
        });
    }
  }

  async handlePlaySong(req, res) {
    try {
      const { playlistId, songId } = req.params;
      const playlist = this.playlistModel.getPlaylistById(playlistId);
      playlist.playSong(songId);

      res.status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Song played successfully',
          data: playlist,
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

export default PlaylistSongsController;
