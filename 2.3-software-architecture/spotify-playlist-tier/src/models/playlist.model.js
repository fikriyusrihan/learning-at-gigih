import { v4 as uuidv4 } from 'uuid';

class PlaylistModel {
  constructor(db) {
    this.db = db;
  }

  createPlaylist(body) {
    const id = uuidv4();
    const playlist = {
      id,
      name: body.name,
      songs: [],
    };

    this.db.set(id, playlist);

    return playlist;
  }

  getAllPlaylists() {
    return Array.from(this.db.values());
  }

  getPlaylistById(id) {
    const playlist = this.db.get(id);
    if (!playlist) {
      return playlist;
    }

    playlist.songs = playlist.songs.sort((a, b) => b.count - a.count);

    return this.db.get(id);
  }

  updatePlaylistById(id, body) {
    const playlist = this.db.get(id);
    playlist.name = body.name;

    this.db.set(id, playlist);

    return playlist;
  }

  deletePlaylistById(id) {
    this.db.delete(id);
  }
}

export default PlaylistModel;
