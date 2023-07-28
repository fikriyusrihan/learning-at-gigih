import express from 'express';

const app = express();

app.use(express.json());

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port 3000');
});
