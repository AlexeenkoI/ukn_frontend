
const initialState = {
    name: '',
    status : '',
    loggedIn : false,
    isFetching : false,
    errMsg:''
  }
  
  export function userReducer(state = initialState, action) {
    switch(action.type){
      case 'LOGIN_ATTEMPT':
        return {
          ...state,
          isFetching : true
        }
      case 'LOGIN_SUCCESS':
        return{
          ...state,
          loggedIn : true,
          isFetching : false,
          id : action.data.id,
          name : action.data.name,
          surename : action.data.surename,
          status : action.data.status,
          role : action.data.role,
          userRoles : action.userRoles
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