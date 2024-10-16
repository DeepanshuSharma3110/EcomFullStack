export const Host = process.env.REACT_APP_BACKEND_URL;
export const ADD_USER = `${Host}/apiUser/addUserWithEmail`; 
export const verifyUserLogin = `${Host}/apiUser/verifyLogin`;
export const GET_USER = `${Host}/apiUser/getUser`; 
export const UPDATE_USER = `${Host}/apiUser/updateUser`;
export const UPDATE_USER_WITHOUT_IMAGE = `${Host}/apiUser/updateUserWithOutImage`
export const LOGIN_EMAIL_PASSWORD = `${Host}/apiUser/LoginUserWithEmail`;
export const LOGIN_WITH_GOOGLE = `${Host}/apiUser/LoginWithGoogle`;
export const LOGOUT_USER = `${Host}/apiUser/logout`;


export const ADMIN_ADD_ITEM = `${Host}/apiAdmin/addItem`;
export const GET10ITEMS = `${Host}/apiProducts/get10`
export const GETALLCATEGORIES = `${Host}/apiProducts/getCategories`;
export const GETALLPRODUCTS = `${Host}/apiProducts/getAll`;
export const GETBYCATEGORIES = `${Host}/apiProducts/getByCategories`;




export const DELETE_PRODUCT = `${Host}/apiProducts/DeleteProduct`;
export const UPDATE_PRODUCT = `${Host}/apiProducts/UpdateProduct`;
export const ADDITEMTOCART = `${Host}/apiCart/add`;
export const GETCARTITEM = `${Host}/apiCart/getAll`;
export const UPDATEQUANTITY = `${Host}/apiCart/updatequantity`;
export const DELETEITEM = `${Host}/apiCart/deleteItem`;
export const CLEARCART = `${Host}/apiCart/clearCart`;
export const ALL_USER = `${Host}/apiUser/getAll`



export const ADD_ORDER = `${Host}/apiOrder/addOrder`;
export const ADD_PREPAID_ORDER=`${Host}/apiOrder/addPrepaidOrder`;

export const PAYMENT = `${Host}/apiOrder/payment`;


export const FETCH_ORDER=`${Host}/apiOrder/getAll`;
export const FETCH_ALL_USERS_ORDERS = `${Host}/apiOrder/getAllUsersOrders`;
export const UPDATE_ORDER_STATUS = `${Host}/apiOrder/updateOrderStatus`