const initialState = {
    settings_loaded : true,
    loading : false,
    work_types : [
        {id : 1, work_type : "Схема"},
        {id : 2, work_type : "Схема + М\П"},
        {id : 3, work_type : "Межевой план"}
    ],
    roles : [
        {id : 1, role : "Администратор"},
        {id : 2, role : "Менеджер"},
        {id : 3, role : "Исполнитель"},
    ],
    status_types : [
        {id : 1, type : "Создан"},
        {id : 2, type : "В работе"},
        {id : 3, type : "Выполнен"},
        {id : 4, type : "Завершен"},
    ]
}

export function settingsReducer(state = initialState, action) {
    switch(action.type){
        default:
            return state;
    }
}