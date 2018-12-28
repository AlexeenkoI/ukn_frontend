import { message } from 'antd';

export const START_LOADING = "START_LOADING"
export const SETTINGS_LOADED = "SETTINGS_LOADED"
export const LOAD_SETTINGS = "LOAD SETTINGS"
export const LOAD_CURRENT_SETTING = "LOAD_CURRENT_SETTING"
export const UPDATE_SETTING = "UPDATE_SETTING"
export const CHANGE_VALUE = "CHANGE_VALUE"
export const CREATE_VALUE = "CREATE_VALUE"
export const CLEAR_ROW = "CLEAR_ROW"

export const startLoading = () => {
  return {
    type : START_LOADING
  }
}

export const finishLoading = (data) => {
  return {
    type : SETTINGS_LOADED,
    data
  }
}

export const updateValue = ( itemType, itemPos, itemField, value) => {
  return {
    type : CHANGE_VALUE,
    itemPos,
    itemType,
    itemField,
    value
  }
}

export const createRow = ( itemType, itemField, value) => {
  if(value === '') return clearRow();
  return {
    type : CREATE_VALUE,
    itemType,
    itemField,
    value
  }
}

export const clearRow = () => {
  return {
    type  : CLEAR_ROW
  }
}

export const getSettings = (userId, condition = '') => {
  return (dispatch) => {
    dispatch(startLoading());
    //TO DO
    //const reqBody = {
    //  userId : userId,
    //}
    const token = localStorage.getItem('app_token');
    fetch('/api/settings/getall',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'GET',
      //body : JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(json => {
      if(json.success === true){
        //message.success(json.message)
        dispatch(finishLoading(json.data))
      }else{
        message.warn(json.message);
      }
      
    })
    .catch(err => {
      //console.log(err);
      message.warn(`Ошибка ${err.message}`);
      dispatch(finishLoading())
    });

  }
}

export const getSettingByType  = (userId, type) => {
  return (dispatch) => {
    dispatch(startLoading());
    // TO DO
  }
}

export const deleteSetting = (userId, type, settingId) => {
  return (dispatch) => {
    //TO DP
  }
}

export const updateSetting = (userId, type, setting) => {
  return (dispatch) => {
    //TO DO
    const updId = setting.id;
    delete setting.id;
    dispatch(startUpdate())
    const reqBody = {
      userId : userId,
      data : setting
    }
    const token = localStorage.getItem('app_token');
    fetch(`/api/${type}/update/${updId}`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'PUT',
      body : JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(json => {
      if(json.success === true){
          message.success(json.message)
          //dispatch(getSettings(userId))
      }else{
          message.warn(json.message);
      }
      dispatch(finishUpdate())
    })
    .catch(err => {
      //console.log(err);
      message.warn(`Ошибка ${err.message}`);
      dispatch(finishUpdate())
    });
  }
}

export const insertSetting = (userId, type, insertValues) => {
  return (dispatch) => {
    // TO DO
    dispatch(startUpdate())
    const reqBody = {
      userId : userId,
      data : insertValues
    }
    console.log(reqBody)
    const token = localStorage.getItem('app_token');
    fetch(`/api/${type}/create`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      method:'PUT',
      body : JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(json => {
      if(json.success === true){
        message.success(json.message)
        //dispatch(getSettings(userId))
        dispatch(getSettings())
        dispatch(clearRow())
      }else{
        message.warn(json.message);
      }
      dispatch(finishUpdate())
    })
    .catch(err => {
      message.warn(`Ошибка ${err.message}`);
      dispatch(finishUpdate())
    });
  }
}

export const startUpdate = () => {
  return {
    type : "START_UPDATE"
  }
}

export const finishUpdate = () => {
  return {
    type : "FINISH_UPDATE"
  }
}