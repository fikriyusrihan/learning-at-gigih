import express from 'express';
import {transfer} from "../service/transaction.service.js";
import httpStatus from "http-status";

const router = express.Router();

router.post('/transactions', (req, res) => {
    try {
        const {sourceAccount, destinationAccount, amount} = req.body;
        if (!sourceAccount || !destinationAccount || !amount) {
            res.status(httpStatus.BAD_REQUEST).json({message: 'Invalid request body'});
            return;
        }

        if (typeof amount !== 'number') {
            res.status(httpStatus.BAD_REQUEST).json({message: 'Invalid amount data type'});
            return;
        }

        const data = transfer(sourceAccount, destinationAccount, amount);
        res.status(httpStatus.CREATED).json({message: 'Transaction created successfully', data});
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
});

export default router;