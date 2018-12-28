const initialState = {
  loading: false,
  loaded : false,
  count : 0,
  page : 1,
  data : [],
  searchData:{
    whereString : '',
    limit : 10,
    offset : 0
  },
  currentCustomer : {},
  updating : false,
  lastInsertId : ''
}
export const GET_CUSTOMERS_LIST = 'GET_CUSTOMERS_LIST';
export const RECIEVE_CUSTOMERS_LIST ='RECIEVE_CUSTOMERS_LIST';
export const GET_CUSTOMER = 'GET_CUSTOMER';
export const RECIEVE_CUSTOMER = 'RECIEVE_CUSTOMER';
export const UPDATE_CUSTOMER = 'UPDATE_CUSTOMER';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const CREATE_CUSTOMER = 'CREATE_CUSTOMER';


export function customersReducer(state = initialState, action){
  switch(action.type){
    case 'GET_CUSTOMERS_LIST' :
      return {
        ...state,
        loading : true
      };
    case 'RECIEVE_CUSTOMERS_LIST' :
      return {
        ...state,
        loading : false,
        loaded : true,
        page : action.data.data.page,
        data : action.data.data.data,
        count : action.data.data.total
      }; 
    case 'RECIEVE_CUSTOMER' :
      return {
        ...state,
        currentCustomer : action.data
      };
    case 'CREATE_CUSTOMER' : 
      return state;
    case 'ADD_CONDITION':
      let newData = state.searchData;
      newData[action.conType] = action.value;
      return {
        ...state,
        searchData : newData
      }
    case 'SET_PAGE' : 
      return {
        ...state,
        page : action.page
      }
    case 'INSERTING_OR_UPDATING':
      return {
        ...state,
        updating : true,
      }
    case 'FINISH_INSERTING':
      return{
        ...state,
        updating : false,
        lastInsertId : action.data
      }
    case 'CLEAR_LAST_INSERTED' : 
      return {
        ...state,
        updating : false,
        currentCustomer : {},
        lastInsertId : ''
      }
    case 'RESET_SEARCH_STRING' : 
      return {
        ...state,
        searchString : ''
      }
    case 'ERROR_RECIEVE' : 
      return {
        ...state,
        loading : false
      }
    default:
      return state;
  }
}