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
        const reqBody = {
            userId : userId,
        }
        fetch('/api/settings/getsettings',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success == true){
                console.log('succsess answer');
                console.log(json);
                message.success(json.msg)
            }else{
                console.log('error anser');
                console.log(json);
                message.warn(json);
            }
            dispatch(finishLoading())
        })
        .catch(err => {
            //console.log(err);
            message.warn('Ошибка');
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
        
        fetch(`/api/${type}/update${type}/${updId}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success == true){
                console.log('succsess answer');
                console.log(json);
                message.success(json.msg)
                //dispatch(getSettings(userId))
            }else{
                console.log('error anser');
                console.log(json);
                message.warn(json);
            }
            dispatch(finishUpdate())
        })
        .catch(err => {
            //console.log(err);
            message.warn('Ошибка');
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
        fetch(`/api/${type}/create${type}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method:'POST',
            body : JSON.stringify(reqBody)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success == true){
                console.log('succsess answer');
                console.log(json);
                message.success(json.msg)
                //dispatch(getSettings(userId))
            }else{
                console.log('error anser');
                console.log(json);
                message.warn(json);
            }
            dispatch(finishUpdate())
        })
        .catch(err => {
            console.log('err');
            message.warn('Ошибка');
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