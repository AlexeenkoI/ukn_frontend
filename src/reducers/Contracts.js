const initialState = {
    isLoaded : false,
    isFetching : false,
    page : 1,
    limit : 10,
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
      whereString : "",
    },
    filterData : {
      types : [],
      users : [],
      contractors : []
    },
    data : [],
    contractLoading: false,
    contractIsUpdated : false,
    currentContract : {},
    currentContractFiles : [],
    filesIsLoading : false
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
          //page : action.lastPage ? action.lastPage : action.page,
          page : action.page,
          data : action.data,
          total : action.total
        }
      case 'PAGE_CHANGE':
        return {
          ...state,
          page : action.pageNum
        }
      case 'SET_LIMIT':
        return {
          ...state,
          limit : action.limit
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
        const currentContract = action.data;
        return {
          ...state,
          contractLoading : false,
          currentContract 
        }
      case 'CONTRACT_UPDATED':
        return {
          ...state,
          contractIsUpdated : true
        }
      case 'CONTRACT_LEAVED' : 
        return {
          ...state,
          contractIsUpdated : false
        }
      case 'FILE_UPLOADED' : 
        return {
          ...state,
          currentContractFiles : [
            ...state,
            action.file
          ]
        }
      case 'START_FILES_LOADING' : 
        return {
          ...state,
          filesIsLoading : true
        }
      case 'FILE_LIST_LOADED' : 
        return {
          ...state,
          filesIsLoading : false,
          currentContractFiles : action.data
        }
      case 'CLEAR_FILE_LIST' : 
        return {
          ...state,
          currentContractFiles : []
        }
      default:
        return state;
    }
  }