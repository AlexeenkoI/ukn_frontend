export const START_GET_CONTRACTS = 'START_GET_CONTRACTS';
export const RECIEVE_CONTRACTS = 'RECIEVE_CONTRACTS';
export const ERROR_RECIEVE_CONTRACTS = 'ERROR_RECIEVE_CONTRACTS';

export function getContracts(id,limit,offset,filterData){
    return function(dispatch){
        dispatch(startGetContracts());
        const reqBody = {
            userId : id,
            data : filterData
        }
        console.log(JSON.stringify(reqBody));
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
                console.log('recieve');
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

export function startGetContracts(){
    return {
        type : START_GET_CONTRACTS,
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

export function errorGettingContracts(err){
    return {
        type : ERROR_RECIEVE_CONTRACTS,
        msg : err
    }
}