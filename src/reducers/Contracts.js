const initialState = {
    //tableName: 'Contracts',
    isLoaded : false,
    isFetching : false,
    limit : 10,
    data : []
  }
  
  export function contractsReducer(state = initialState, action) {
    switch(action.type){
      case 'START_GET_CONTRACTS':
        return {
          ...state,
          isFetching : true
        }
      case 'RECIEVE_CONTRACTS':
        return {
          ...state,
          isLoaded : true,
          isFetching : false,
          data : action.data
        }
      case 'ERROR_RECIEVE_CONTRACTS':
        return {
          ...state,
          isLoaded : false,
          isFetching : false,
        }
      default:
        return state;
    }
  }