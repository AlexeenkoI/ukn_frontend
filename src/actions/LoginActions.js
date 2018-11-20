import { message } from 'antd';
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const ETHERNAL_ERROR = 'ETHERNAL_ERROR';
export const LOGOUT = 'LOGOUT';
export const REINIT_USER = 'REINIT_USER';


export function tryToLogin(auth,pass,isRemember){
  return function(dispatch){
    dispatch(startLogin());
    const reqBody = {
      data : {
        login : auth,
        password : pass
      }
    }
    fetch('/api/login',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:'POST',
      body : JSON.stringify(reqBody)
    })
    .then(response => response.json())
    .then(json => {
      if(json.success === true){
        console.log(json);
        dispatch(successLogin(json))
        if(isRemember){
            // document.cookie = "autoLogin=true";
        }
      }else{
        dispatch(errorLogin(json))
        message.error(json.errMsg, 2.5)
        .then(() => console.log('finished error popup'));
      }
    })
    .then(() =>{ 
      if(isRemember)
        document.cookie = "autoLogin=true;"
    })
    .catch(err => dispatch(errorLogin(err)))
  }
}
export function startLogin(){
  return{
    type : LOGIN_ATTEMPT,
    isFetching : true
  }
}

export function successLogin(incData){
  return{
    type : LOGIN_SUCCESS,
    data : incData.data[0],
    userRoles : incData.userRoles,
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

export function logout(){
  document.cookie = "auth_id=;";
  return {
      type : LOGOUT
  }
}