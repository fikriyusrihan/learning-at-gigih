import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';

class PlaylistSongsController {
  constructor(playlistModel) {
    this.playlistModel = playlistModel;

    this.handleAddSong = this.handleAddSong.bind(this);
    this.handleDeleteSong = this.handleDeleteSong.bind(this);
    this.handlePlaySong = this.handlePlaySong.bind(this);
  }

  async handleAddSong(req, res) {
    try {
      const playlist = this.playlistModel.getPlaylistById(req.params.playlistId);
      const song = req.body;

      song.id = uuidv4();
      song.count = 0;
      playlist.songs.push(song);

      const data = this.playlistModel.updatePlaylistById(req.params.playlistId, playlist);
      res
        .status(httpStatus.CREATED)
        .json({
          status: 'success',
          message: 'Song added successfully into playlist',
          data,
        });
    } catch (e) {
      res
        .status(e.statusCode)
        .json({
          status: 'failed',
          message: e.message,
        });
    }
  }

  async handleDeleteSong(req, res) {
    try {
      const playlist = this.playlistModel.getPlaylistById(req.params.playlistId);
      const { songId } = req.params;
      const songIndex = playlist.songs.findIndex((song) => song.id === songId);

      if (songIndex === -1) {
        res
          .status(httpStatus.NOT_FOUND)
          .json({
            status: 'failed',
            message: 'Song not found in playlist',
          });

        return;
      }

      playlist.songs.splice(songIndex, 1);

      const data = this.playlistModel.updatePlaylistById(req.params.playlistId, playlist);
      res
        .status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Song deleted successfully from playlist',
          data,
        });
    } catch (e) {
      res
        .status(e.statusCode)
        .json({
          status: 'failed',
          message: e.message,
        });
    }
  }

  async handlePlaySong(req, res) {
    try {
      const playlist = this.playlistModel.getPlaylistById(req.params.playlistId);
      const { songId } = req.params;
      const songIndex = playlist.songs.findIndex((song) => song.id === songId);

      if (songIndex === -1) {
        res
          .status(httpStatus.NOT_FOUND)
          .json({
            status: 'failed',
            message: 'The requested song is not found in playlist',
          });

        return;
      }

      const data = playlist.songs[songIndex];
      data.count += 1;
      playlist.songs[songIndex] = data;

      this.playlistModel.updatePlaylistById(req.params.playlistId, playlist);

      res
        .status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Song played successfully',
          data,
        });
    } catch (e) {
      res
        .status(e.statusCode)
        .json({
          status: 'failed',
          message: e.message,
        });
    }
  }
}

export default PlaylistSongsController;
