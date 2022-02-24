const initialState = {};

export default function homeReducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_HOME_DATA_FROM_DB':
            return {
               items: action.res
            }
        default:
            return initialState    
    }
}