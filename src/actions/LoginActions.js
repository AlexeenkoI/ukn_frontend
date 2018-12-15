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
        localStorage.setItem('app_token',json.auth_token);
        message.success(json.message, 1.5);
        dispatch(successLogin(json))
        if(isRemember){
          // document.cookie = "autoLogin=true";
          //Запоминаем конкретного пользака без его пароля, он нам не нужен
          localStorage.setItem('is_remember', true);
          localStorage.setItem('currentUser',JSON.stringify(json.data));
        }
      }else{
        dispatch(errorLogin(json))
        message.error(json.message, 2.5)
      }
    })
    .then(() =>{ 
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
    data : incData.data,
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

/**
 * Логаут из приложения
 * 1 - отправляем запрос на апи с просьбой кильнуть текущий токен конкретного пользака
 * 2 - киляем токен в локальном хранилище
 * 3 - посылаем действие о разлогинивании
 */
export function logout(){
  return function(dispatch){
    const token = localStorage.getItem('app_token');
    fetch('/api/logout',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'POST',
    })
    .then(response => response.json())
    .then(json => {
      console.log('logout data')
      console.log(json)
      if(json.success){
        message.success(json.message,1.5);
        localStorage.removeItem('app_token');
        localStorage.removeItem('is_remember');
        localStorage.removeItem('currentUser');
        
        dispatch({
          type : LOGOUT
        })
      }

      //return {
      //  type : LOGOUT
      //}
    })
    .catch(err => {
      message.error(err.message, 2);
    })
  }

}