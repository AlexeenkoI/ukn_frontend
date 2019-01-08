export const GET_CONTRACT_NOTIFICATION = 'GET_CONTRACT_NOTIFICATION'
export const NOTIFICATION_VIEWED = 'NOTIFICATION_VIEWED'

export function recieveContractNotification(notificationData){
  return {
    type : GET_CONTRACT_NOTIFICATION,
    notificationData
  }
}

export function notificatorViewed(){
  return {
    type : NOTIFICATION_VIEWED
  }
}