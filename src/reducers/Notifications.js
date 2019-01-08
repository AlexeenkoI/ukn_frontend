const initialState = {
  contractsNotifications : {
    count : 0,
    data : []
  }
}

export function notificationsReducer(state=initialState  ,action){
  switch(action.type){
    case 'GET_CONTRACT_NOTIFICATION':
      console.log(action);
      const newCount = state.contractsNotifications.count + 1;
      console.log('count');
      console.log(newCount);
      return {
        ...state,
        contractsNotifications:{
            count : newCount,
            //data : [...state.contractsNotifications.data, action.notificationData.data]
            data : state.contractsNotifications.data.concat(action.notificationData)
        }
      }
    case 'NOTIFICATION_VIEWED' : 
      return {
        ...state,
        contractsNotifications : {
          count : 0,
          data : state.contractsNotifications.data
        }
      }
    default:
      return state
  }
}