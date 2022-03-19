const initialState = {currency: "$"};

export default function currencyReducer(state = initialState, action) {
    switch(action.type) {
        case 'currencyState': {
            return {
                currency: action.currency
             }
        }
            
        default:
            return initialState    
    }
}