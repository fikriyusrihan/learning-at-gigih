import NotFoundError from '../utils/errors.utils';

class PlaylistService {
  constructor(playlistModel) {
    this.playlistModel = playlistModel;

    this.createPlaylist = this.createPlaylist.bind(this);
    this.getAllPlaylists = this.getAllPlaylists.bind(this);
    this.getPlaylistById = this.getPlaylistById.bind(this);
    this.updatePlaylistById = this.updatePlaylistById.bind(this);
    this.deletePlaylistById = this.deletePlaylistById.bind(this);
  }

  createPlaylist(body) {
    return this.playlistModel.createPlaylist(body);
  }

  getAllPlaylists() {
    return this.playlistModel.getAllPlaylists();
  }

  getPlaylistById(id) {
    const playlist = this.playlistModel.getPlaylistById(id);
    if (!playlist) {
      throw new NotFoundError('The requested playlist was not found.');
    }

    return playlist;
  }

  updatePlaylistById(id, body) {
    const playlist = this.playlistModel.getPlaylistById(id);
    if (!playlist) {
      throw new NotFoundError('The requested playlist was not found.');
    }

    return this.playlistModel.updatePlaylistById(id, body);
  }

  deletePlaylistById(id) {
    const playlist = this.playlistModel.getPlaylistById(id);
    if (!playlist) {
      throw new NotFoundError('The requested playlist was not found.');
    }

    this.playlistModel.deletePlaylistById(id);
  }
}

export default PlaylistService;
