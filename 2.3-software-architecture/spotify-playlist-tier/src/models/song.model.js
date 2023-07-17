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

/**
 * @swagger
 * components:
 *  schemas:
 *    Song:
 *      type: object
 *      required:
 *        - title
 *        - artists
 *        - url
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The auto-generated id of the song.
 *        title:
 *          type: string
 *          description: The title of the song.
 *        artists:
 *          type: array
 *          description: The artists of the song.
 *          items:
 *            type: string
 *        url:
 *          type: string
 *          description: The url of the song.
 *        count:
 *          type: integer
 *          format: int64
 *          description: The number of times the song has been played.
 *      example:
 *        id: c5e7ac22-9545-4073-89b7-810416d5a94e
 *        title: Viva La Vida
 *        artists: ['Coldplay']
 *        url: https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b
 *        count: 0
 */
