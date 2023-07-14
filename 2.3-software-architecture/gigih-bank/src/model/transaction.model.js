import {v4 as uuidv4} from 'uuid';

const transactions = [];

class Transaction {
    constructor(sourceId, destinationId, amount) {
        this.transactionId = uuidv4();
        this.sourceId = sourceId;
        this.destinationId = destinationId;
        this.amount = amount;
        this.timestamp = new Date().toISOString();
    }
}

function createTransaction(sourceId, destinationId, amount) {
    const transaction = new Transaction(sourceId, destinationId, amount);
    transactions.push(transaction);

    return transaction;
}

export {createTransaction};