import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { userReducer } from './User'
import { contractsReducer } from './Contracts'
import { notificationsReducer } from './Notifications'
import { userListReducer } from './UserList'

export const rootReducer = combineReducers({
    user : userReducer,
    contracts : contractsReducer,
    notifications : notificationsReducer,
    userList : userListReducer,
    form : formReducer
})

