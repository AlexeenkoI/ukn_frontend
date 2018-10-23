const initialState = {
    loading: true,
    data : [],
    searchString : '',
    currentCustomer : {}
}
export const GET_CUSTOMERS_LIST = 'GET_CUSTOMERS_LIST';
export const RECIEVE_CUSTOMERS_LIST ='RECIEVE_CUSTOMERS_LIST';
export const GET_CUSTOMER = 'GET_CUSTOMER';
export const RECIEVE_CUSTOMER = 'RECIEVE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';


export function customersReducer(state = initialState, action){
    switch(action.type){
        case 'GET_CUSTOMERS_LIST' :
            return state;
        case 'RECIEVE_CUSTOMERS_LIST' :
            return state; 
        case 'RECIEVE_CUSTOMER' :
            return state;
        case 'CREATE_CUSTOMER' : 
            return state;
        default:
            return state;
    }
}