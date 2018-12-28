import { message, notification } from 'antd'
import moment from 'moment'

export const START_GET_CONTRACTS = 'START_GET_CONTRACTS';
export const RECIEVE_CONTRACTS = 'RECIEVE_CONTRACTS';
export const ERROR_RECIEVE_CONTRACTS = 'ERROR_RECIEVE_CONTRACTS';
export const SET_FILTERS = 'SET_FILTERS';
export const APPLY_FILTERS = 'APPLY_FILTERS';
export const RESET_FILTERS = 'RESET_FILTERS';
export const RECIEVE_FILTER_VALUES = 'RECIEVE_FILTER_VALUES';
export const START_GET_CONTRACT_DATA = 'START_GET_CONTRACT_DATA';
export const RECIEVE_CONTRACT_DATA = 'RECIEVE_CONTRACT_DATA';
export const UPDATE_CONTRACT_DATA = 'UPDATE_CONTRACT_DATA';
export const DELETE_CONTRACT_DATA = 'DELETE_CONTRACT_DATA';

export function getContracts(id,filterData){
  return function(dispatch){
    dispatch(startGetContracts());
    const reqBody = {
      userId : id,
      data : filterData
    }
    console.log('get contracts...');
    const token = localStorage.getItem('app_token');
    fetch('/api/contracts/getall',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'POST',
      body : JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(json => {
      if(json.success === true){
        dispatch(recieveContracts(json))
      }
    })
    .catch(err => {
      dispatch(errorGettingContracts(err))
      message.error(err.message);
    });
  }
}

export function startGetContracts(){
  return {
    type : START_GET_CONTRACTS,
    isLoaded : false,
    isFetching : true
  }
}

export function recieveContracts(res){
  return {
    type : RECIEVE_CONTRACTS,
    isFetching : false,
    isLoaded : true,
    data : res.data.data,
    total : res.data.total,
    page : res.data.page
  }
}

export function recieveFilteredContracts(incFilters,res){
  return {
    type : RECIEVE_CONTRACTS,
    isFetching : false,
    filters : incFilters,
    data : res
  }
}

export function errorGettingContracts(err){
  return {
    type : ERROR_RECIEVE_CONTRACTS,
    msg : err.message
  }
}
export function setFilters(name, filter){
  return {
    type:SET_FILTERS,
    name,
    filter
  }
}



export function startFilterQuery(){
  return {
    type : APPLY_FILTERS,
    isFetching : true
  }
}

export function applyFilters(id, data, page, limit){
  const token = localStorage.getItem('app_token');
  console.log(data);
  data.filters.date_started = data.filters.date_started && moment(data.filters.date_started).format("YYYY-MM-DD HH:mm:ss")
  data.filters.date_deadline = data.filters.date_deadline && moment(data.filters.date_deadline).format("YYYY-MM-DD HH:mm:ss")
  return function(dispatch){
    dispatch(startFilterQuery());
    const reqBody = {
      userId : id,
      page : page ? page : data.page,
      limit: limit ? limit : data.limit,
      data : data.filters
    }
    fetch('/api/contracts/getall',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'POST',
      body : JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(json => {
      if(json.success === true){
        dispatch(recieveContracts(json, data))
      }
    })
    .catch(err => {
      dispatch(errorGettingContracts(err))
      message.error(err.message)
    });
  }
}

export function setPage(pageNum){
  return{
    type : "PAGE_CHANGE",
    pageNum
  }
}

export function setLimit(limit){
  return {
    type : "SET_LIMIT",
    limit
  }
}

export function resetFilters(id,data){
  const filters = data.filters
  for(let key in filters){
    if(filters[key] !=='limit' && filters[key] !== 'offset'){
        filters[key] = '';
    }
  }
  filters.contractor = [id];
  filters.status = 2;
  filters.date_started = '';
  filters.date_deadline= '';
  data.limit = 10;
  //filters.limit = 10;
  //filters.offset = 0;
  return applyFilters(id,data);
}

export function getFilterData(id){
  return function(dispatch){
    const reqBody = {
      userId : id,
    }
    const token = localStorage.getItem('app_token');
    fetch('/api/contracts/getfilters',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'POST',
      body : JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(json => {
      if(json.success === true){
        dispatch(recieveFilters(json))
      }
    })
    .catch(err => {
      dispatch(errorGettingContracts(err))
      message.error(err.message)
    });
  }
}

export function recieveFilters(data){
  return {
    type : RECIEVE_FILTER_VALUES,
    types : data.filterData.types,
    users : data.filterData.users
  }
}

export function getContract(user, contractId){
  return function(dispatch){
      dispatch(startGettingContract())
      const reqBody = {
        userId : user,
        contractId : contractId
      }
      const token = localStorage.getItem('app_token');
      fetch('/api/contracts/get/' + contractId , {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        method:'GET',
        //body : JSON.stringify(reqBody)
      })
      .then(res => res.json())
      .then(json => {
        if(json.success === true){
          dispatch(recieveContract(json.data));
          dispatch(loadFileList(json.data.id))
        }else{
          message.warning(json.message);
        }
      })
      .catch(err => {
        message.error(err.message);
      })

  }
}

export function startGettingContract(){
  return{
    type : START_GET_CONTRACT_DATA
  }
}

export function recieveContract(data){
  return {
    type : RECIEVE_CONTRACT_DATA,
    data
  }
}

export function updateContract(id, formData, filterData){
  return function (dispatch){
    //formData.date_deadline = moment(formData.date_deadline).format("X");
    //console.log(formData);
    const reqBody = {
      userId : id,
      data : formData
    }
    const token = localStorage.getItem('app_token');
    fetch('/api/contracts/update/' + formData.id , {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'PUT',
      body : JSON.stringify(reqBody)
    })
    .then( res => res.json())
    .then( json => {
      if(json.success === true){
        message.success(json.message);
        //dispatch(getContracts(id, filterData))
        dispatch(contractIsUpdated());
      }else{
        message.warning(json.message);
      }
    })
    .catch( err => {
      message.warning(err.message);
    })
  }
}

export function deleteContract(id, deleteId){

}

export function getContractFileList(userId, contractId){

}

export function updateContractFileList(userId, data){

}

export function contractIsUpdated(){
  return {
    type : "CONTRACT_UPDATED"
  }
}

export function contractLeaving(){
  return {
    type : "CONTRACT_LEAVED"
  }
}

export function createContract(uId,formData){
  return function (dispatch){
    const reqBody = {
      userId : uId,
      data : formData
    }
    const token = localStorage.getItem('app_token');
    fetch('/api/contracts/create', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'PUT',
      body : JSON.stringify(reqBody)
    })
    .then( res => res.json())
    .then( json => {
      if(json.success === true){
        //message.success(json.msg);
        notification.open({
          message : 'Заявка создана',
          description : 'Заявление создано и отправлено в работу.',
          duration : 3.5
        })
        //dispatch(getContracts(uId))
      }else{
        //message.warning(json.msg);
        notification.open({
          message : 'Заявка не создана',
          description : json.msg,
          duration : 3.5
        })
      }
    })
    .catch( err => {
      message.warning(err.message);
    })
  }
}

export function fileUploaded(file){
  return {
    type : 'FILE_UPLOADED',
    file
  }
}


export function removeFile(contractId,filePath){
  return dispatch => {
    const reqBody = {
      filePath : filePath
    }
    const token = localStorage.getItem('app_token');
    fetch(`/api/files/remove/${contractId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'POST',
      body : JSON.stringify(reqBody)
    })
    .then( res => res.json())
    .then( json => {
      if(json.success === true){
        message.success(json.message);
      }else{
        message.warning(json.message);
      }
    })
    .catch( err => {
      message.warning(err.message);
    })

  }
}

export function loadFileList(contractId){
  return dispatch => {
    dispatch({
      type : "START_FILES_LOADING"
    })
    const token = localStorage.getItem('app_token');
    fetch(`/api/files/getfiles/${contractId}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'GET',
    })
    .then( res => res.json())
    .then( json => {
      if(json.success === true){
        message.success(json.message);
        const data = json.data;
        dispatch(fileListLoaded(data))
      }else{
        message.warning(json.message);
      }
    })
    .catch( err => {
      message.warning(err.message);
    })
  }
}

export function clearFileList(){
  return {
    type : "CLEAR_FILE_LIST"
  }
}

export function fileListLoaded(data){
  return {
    type : "FILE_LIST_LOADED",
    data
  }
}