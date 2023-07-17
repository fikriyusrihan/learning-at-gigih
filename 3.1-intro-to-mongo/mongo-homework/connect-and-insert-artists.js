const db = connect('mongodb://localhost:27017/gigih');

const artists = [
  {
    "name": "Ed Sheeran",
    "dateOfBirth": "17 February 1991",
    "genres": ["Pop", "Folk", "R&B"]
  },
  {
    "name": "Imagine Dragons",
    "dateOfBirth": "9 September 1987",
    "genres": ["Pop rock", "Alternative rock"]
  },
  {
    "name": "Tones and I",
    "dateOfBirth": "13 August 2000",
    "genres": ["Pop", "Dance-pop"]
  },
  {
    "name": "The Weeknd",
    "dateOfBirth": "16 February 1990",
    "genres": ["R&B", "Pop", "Alternative"]
  },
  {
    "name": "Adele",
    "dateOfBirth": "5 May 1988",
    "genres": ["Pop", "Soul"]
  },
  {
    "name": "Queen",
    "dateOfBirth": "8 July 1947",
    "genres": ["Rock"]
  },
  {
    "name": "Eagles",
    "dateOfBirth": "25 October 1947",
    "genres": ["Rock", "Country rock"]
  },
  {
    "name": "The Beatles",
    "dateOfBirth": "9 October 1940",
    "genres": ["Rock", "Pop"]
  },
  {
    "name": "Oasis",
    "dateOfBirth": "14 October 1967",
    "genres": ["Rock", "Britpop"]
  },
  {
    "name": "Guns N' Roses",
    "dateOfBirth": "6 February 1962",
    "genres": ["Hard rock", "Glam metal"]
  }
];

db.artists.insertMany(artists);