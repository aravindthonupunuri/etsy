export const signUpMutation = `
  mutation registerUser($emailId: String!, $username: String!, $password: String!) {
    registerUser(username: $username, emailId: $emailId, password: $password) {
      {
        username
        emailId
        password
      }
  }
`;

export const loginMutation = `
  mutation loginUser($emailId: String!, $password: String!) {
    loginUser(emailId: $emailId, password: $password) {
      token
    }
  }
`;

export const addItemMutation = `
mutation addItem(
  $itemname: String,
  $shopname: String,
  $itemimage: String,
  $description: String,
  $price: String,
  $available_quantity: Int,
  $category: String,
  ) {
    addItem(
    itemname:$itemname,
    shopname:$shopname,
    itemimage:$itemimage,
    description:$description,
    price:$price,
    available_quantity:$available_quantity,
    category:$category
    ) {
      itemname
      shopname
      itemimage
    }
}`;

export const updateUserDetailsMutation = 
`mutation updateUserDetails(
  $userId: ID
  $phonenumber: String
  $dateofbirth: String
  $about: String
  $profilePicture: String
  $address: String
  $city: String
  $country: String
  ) {
  updateUserDetails(
    userId: $userId
    phonenumber: $phonenumber
    dateofbirth: $dateofbirth
    about: $about
    profilePicture: $profilePicture
    address: $address
    city: $city
    country: $country
  )
  {
    username
    emailId
    password
  }
}`;

export const createShopMutation = `
  mutation createShop($shopname: String, $userid: ID) {
    createShop(shopname: $shopname, userid: $userid) {
      shopownerId
      shopname
      shopimage
      salescount
    }
  }
`;

export const createOrderMutation = `
  mutation createOrder($price: Int!, $userid: ID!) {
    updateProduct(name: $price, userid: $userid) {
      userid
      total
      createdtime
    }
  }
`;

export const createOrderItemsMutation = `
  mutation createOrderItems($orderID: ID!, $orderItems: [Items]) {
    createOrderItems(orderID: $orderID, orderItems: $orderItems) {
      result
    }
  }
`;
