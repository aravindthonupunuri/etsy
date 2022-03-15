const initialState = {
    cartItems: [],
  };


  export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case 'addToCartState': {
            console.log("in add to cart state")
            const item = action.cartItem;
            const itemExists = state.cartItems.find((x) => x.id === item.id);
            if (itemExists) {
              return {
                ...state,
                cartItems: state.cartItems.map((x) =>
                  x.id === itemExists.id ? item : x
                ),
              };
            } else {
              return {
                ...state,
                cartItems: [...state.cartItems, item],
              };
            }
        }
            
        default:
            return initialState    
    }
}