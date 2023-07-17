const db = connect('mongodb://localhost:27017/gigih');

const songs = [
  {
    "title": "Shape of You",
    "artists": ["Ed Sheeran"],
    "album": "÷ (Divide)"
  },
  {
    "title": "Believer",
    "artists": ["Imagine Dragons"],
    "album": "Evolve"
  },
  {
    "title": "Dance Monkey",
    "artists": ["Tones and I"],
    "album": "The Kids Are Coming"
  },
  {
    "title": "Blinding Lights",
    "artists": ["The Weeknd"],
    "album": "After Hours"
  },
  {
    "title": "Someone Like You",
    "artists": ["Adele"],
    "album": "21"
  },
  {
    "title": "Bohemian Rhapsody",
    "artists": ["Queen"],
    "album": "A Night at the Opera"
  },
  {
    "title": "Hotel California",
    "artists": ["Eagles"],
    "album": "Hotel California"
  },
  {
    "title": "Hey Jude",
    "artists": ["The Beatles"],
    "album": "The Beatles (White Album)"
  },
  {
    "title": "Wonderwall",
    "artists": ["Oasis"],
    "album": "(What's the Story) Morning Glory?"
  },
  {
    "title": "Sweet Child o' Mine",
    "artists": ["Guns N' Roses"],
    "album": "Appetite for Destruction"
  }
];

db.songs.insertMany(songs);