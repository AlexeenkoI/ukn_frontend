import { message } from 'antd';
export const GET_CUSTOMERS_LIST = 'GET_CUSTOMERS_LIST';
export const RECIEVE_CUSTOMERS_LIST ='RECIEVE_CUSTOMERS_LIST';
export const GET_CUSTOMER = 'GET_CUSTOMER';
export const RECIEVE_CUSTOMER = 'RECIEVE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';

export const getCustomersList = (userId, searchStr) => {
    return (dispatch) => {
        //TO DO
    }
}

export const recieveCustomersList = (data) => {
    return {
        type : RECIEVE_CUSTOMERS_LIST,
        data
    }
}

export const getCurrentCustomer = (userId, customerId) => {
    return (dispatch) => {
        //TO DO
    }
}

export const recieveCustomer = (data) => {
    return {
        type : RECIEVE_CUSTOMER,
        data
    }
}

export const updateCustomer = (userId, formData) => {
    return (dispatch) => {
        //TO DO
    }
}

export const deleteCustomer = (userId, deleteId) => {
    return (dispatch) => {
        //TO DO
    }
}

export const insertCustomer = (userId, formData) => {
    return (dispatch) => {
        //TO DO
    }
}