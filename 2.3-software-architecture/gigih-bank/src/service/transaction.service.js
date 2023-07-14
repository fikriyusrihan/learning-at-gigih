import {getCustomer} from "../model/customer.model.js";
import {createTransaction} from "../model/transaction.model.js";

function transfer(sourceId, destinationId, amount) {
    const sourceAccount = getCustomer(sourceId);
    const destinationAccount = getCustomer(destinationId);

    if (!sourceAccount || !destinationAccount) {
        throw new Error('Invalid source or destination account');
    }

    if (sourceAccount.balance < amount) {
        throw new Error('Insufficient balance in the source account');
    }

    sourceAccount.balance -= amount;
    destinationAccount.balance += amount;

    return createTransaction(sourceAccount.customerId, destinationAccount.customerId, amount);
}

export {transfer};