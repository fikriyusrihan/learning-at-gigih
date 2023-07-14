import { v4 as uuidv4 } from 'uuid';

class Song {
  constructor(title, artists, url) {
    this.id = uuidv4();
    this.title = title;
    this.artists = artists;
    this.url = url;
    this.count = 0;
  }
}

export default Song;
