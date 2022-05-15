const { ApolloServer, gql, UserInputError } = require("apollo-server");

import users from "./model/User";
import orders from "./model/Order";
import shops from "./model/Shop";
import items from "./model/Item";

const resolvers = {
  Query: {
    getUserById: async (parent, { userId }, context) => {
      const user = await users.findOne({
        _id: userId,
      });
      return user;
    },

    getFavoriteItems: async (parent, { userId }, context) => {
      const user = await users.find({ userId: userId });
      let favouriteItems = user.favouriteItems;
      return favouriteItems;
    },

    getAllShop: async (parent, { userid }, context) => {
      Shop.find((err, results) => {
        if (err) return error.message;
        else {
          let result = results.filter(
            res => res.shopownerId == userid
          )
          return result;
        }
      })
    },

    getShopByShopName: async (parent, { shopName }, context) => {
      Shop.find((err, results) => {
        if (err) return error.message;
        else {
          let result = results.filter(
            res => res.shopname == shopName
          )
          return result;
        }
      })
    },

    getShopByShopId: async (parent, { ownerId }, context) => {
      const shop = await shops.findOne({
        _id: ownerId,
      });
      return shop;
    },

    getShopOwnerDetails: async (parent, { shopOwnerId }, context) => {
      User.find({ _id: shopOwnerId }, (err, data) => {
        if (err) return error.message;
        else return data;
      })
    },

    getShopItems: async (parent, { shopname }, context) => {
      Item.find({ shopname: shopname }, (err, data) => {
        if (err) return err.message;
        else return data;
      })
    },

    getUserProfile: async (parent, { userid }, context) => {
      Users.findOne({ _id: userid }, (err, result) => {
        if (err) return err.message;
        else return result;
      })
    },

    getUserCartItems: async (parent, { userId }, context) => {
      const cart = await cart.findOne({ userId: userId });
      let cartItems = cart.cartItems;
      return cartItems;
    },

    getItemDetailsByItemId: async (parent, { itemId }, context) => {
      const item = await items.findOne({
        _id: itemId,
      });
      return item;
    },

    getOrdersByUserId: async (parent, { userId }, context) => {
      const order = await orders.find({
        userid: userId,
      });
      return order;
    },

    items: async () => {
      return items;
    },
  },

  Mutation: {
    registerUser: async (parent, { emailId, username, password }, context) => {
      Users.findOne({ emailId: emailId }, async (err, cust) => {
        console.log("user find one")
        if (err) return err.message;
        else if (cust) return err.message;
        else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          var newUser = new Users(
            {
              username: username,
              emailId: emailId,
              password: hashPassword
            }
          )
          console.log("in save......")
          newUser.save((err, data) => {
            console.log(data)
            if (data) return data;
            else return err.message
          })
        }
      })
    },

    loginUser: async (parent, { email, password }, context) => {
      Users.findOne({ emailId: email }, async (err, data) => {
        if (err) return err.message;
        else {
          if (!data) return null;
          else {
            const comparision = await bcrypt.compare(password, data.password);
            if (comparision) {
              const token = jwt.sign({ id: data._id }, process.env.Token_Secret);
              return token
            }
            else return null;
          }
        }
      })
    }
  },

  addItem: async (
    parent,
    { itemname, shopname, itemimage, description, price, available_quantity, category },
    context
  ) => {
    const newitem = new Item({
      itemname,
      itemimage: itemimage,
      description, price, available_quantity,
      category: category, shopname
    })
    newitem.save((err, data) => {
      if (err) return err.message
      else return "Item successfully added to shop";
    })
  },

  updateUserDetails: async (
    parent,
    { userId, phonenumber, dateofbirth, about, profilePicture, address, city, country },
    context
  ) => {
    const req = { emailId, username, profilePicture, phonenumber, gender, city, country, dateofbirth, address, about };
    Users.findOne({ _id: userId }, (err, result) => {
      Object.assign(result, req);
      result.save(
        (err, data) => {
          if (err) { console.log(err); return "error while updating profile" }
          else return data
        }
      )

    })
  },

  createShop: async (
    parent,
    { shopname, userid },
    context
  ) => {
    Shop.find((err, data) => {
      const filteredData = data.filter( singledata => singledata.shopname === shopname)    
      if(filteredData.length != 0)  res.status(206).send("Shop name already present");
      else {var newShop = new Shop({shopname, shopownerId: userid})
      newShop.save((err, data) => {
          if(err) return err.message;
          return data;
      })}
  })
  },

  createOrder: async (
    parent,
    { total, userid },
    context
  ) => {
    var datetime = new Date();
    const order = new Order({
      userid: userid,
      total: total,
      createdtime: datetime
    })
    order.save((error, result) => {
      if (error) {
        return error.message
      } else {
        return result._id
      }
    })
  },

  createOrderItems: async (
    parent,
    { orderId, orderItems },
    context
  ) => {
    var datetime = new Date();
    let error = false;
    orderItems.forEach((item) => {
      const orderitem = new OrderItem({
        orderid: orderId,
        itemid: item.id,
        shopname: item.shopname,
        price: item.price,
        quantity: item.requestedQuantity,
        message: item.message,
        createdtime: datetime,
      })
      orderitem.save((err, result) => {
        if (err) {
          console.log(err.message)
          if (!error) error = true;
        }
      })
      if (error) return "error occured while adding items";
      else return "values inserted"
    });
  }
};