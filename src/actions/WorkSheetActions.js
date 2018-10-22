import { message } from 'antd'

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
                dispatch(recieveContracts(json.data))
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
        data : res
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
        console.log(reqBody)
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
                dispatch(recieveContracts(json.data))
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(errorGettingContracts(err))
        });
    }
}

export function resetFilters(id,filters){
    for(var key in filters){
        if(filters[key] !=='limit'){
            filters[key] = '';
        }
    }
    filters.contractor = id;
    return getContracts(id,filters);
}

export function getFilterData(id){
    return function(dispatch){
        const reqBody = {
            userId : id,
        }
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

export function updateContract(id, data){

}

export function deleteContract(id, deleteId){

}