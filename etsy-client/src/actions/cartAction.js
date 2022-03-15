import backendServer from '../webconfig';

export default function addItemToCart(item, quantity) {
    let token = sessionStorage.getItem("token");
    console.log("shop name is " + item)
    console.log(item)
    let cartItem = {
      itemid: item.id,
      shopname: item.shopname,
      quantity: quantity,
    };
      console.log("add item to cart 1")
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
            console.log("Item updated in cart table");
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
            console.log("Item added to cart table");
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
                requestedQuantity: quantity}
               }
               )
          }                     
    }
}