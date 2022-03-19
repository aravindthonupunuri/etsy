import backendServer from '../webconfig';

export function addItemToCart(item, quantity) {
    let token = sessionStorage.getItem("token");
    let cartItem = {
      itemid: item.id,
      shopname: item.shopname,
      quantity: quantity,
    };
    let response = "";
    return async (dispatch, getState) => {
        let cartItems = getState().cartState.cartItems;
        if (cartItems.find((c) => c.id === item.id)) {
            response = await fetch(`${backendServer}/api/cart/updateitem`, {
              method: "PUT",
              headers: {
                "auth-token": token,
                "Content-Type": "application/json",
              },
              mode: "cors",
              body: JSON.stringify(cartItem),
            });
          } else {
            response = await fetch(`${backendServer}/api/cart/additem`, {
              method: "POST",
              headers: {
                "auth-token": token,
                "Content-Type": "application/json",
              },
              mode: "cors",
              body: JSON.stringify(cartItem),
            });
          }
          if(response.ok) {
            dispatch(
                {
                type: 'addToCartState', 
                cartItem: {
                id: item.id,
                name: item.itemname,
                imageUrl: item.itemimage,
                price: item.price,
                availableQuantity: item.available_quantity,
                requestedQuantity: quantity,
                shopname: item.shopname,
              }
               }
               )
          }                     
    }
}

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: 'removeItemFromCart',
    payload: id,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: 'clearCart',
  });
};