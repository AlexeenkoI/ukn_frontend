const initialState= {
    currentUserId : '',
    isLoading : true,
    currentUserData : {},
    userIsLoading : false,
    data : []
}

export function userListReducer(state = initialState, action){
    switch(action.type){
        case 'RECIEVE_USERS_LIST':
            console.log('recieve');
            console.log(action);
            return {
                ...state,
                isLoading : false,
                data : action.data.users,
            }
        case 'RECIEVE_USER':
            const currentUserData = action.json.data[0];
            const userRoles = action.json.userRoles;
            return {
                ...state,
                userIsLoading : false,
                currentUserData,
                userRoles
            }
        case 'GET_USER':
            return{
                ...state,
                userIsLoading : true,
            }
        case 'CLEAR_CURRENT_USER':
            return {
                ...state,
                currentUserData : {}
            }
        default:
            return state;
    }
}