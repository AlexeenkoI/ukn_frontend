
const initialState = {
    name: '',
    status : '',
    loggedIn : false,
    isFetching : false,
    //token : '',
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
          role : action.data.role
          //token : action.data.token
        }
      case 'LOGIN_FAIL':
        return {
          ...state,
          isFetching : false,
          errMsg : action.data.errMsg
        }
      default:
        return state
    }
    
  }