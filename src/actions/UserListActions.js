export const GET_USERS_LIST = 'GET_USERS_LIST';
export const RECIEVE_USERS_LIST = 'RECIEVE_USERS_LIST';
export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_SUCSESS = 'UPDATE_SUCSESS';
export const UPDATE_ERROR = 'UPDATE_ERROR';

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
                dispatch(recieveUserList(json.users))
            }
        })
        .catch(err => {

        });
    }
}

export function fetchUsers(){

}

export function UpdatedUser(id,data){

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