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
            return {
                ...state,
                isLoading : false,
                data : action.data
            }
        case 'RECIEVE_USER':
        console.log(action)
        const currentUserData = action.json.data[0];
        const userRoles = action.json.userRoles;
        console.log(userRoles);
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
        default:
            return state;
    }
}