import express from 'express';
import httpStatus from "http-status";
import cors from 'cors';
import transactionRouter from "./controller/transaction.controller.js";
import customerRouter from "./controller/customer.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.statusCode = httpStatus.OK;
    res.json({message: 'Hello World!'});
});

app.use(customerRouter);
app.use(transactionRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});