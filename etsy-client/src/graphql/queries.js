export const getUserById = `
    query getUserById($userId: ID!) {
        getUserById(userId: $userId) {
            _id
            username
            emailId
            password
            phonenumber
            profilePicture
            gender
            city
            country
            dateofbirth
            address
            about
    }
  }
`;

export const getAllShopsByUserID = `
    query getAllShopsByUserID($userId: ID!) {
        getAllShopsByUserID(userId: $userId) {
            _id
            shopownerId
            shopname
            shopimage
            salescount
    }
  }
`;

export const getShopByShopName = `query getShopByShopName($shopName:String!){
    getShopByShopName(shopName:$shopName)
    {
        _id
        shopownerId
        shopname
        shopimage
        salescount
    }
}`;

export const getShopOwnerDetails = `
    query getShopOwnerDetails($ownerId: ID!) {
        getShopOwnerDetails(ownerId: $ownerId) {
            _id
            username
            emailId
            password
            phonenumber
            profilePicture
            gender
            city
            country
            dateofbirth
            address
            about
    }
  }
`;

export const getShopItems = `
    query getShopItems($shopId: String!) {
        getShopItems(shopId: $shopId) {
        Items {
            _id
            itemname
            shopname
            itemimage
            description
            price
            available_quantity
            category
        } 
    }
  }
`;

export const getUserProfile = `
    query getUserProfile($userId: ID!) {
        getUserProfile(userId: $userId) {
         {
            _id
            name
            price
            quantity
            dateofpurchase
            customerId
            currency
            shopname
            isgiftwrapped
            description
            image
        } 
    }
`;

export const getFavourites = `
    query getFavourites($userId: ID!) {
        getFavourites(userId: $userId) {
         Favourites{
            {
                itemId: String!,
                userId: String!,
            } 
        }
    }
`;

export const getUserOrders = `
    query getUserOrders($userId: ID!) {
        getUserOrders(userId: $userId) {
         {
            _id
            userid
            total
            createdtime
        } 
    }
  }
`;

export const getItems = `
   query {
        Items {
            _id
            itemname
            shopname
            itemimage
            description
            price
            available_quantity
            category
        } 
    }
`;

export const getItemsByItemId = `
   query getItemsByItemId(itemid: ID) {
        getItemsByItemId(itemid: $itemid) {
            {
                _id
                itemname
                shopname
                itemimage
                description
                price
                available_quantity
                category
            }
        } 
    }
`;

export const getItemsByUserId = `
query getItemsByUserId(userid: ID) {
    getItemsByUserId(userid: $userid) {
        {
            _id
            itemname
            shopname
            itemimage
            description
            price
            available_quantity
            category: String
        }
    } 
 }
`;
