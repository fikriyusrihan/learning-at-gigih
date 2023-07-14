import {v4 as uuidv4} from 'uuid';

const customers = [];

class Customer {
    constructor(name, email, initialBalance) {
        this.customerId = uuidv4();
        this.name = name;
        this.email = email;
        this.balance = initialBalance;
    }
}

function createCustomer(name, email, initialBalance) {
    const customer = new Customer(name, email, initialBalance);

    customers.push(customer);

    return customer;
}

function getAllCustomers() {
    return customers;
}

function getCustomer(customerId) {
    return customers.find(customer => customer.customerId === customerId);
}

export {
    createCustomer,
    getAllCustomers,
    getCustomer,
}
