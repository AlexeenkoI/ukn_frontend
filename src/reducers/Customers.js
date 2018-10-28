const initialState = {
    loading: false,
    data : [
        // {
        //     id :'1',
        //     name : 'name1',
        //     firstname : 'fio1',
        //     secondname : 'otch1',
        //     email : 'test@test1.ru',
        //     phone : '123123123' 
        // },
        // {
        //     id :'2',
        //     name : 'name2',
        //     firstname : 'fio2',
        //     secondname : 'otch2',
        //     email : 'test@test2.ru',
        //     phone : '222222222' 
        // },
        // {
        //     id :'3',
        //     name : 'name3',
        //     firstname : 'fio3',
        //     secondname : 'otch3',
        //     email : 'test@test3.ru',
        //     phone : '33333333' 
        // }
    ],
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
            return {
                ...state,
                loading : true
            };
        case 'RECIEVE_CUSTOMERS_LIST' :
            return {
                ...state,
                loading : false,
                data : action.data
            }; 
        case 'RECIEVE_CUSTOMER' :
            return {
                ...state,
                currentCustomer : action.data[0]
            };
        case 'CREATE_CUSTOMER' : 
            return state;
        case 'SET_SEARCH_STRING' : 
            return {
                ...state,
                searchString : action.str
            }
        case 'RESET_SEARCH_STRING' : 
            return {
                ...state,
                searchString : ''
            }
        default:
            return state;
    }
}