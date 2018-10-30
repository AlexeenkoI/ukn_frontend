import { message } from 'antd';
import { history } from 'react-router-dom'
export const GET_CUSTOMERS_LIST = 'GET_CUSTOMERS_LIST';
export const RECIEVE_CUSTOMERS_LIST ='RECIEVE_CUSTOMERS_LIST';
export const GET_CUSTOMER = 'GET_CUSTOMER';
export const RECIEVE_CUSTOMER = 'RECIEVE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';
export const SET_SEARCH_STRING = 'SET_SEARCH_STRING';
export const RESET_SEARCH_STRING = 'RESET_SEARCH_STRING';
export const CLEAR_LAST_INSERTED = 'CLEAR_LAST_INSERTED';

export const startGetCustomers = () =>{
    return {
        type : GET_CUSTOMERS_LIST
    }
}

export const getCustomersList = (uId, searchStr = '') => {
    return (dispatch) => {
        //TO DO
        dispatch(startGetCustomers())
        const reqBody = {
            userId : uId,
            search : searchStr
        }
        fetch('/api/customers/getcustomers',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success == true){
                console.log('customers list recieved');
                console.log(json);
                dispatch(recieveCustomersList(json.data))
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const search = (str) => {
    return {
        type : SET_SEARCH_STRING,
        str
    }
}

export const resetSearch = () => {
    return {
        type : RESET_SEARCH_STRING
    }
}

export const recieveCustomersList = (data) => {
    return {
        type : RECIEVE_CUSTOMERS_LIST,
        data
    }
}

export const getCurrentCustomer = (uId, customerId) => {
    return (dispatch) => {
        //TO DO
        const reqBody = {
            userId : uId,
        }
        fetch('/api/customers/getcustomer/' + customerId,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success == true){
                console.log('customer recieved');
                console.log(json);
                dispatch(recieveCustomer(json.data))
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const recieveCustomer = (data) => {
    return {
        type : RECIEVE_CUSTOMER,
        data
    }
}

export const updateCustomer = (uId, formData, str) => {
    return (dispatch) => {
        //TO DO
        const reqBody = {
            userId : uId,
            data : formData
        }
        fetch('/api/customers/updatecustomer/' + formData.id,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success == true){
                //console.log('customer recieved');
                console.log(json);
                dispatch(getCustomersList(uId, str));
                message.success(json.msg);
            }else{
                console.log('err');
                console.log(json);
                //message.warning(json.msg);
            }
        })
        .catch(err => {
            console.log(err);
            message.warning(err);
        });
    }
}

export const deleteCustomer = (uId, deleteId, str) => {
    return (dispatch) => {
        //TO DO
        const reqBody = {
            userId : uId,
            deleteId : deleteId
        }
        fetch('/api/customers/deletecustomer/' + deleteId,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'DELETE',
            body : JSON.stringify(reqBody)
        })
        .then( res => res.json())
        .then( json => {
            message.success(json.msg)
            dispatch(getCustomersList(uId, str))
        })
        .catch( err => {
            message.error(err);
            console.log(err);
        })
    }
}

export const insertCustomer = (uId, formData) => {
    return (dispatch) => {
        //TO DO
        dispatch({
            type:'INSERTING_OR_UPDATING'
        })
        const reqBody = {
            userId : uId,
            data : formData
        }
        console.log(reqBody);
        fetch('/api/customers/createcustomer',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'PUT',
            body : JSON.stringify(reqBody)
        })
        .then( res => res.json())
        .then( json => {
            message.success(json.msg)
            console.log('customer created');
            console.log(json);
            dispatch(getCustomersList(uId))
            dispatch({
                type:'FINISH_INSERTING',
                data : json.data.insertId
            })
        })
        .catch( err => {
            message.error(err);
            console.log(err);
        })
    }
}

export const setSearch = (userId, string) => {

}

export const clearInsert = () => {
    console.log('clear action');
    return {
        type : CLEAR_LAST_INSERTED
    }
}