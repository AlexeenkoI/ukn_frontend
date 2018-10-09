import { combineReducers } from 'redux'

import { userReducer } from './User'
import { contractsReducer } from './Contracts'
import { notificationsReducer } from './Notifications'
import { userListReducer } from './UserList'

export const rootReducer = combineReducers({
    user : userReducer,
    contracts : contractsReducer,
    notifications : notificationsReducer,
    userList : userListReducer
})

