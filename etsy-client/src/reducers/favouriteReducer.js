const initialState = []

export default function favouriteReducer(favouriteState = initialState, action) {
    switch(action.type) {
       case 'favouriteState': {
        return [
            ...action.favItems
        ]
       }
       default: {
        return favouriteState
       }             
    }
}