const initialState = {
    isLoaded : false,
    isFetching : false,
    page : 1,
    filters : {
      address : "",
      contract_number : "",
      date_started : "",
      date_deadline : "",
      customer : "",
      customer_id : "",
      contractor : "",
      status : "",
      type_of_work : "",
      limit : 10,
      offset : 0,
      whereString : "",
    },
    filterData : {
      types : [],
      users : [],
      contractors : []
    },
    data : [],
    contractLoading: false,
    currentContract : {}
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
          data : action.data,
          count : action.count
        }
      case 'PAGE_CHANGE':
        return {
          ...state,
          page : action.pageNum
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
      case 'START_GET_CONTRACT_DATA' :
        return {
          ...state,
          contractLoading : true,
        }
      case 'RECIEVE_CONTRACT_DATA' :
        const currentContract = action.data[0];
        return {
          ...state,
          contractLoading : false,
          currentContract 
        }
      default:
        return state;
    }
  }