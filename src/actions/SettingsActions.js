export const START_LOADING = "START_LOADING"
export const SETTINGS_LOADED = "SETTINGS_LOADED"
export const LOAD_SETTINGS = "LOAD SETTINGS"
export const LOAD_CURRENT_SETTING = "LOAD_CURRENT_SETTING"
export const UPDATE_SETTING = "UPDATE_SETTING"

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