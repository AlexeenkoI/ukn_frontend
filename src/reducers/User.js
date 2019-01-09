
const initialState = {
    name: '',
    status : '',
    loggedIn : false,
    isFetching : false,
    errMsg:'',
    referer : '/'
  }
  
  export function userReducer(state = initialState, action) {
    switch(action.type){
      case 'LOGIN_ATTEMPT':
        return {
          ...state,
          isFetching : true
        }
      case 'LOGIN_SUCCESS':
      console.log('login success');
      console.log(action);
        return{
          ...state,
          loggedIn : true,
          isFetching : false,
          id : action.data.id,
          name : action.data.name,
          surename : action.data.surename,
          status : action.data.status,
          role : action.data.role_id,
          userRoles : action.userRoles,
          referer : action.referer
        }
      case 'LOGIN_FAIL':
        return {
          ...state,
          isFetching : false,
          errMsg : action.data.errMsg
        }
      case 'LOGOUT' : 
        return {
          ...state,
          loggedIn : false
        }
      case 'REINIT_USER' :
        return {
          ...state,
          name : action.data.name,
          surename : action.data.surename,
          status : action.data.status,
          role : action.data.role
        }
      default:
        return state
    }
    
  }