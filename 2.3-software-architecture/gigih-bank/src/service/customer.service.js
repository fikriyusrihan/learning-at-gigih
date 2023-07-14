import {createCustomer} from "../model/customer.model.js";


function register(name, email) {
    return createCustomer(name, email, 5000);
}

export {register};