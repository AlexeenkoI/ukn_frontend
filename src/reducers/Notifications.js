const initialState = {
  contractsNotifications : {
    count : 0,
    data : []
  }
}

export function notificationsReducer(state=initialState,action){
  switch(action.type){
    case 'GET_CONTRACT_NOTIFICATION':
      return {
        ...state,
        contractsNotifications:{
            count : action.notificationData.data.length,
            //data : [...state.contractsNotifications.data, action.notificationData.data]
            data : state.contractsNotifications.data.concat(action.notificationData.data)
        }
      }
    default:
      return state
  }
}