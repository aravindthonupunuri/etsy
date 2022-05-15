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

    getAllShop: async (parent, { shopname }, context) => {
      Shop.find((err, results) => {
        if (err) return error.message;
        else {
          let result = results.filter(
            res => res.shopownerId == req.user.id
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
    registerUser: async (parent, { email, name, password }, context) => {
      Users.findOne({ emailId: emailId }, async (err, cust) => {
        console.log("user find one")
        if (err) callback(null, null);
        else if (cust) callback("error", null);
        else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          var newUser = new Users(
            {
              username: name,
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
    { itemname, itemimage, price, category, description, itemimage, shopname },
    context
  ) => {
    const newitem = new Item({
      itemname,
      itemimage: itemimage,
      description, price, available_quantity,
      category: categoryid, shopname
    })
    newitem.save((err, data) => {
      if (err) return err.message
      else return "Item successfully added to shop";
    })
  },

  updateUserDetails: async (
    parent,
    { emailId, username, profilePicture, phonenumber, gender, city, country, dateofbirth, address, about },
    context
  ) => {
     const req = { emailId, username, profilePicture, phonenumber, gender, city, country, dateofbirth, address, about };
    Users.findOne({ _id: req.user.id }, (err, result) => {
      // console.log(result);
      Object.assign(result, req);
      result.save(
        (err, data) => {
          if (err) { console.log(err); return "error while updating profile" }
          else return data
        }
      )

    })
  }
};