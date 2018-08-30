import { combineReducers } from 'redux'

import { userReducer } from './User'
import { contractsReducer } from './Contracts'

export const rootReducer = combineReducers({
    user : userReducer,
    contracts : contractsReducer
})

