/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config.js';
import httpStatus from 'http-status';
import routes from './routes/routes.js';
import ApiError from './utils/ApiError.js';
import { errorConverter, errorHandler } from './middlewares/error.js';

const databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl);
const database = mongoose.connection;

database.on('error', (error) => {
  console.error(error);
});

database.once('connected', () => {
  console.log('Database connected');
});

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api/v1', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'The requested resource not found'));
});

app.use(errorConverter);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
