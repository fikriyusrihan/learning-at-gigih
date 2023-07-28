import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    trim: true,
  },
  year: {
    required: true,
    type: Number,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
