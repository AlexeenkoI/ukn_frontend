const initialState= {
    currentUser : '',
    isLoading : true,
    changeData : {

    },
    data : []
}

export function userListReducer(state = initialState, action){
    switch(action.type){
        case 'RECIEVE_USERS_LIST':
            console.log('recieve');
            return {
                ...state,
                isLoading : false,
                data : action.data
            }
        default:
            return state;
    }
}