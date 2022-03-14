const initialState = {currency: "$"};

export default function currencyReducer(state = initialState, action) {
    switch(action.type) {
        case 'currencyState': {
            console.log("int currency reducer ")
            console.log(state)
            return {
                currency: action.currency
             }
        }
            
        default:
            return initialState    
    }
}