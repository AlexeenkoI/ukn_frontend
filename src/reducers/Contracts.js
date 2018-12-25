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
    currentContractFiles : [{
      uid: '1',
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png',
      storagePath : '//str.path'
    }, {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
      storagePath : '//str.path',
    }, {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
      storagePath : '//str.path'
    }]
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
        console.log(currentContract);
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
        console.log('file uploaded');
        console.log(action);
        return {
          ...state,
          currentContractFiles : [
            ...state,
            action.file
          ]
        }
      default:
        return state;
    }
  }