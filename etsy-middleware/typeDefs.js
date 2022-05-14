const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    emailId: String!
    password: String!
    phonenumber: String
    profilePicture: String
    gender: String
    city: String
    country: String
    dateofbirth: Date
    address: String
    about: String
  }

  type Favourites {
    itemId: String!
    userId: String!
  }

  type Shop {
    _id: ID!
    shopownerId: String!
    shopname: String!
    shopimage: String
    salescount: Int
  }

  type Item {
    _id: ID!
    itemname: String!
    shopname: String!
    itemimage: String
    description: String
    price: Float
    available_quantity: Int
    category: String
  }

  type Cart {
    _id: ID!
    itemid: ID!
    userid: ID!
    quantity: Int!
    shopname: Date!
  }

  type Order {
    _id: ID!
    userid: ID!
    total: Int!
    createdtime: Date
  }

  type OrderItem {
    _id: ID!
    orderid: ID!
    itemid: ID!
    price: String
    quantity: String
    message: String
    shopname: String
    createdtime: Date
  }

  type Query {
    getUserById(userId: ID): User
    getAllShop: Shop
    getShopByShopName(shopName: String): Shop
    getShopOwnerDetails(shopOwnerId: ID): User
    getShopItems(shopname: String): [Item]
    getUserProfile(userId: ID): User
    getFavourites(userId: ID): [Favourites]
    getUserOrders(userId: ID)
    getItems(): [Item]
    getItemsByItemId(itemId: ID): Item
    getItemsByUserId(userId: String): [Item]
  }

  type Mutation {
    registerUser(emailId: String!, username: String!, password: String!): User
    loginUser(emailId: String!, password: String!): User
    addItem(
      itemname: String!,
      shopname: String!,
      itemimage: String,
      description: String,
      price: String,
      available_quantity: Int,
      category: String,
    ): Item
    updateUserDetails(
      phonenumber: String
      dateofbirth: String
      about: String
      profilePicture: String
      address: String
      city: String
      country: String
    ): User
    createShop(shopName: String): Shop
    addItemToShop(
      itemname: String!,
      shopname: String!,
      itemimage: String,
      description: String,
      price: String,
      available_quantity: Int,
      category: String
    ) : Item
    updateItem(
      itemname: String!,
      itemimage: String,
      description: String,
      price: String,
      available_quantity: Int,
      category: String
    ) : Item
    createOrder( price: Int!, userId: ID!): Order
    createOrderItems(orderId: ID!, orderItems: [Items]): OrderItems
  }
`;

module.exports = typeDefs;
