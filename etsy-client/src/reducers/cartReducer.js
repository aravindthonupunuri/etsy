const initialState = {
    cartItems: [],
  };


  export default function cartReducer(state = initialState, action) {
    switch (action.type) {
      case 'addToCartState':
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
  
      case 'removeItemFromCart':
        const id = action.payload;
        console.log(state.cartItems)
        console.log(id)
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.id !== id),
        };
  
      case 'clearCart':
        return initialState;
  
      default:
        return state;
    }
}