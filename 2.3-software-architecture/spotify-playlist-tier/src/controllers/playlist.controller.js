import httpStatus from 'http-status';

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
    const response = await this.playlistService.createPlaylist(req.body);

    res
      .status(httpStatus.CREATED)
      .json({
        status: 'success',
        message: 'Playlist created successfully',
        data: response,
      });
  }

  async handleGetPlaylists(req, res) {
    const data = await this.playlistService.getAllPlaylists();

    res
      .status(httpStatus.OK)
      .json({
        status: 'success',
        message: 'Playlists retrieved successfully',
        data,
      });
  }

  async handleGetPlaylistById(req, res) {
    try {
      const data = await this.playlistService.getPlaylistById(req.params.playlistId);
      res
        .status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Playlist retrieved successfully',
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

  async handleUpdatePlaylistById(req, res) {
    try {
      const data = await this.playlistService.updatePlaylistById(req.params.playlistId, req.body);
      res
        .status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Playlist updated successfully',
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

  async handleDeletePlaylistById(req, res) {
    try {
      const data = await this.playlistService.deletePlaylistById(req.params.playlistId);
      res
        .status(httpStatus.OK)
        .json({
          status: 'success',
          message: 'Playlist deleted successfully',
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

export default PlaylistController;
