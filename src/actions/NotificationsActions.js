export const GET_CONTRACT_NOTIFICATION = 'GET_CONTRACT_NOTIFICATION'

export function recieveContractNotification(notificationData){
    console.log('recieve');
    return {
        type : GET_CONTRACT_NOTIFICATION,
        notificationData
    }
}