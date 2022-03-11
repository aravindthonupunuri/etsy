const initialState = []

export default function favouriteReducer(favouriteState = initialState, action) {
    console.log(action)
    switch(action.type) {
       case 'favouriteState': {
        console.log("in reducer favouriteState action");
        return [
            // ...favouriteState,
            ...action.favItems
        ]
       }
       default: {
        return favouriteState
       }             
    }
}