import { message } from 'antd';

export const GET_USERS_LIST = 'GET_USERS_LIST';
export const RECIEVE_USERS_LIST = 'RECIEVE_USERS_LIST';
export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_SUCSESS = 'UPDATE_SUCSESS';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const GET_USER = 'GET_USER';
export const RECIEVE_USER = 'RECIEVE_USER';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';
export const ADD_CONDITION = 'ADD_CONDITION';
export const CLEAR_SEARCH_STRING = 'CLEAR_SEARCH_STRING';


export function getUserList(id , condition){
  return function(dispatch){
    dispatch(fetchUsers());
    const reqBody = {
      userId : id,
      data : condition
    }
    const token = localStorage.getItem('app_token');
    fetch('/api/users/getall',{
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
        dispatch(recieveUserList(json))
      }
    })
    .catch(err => {
      message.error(err.message);
    });
  }
}

export function getUser(currUserId, incUserId){
  return function (dispatch){
    dispatch(fetchUser());
    const reqBody = {
      userId : currUserId,
      loadId : incUserId
    }

    const token = localStorage.getItem('app_token');
    fetch('/api/users/get/'+ incUserId,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'GET',
      //body : JSON.stringify(reqBody)
    })
    .then( res => res.json())
    .then( json => {
      if(json.success === true){
        dispatch(recieveUser(json))
      }
    })
    .catch(err => {
      message.error(err.message);
    });
  }
}

export function recieveUser(json){
  return {
    type : RECIEVE_USER,
    json
  }
}
export function fetchUsers(){
  return{
    type : GET_USERS_LIST
  }
}

export function fetchUser(){
  return {
    type: GET_USER
  }
}

export function addCondition(conType, value){
  return {
    type : ADD_CONDITION,
    conType,
    value
  }
}

export function clearSearchStr(){
  return {
    type : CLEAR_SEARCH_STRING
  }
}

export function setPage(page){
  return {
    type: "SET_PAGE",
    page
  }
}

export function updatedUser(incId,formData){
  return function(dispatch){
    const reqBody = {
      userId : incId,
      data : formData
    }
    const id = formData.id ? formData.id : '';
    const token = localStorage.getItem('app_token');
    fetch('/api/users/update/' + id,{
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
      if(json.success === true){
        message.success(json.messasge);
        if(incId === formData.id){
          dispatch(rerenderUser(formData));
          dispatch(getUserList(id));
        }else{
          dispatch(getUserList(id));
        }
      }
    })
    .catch( err => {
      message.error(err.message)
    })
  }
}

export function recieveUserList(data){
  return {
    type : RECIEVE_USERS_LIST,
    data,
  }
}

export function insertUser(incId, formData){
  return function(dispatch){
    const reqBody = {
      userId : incId,
      data : formData
    }
    const token = localStorage.getItem('app_token');
    fetch('/api/users/create/', {
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
      if(json.success === true){
        message.success(json.msg);
        if(incId === formData.id){
          dispatch(rerenderUser(formData));
          dispatch(getUserList(incId));
        }else{
          dispatch(getUserList(incId));
        }
      }
    })
    .catch( err => {
      message.error(err.message)
    })
  }
}

export function deleteUser(id,deleteUserId){
  return function(dispatch){
    if(id === deleteUserId){
      message.warning('Вы не можете удалить свою учетную запись!');
      return;
    }
    const reqBody = {
      userId : id,
      deleteId : deleteUserId
    }
    const token = localStorage.getItem('app_token');
    fetch('/api/users/delete/' + deleteUserId,{
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
      dispatch(getUserList(id))
    })
    .catch( err => {
      message.error(err.message);
    })
  }
}

export function rerenderUser(data){
  return {
    type : "REINIT_USER",
    data
  }
}

export function clearForm(){
  return {
    type : CLEAR_CURRENT_USER
  }
}