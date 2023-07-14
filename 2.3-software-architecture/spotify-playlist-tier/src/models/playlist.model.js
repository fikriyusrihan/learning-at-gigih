import { v4 as uuidv4 } from 'uuid';
import NotFoundError from '../utils/errors/not-found.error.js';

class Playlist {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.songs = [];
  }

  addSong(song) {
    this.songs.push(song);
  }

  removeSong(songId) {
    const songIndex = this.songs.findIndex((song) => song.id === songId);
    if (songIndex === -1) {
      throw new NotFoundError('The requested song was not found in the playlist.');
    }

    this.songs.splice(songIndex, 1);
  }

  playSong(songId) {
    const songIndex = this.songs.findIndex((song) => song.id === songId);
    if (songIndex === -1) {
      throw new NotFoundError('The requested song was not found in the playlist.');
    }

    this.songs[songIndex].count += 1;
    this.sortSongsByPlayedCount();
  }

  sortSongsByPlayedCount() {
    this.songs.sort((a, b) => b.count - a.count);
  }
}

export default Playlist;
