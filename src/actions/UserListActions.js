import { message } from 'antd';

export const GET_USERS_LIST = 'GET_USERS_LIST';
export const RECIEVE_USERS_LIST = 'RECIEVE_USERS_LIST';
export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_SUCSESS = 'UPDATE_SUCSESS';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const GET_USER = 'GET_USER';
export const RECIEVE_USER = 'RECIEVE_USER';


export function getUserList(id){
    return function(dispatch){
       // dispatch(fetchUsers());
       console.log('start');
        const reqBody = {
            userId : id,
        }
        fetch('/api/users/getusers',{
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
                console.log('user list recieved');
                dispatch(recieveUserList(json.users))
            }
        })
        .catch(err => {
            console.log(err);
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
        fetch('/api/users/getuser/'+ incUserId,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then( res => res.json())
        .then( json => {
            if(json.success == true){
                console.log('User recieved');
                console.log(json);
                
                dispatch(recieveUser(json))
            }
        })
    }
}

export function recieveUser(json){
    return {
        type : RECIEVE_USER,
        json
    }
}

export function fetchUser(){
    return {
        type: GET_USER
    }
}

export function updatedUser(id,formData){
    return function(dispatch){
        const reqBody = {
            userId : id,
            data : formData
        }
        const id = formData.id ? formData.id : '';
        fetch('/api/users/updateuser/' + id,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'PUT',
            body : JSON.stringify(reqBody)
        })
        .then( res => res.json())
        .then( json => {
            if(json.success == true){
                console.log(json);
                message.success(json.msg);
            }
        })
        .catch( err => {
            console.log(err);
        })
    }
}

export function recieveUserList(data){
    console.log('recieve user list');
    console.log(data);
    return {
        type : RECIEVE_USERS_LIST,
        data
    }
}

export function insertOrUpdateUser(id, data){

}

export function deleteUser(id,deleteUserId){

}