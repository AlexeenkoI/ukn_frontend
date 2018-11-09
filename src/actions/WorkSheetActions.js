import { message, notification } from 'antd'

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
        fetch('/api/contracts/getcontracts',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success == true){
                dispatch(recieveContracts(json))
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(errorGettingContracts(err))
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
        data : res.data,
        count : res.count
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
        msg : err
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

export function applyFilters(id, filters){
    return function(dispatch){
        dispatch(startFilterQuery());
        const reqBody = {
            userId : id,
            data : filters
        }
        console.log('apply filters...');
        fetch('/api/contracts/getcontracts',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success == true){
                console.log('recieve filter contracts');
                console.log(json);
                dispatch(recieveContracts(json, filters))
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(errorGettingContracts(err))
        });
    }
}

export function setPage(pageNum){
    return{
        type : "PAGE_CHANGE",
        pageNum
    }
}

export function resetFilters(id,filters){
    for(var key in filters){
        if(filters[key] !=='limit' && filters[key] !== 'offset'){
            filters[key] = '';
        }
    }
    filters.contractor = id;
    filters.status = 2;
    filters.date_started = '';
    filters.date_deadline= '';
    filters.limit = 10;
    filters.offset = 0;
    return applyFilters(id,filters);
}

export function getFilterData(id){
    return function(dispatch){
        const reqBody = {
            userId : id,
        }
        console.log('get filter data...');
        fetch('/api/contracts/getfilters',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            console.log(json);
            if(json.success == true){
                dispatch(recieveFilters(json))
            }
        })
        .catch(err => {
            console.log('err');
            console.log(err);
            dispatch(errorGettingContracts(err))
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
        const reqBody = {
            userId : user,
            contractId : contractId
        }

        fetch('/api/contracts/getcontract/' + contractId , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            console.log('contract recieved');
            console.log(json);
            if(json.success == true){
                dispatch(recieveContract(json.data));
            }else{
                message.warning(json.msg);
            }
        })
        .catch(err => {
            console.log(err);
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
        const reqBody = {
            userId : id,
            data : formData
        }
        fetch('/api/contracts/updatecontract/' + formData.id , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'PUT',
            body : JSON.stringify(reqBody)
        })
        .then( res => res.json())
        .then( json => {
            if(json.success == true){
                message.success(json.msg);
                //dispatch(getContracts(id, filterData))
            }else{
                message.warning(json.msg);
            }
        })
        .catch( err => {
            message.warning(err);
        })
    }
}

export function deleteContract(id, deleteId){

}

export function getContractFileList(userId, contractId){

}

export function updateContractFileList(userId, data){

}

export function createContract(uId,formData){
    return function (dispatch){
        const reqBody = {
            userId : uId,
            data : formData
        }
        fetch('/api/contracts/createcontract/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'PUT',
            body : JSON.stringify(reqBody)
        })
        .then( res => res.json())
        .then( json => {
            if(json.success == true){
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
            message.warning(err);
        })
    }
}