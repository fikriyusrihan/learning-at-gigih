import express from "express";
import httpStatus from "http-status";
import {register} from "../service/customer.service.js";

const router = express.Router();

router.post('/customers', (req, res) => {
    try {
        const {name, email} = req.body;

        if (!name || !email) {
            res.status(httpStatus.BAD_REQUEST).json({message: 'Invalid request body'});
        }

        const customer = register(name, email);
        res.status(httpStatus.CREATED).json(customer);
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: e.message});
    }
});

export default router;