import mongoose from 'mongoose';
import toJSON from './plugins/converter.plugin.js';

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

movieSchema.plugin(toJSON);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
