import NotFoundError from '../utils/errors/not-found.error.js';
import db from '../utils/db/db.js';

class PlaylistService {
  constructor() {
    this.db = db;

    this.createPlaylist = this.createPlaylist.bind(this);
    this.getAllPlaylists = this.getAllPlaylists.bind(this);
    this.getPlaylistById = this.getPlaylistById.bind(this);
    this.updatePlaylistById = this.updatePlaylistById.bind(this);
    this.deletePlaylistById = this.deletePlaylistById.bind(this);
  }

  createPlaylist(playlist) {
    this.db.set(playlist.id, playlist);

    return playlist;
  }

  getAllPlaylists() {
    return Array.from(this.db.values());
  }

  getPlaylistById(id) {
    if (!this.db.has(id)) {
      throw new NotFoundError('The requested playlist was not found.');
    }

    return this.db.get(id);
  }

  updatePlaylistById(id, playlist) {
    if (!this.db.has(id)) {
      throw new NotFoundError('The requested playlist was not found.');
    }

    this.db.set(id, playlist);

    return playlist;
  }

  deletePlaylistById(id) {
    if (!this.db.has(id)) {
      throw new NotFoundError('The requested playlist was not found.');
    }

    this.db.delete(id);

    return true;
  }
}

export default new PlaylistService();
