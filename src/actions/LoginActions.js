import { message } from 'antd';
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const ETHERNAL_ERROR = 'ETHERNAL_ERROR';


export function tryToLogin(auth,pass){
    return function(dispatch){
        dispatch(startLogin());
        const data = {
            login : auth,
            password : pass
        }
        fetch('/users',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(data)
        })
        .then(response => response.json())
        .then(json => {
            console.log('recieved data');
            console.log(json);
            if(json.status === 'ok'){
                setTimeout(()=>dispatch(successLogin(json)),1000)
                
            }else{
                dispatch(errorLogin(json))
                message.error(json.errMsg, 2.5)
                .then(() => console.log('finished error popup'));
                
            }
            
        }).catch(err => dispatch(errorLogin(err)))
    }
}
export function startLogin(){
    return{
        type : LOGIN_ATTEMPT,
        isFetching : true
    }
}

export function successLogin(userData){
    return{
        type : LOGIN_SUCCESS,
        data : userData,
        isFetching : false
    }
}

export function errorLogin(msg){
    return{
        type : LOGIN_FAIL,
        data : msg,
        isFetching : false
    }
}