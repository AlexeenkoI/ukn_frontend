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

export const updateSetting = (userId, type, settingId) => {
    return (dispatch) => {
        //TO DO
    }
}

export const insertSetting = (userId, type) => {
    return (dispatch) => {
        // TO DO
    }
}