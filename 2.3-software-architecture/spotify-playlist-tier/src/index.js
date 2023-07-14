import express from 'express';
import httpStatus from "http-status";
import cors from 'cors';
import routes from './routes/v1/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.statusCode = httpStatus.OK;
    res.json({message: 'Hello World!'});
});

app.use('/v1', routes);

app.listen(3000, () => {
    console.log(`Server is started at http://localhost:3000!`);
});