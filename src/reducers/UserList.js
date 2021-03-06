const initialState= {
  currentUserId : '',
  isLoading : true,
  currentUserData : {
    role : 0
  },
  count : 0,
  page : 1,
  searchData : {
    whereString : '',
    limit : 10,
    offset : 0
  },
  userIsLoading : false,
  data : []
}

export function userListReducer(state = initialState, action){
  switch(action.type){
    case 'GET_USERS_LIST':
      return {
        ...state,
        isLoading : true
      }
    case 'RECIEVE_USERS_LIST':
      return {
        ...state,
        isLoading : false,
        data : action.data.data.data,
        count : action.data.total
      }
    case 'RECIEVE_USER':
      const currentUserData = action.json.data;
      const userRoles = action.json.userRoles;
      return {
        ...state,
        userIsLoading : false,
        currentUserData,
        userRoles
      }
    case 'ADD_CONDITION':
      let newData = state.searchData;
      newData[action.conType] = action.value;
      return {
        ...state,
        searchData : newData
      }
    case 'SET_PAGE':
      return {
        ...state,
        page : action.page
      }
    case 'GET_USER':
      return{
        ...state,
        userIsLoading : true,
      }
    case 'CLEAR_CURRENT_USER':
      return {
        ...state,
        currentUserData : {}
      }
    default:
      return state;
  }
}