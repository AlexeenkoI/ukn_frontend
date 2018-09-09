const initialState = {
    isLoaded : false,
    isFetching : false,
    limit : 10,
    filters : {
      address : "",
      contract_number : "",
      date_started : "",
      date_deadline : "",
      customer : "",
      contractor : "",
      status : "",
      type_of_work : "",
      limit : "",
      offset : "",
      whereString : "",
    },
    data : [],
    filterData : {
      types : [],
      users : [],
      contractors : []
    }
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
      case 'SET_FILTERS' :
        let newFilters = state.filters;
        newFilters[action.name] = action.filter;
        return {
          ...state,
          isFetching : false,
          filters : newFilters
        }
      case 'APPLY_FILTERS' :
        return {
          ...state,
          isFetching: true,
        }
      case 'RECIEVE_FILTER_VALUES' : 
        return {
          ...state,
          filterData : {
            types : action.types,
            users : action.users
          }
        }
      default:
        return state;
    }
  }