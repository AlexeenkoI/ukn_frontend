import { message } from 'antd';
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


export const getCustomersList = (uId, searchData = '') => {
  return (dispatch) => {
    //TO DO
    dispatch(startGetCustomers())
    const reqBody = {
      userId : uId,
      data : searchData
    }
    const token = localStorage.getItem('app_token');
    fetch('/api/customers/getall',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'POST',
      body : JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(json => {
      if(json.success === true){
        dispatch(recieveCustomersList(json))
      }else{
        dispatch({
            type : "ERROR_RECIEVE"
        })
        message.error(`Ошибка ${json.message.toString()}`)
      }
    })
    .catch(err => {
        message.warning(err.message);
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
    const token = localStorage.getItem('app_token');
    fetch('/api/customers/get/' + customerId,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'GET',
      //body : JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(json => {
      if(json.success === true){
        dispatch(recieveCustomer(json.data))
      }
    })
    .catch(err => {
      message.warning(err.message);
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
    const token = localStorage.getItem('app_token');
    fetch('/api/customers/update/' + formData.id,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'PUT',
      body : JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(json => {
      if(json.success === true){
        //console.log('customer recieved');
        dispatch(getCustomersList(uId, str));
        message.success(json.message);
        dispatch({
          type:'FINISH_INSERTING',
          data : json.data.insertId
        })
      }else{
        message.warning(json.message);
      }
    })
    .catch(err => {
      message.warning(err.message);
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
    const token = localStorage.getItem('app_token');
    fetch('/api/customers/delete/' + deleteId,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'DELETE',
      body : JSON.stringify(reqBody)
    })
    .then( res => res.json())
    .then( json => {
      message.success(json.message)
      dispatch(getCustomersList(uId, str))
    })
    .catch( err => {
      message.error(err.message);
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
    const token = localStorage.getItem('app_token');
    fetch('/api/customers/create',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'PUT',
      body : JSON.stringify(reqBody)
    })
    .then( res => res.json())
    .then( json => {
      message.success(json.message)
      dispatch(getCustomersList(uId))
      dispatch({
        type:'FINISH_INSERTING',
        data : json.insertId
      })
    })
    .catch( err => {
      message.error(err.message);
    })
  }
}

export const setSearch = (conType, value) => {
  return {
    type : "ADD_CONDITION",
    conType,
    value
  }
}

export const setPage = (page) => {
  return {
    type: "SET_PAGE",
    page
  }
}

export const clearInsert = () => {
  return {
    type : CLEAR_LAST_INSERTED
  }
}