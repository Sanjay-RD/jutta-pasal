import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productListReducer from "./productListReducer";
import userReducer from "./userReducer";
import orderCreateReducer from "./orderCreateReducer";
import orderdetailsReducer from "./orderdetailsReducer";
import orderPayReducer from "./orderPayReducer";
import myOrdersReducer from "./myOrdersReducer";
import userListReducer from "./userListReducer";
import userDeleteReducer from "./userDeleteReducer";
import userUpdateReducer from "./userUpdateReducer";
import productDeleteReducer from "./productDeleteReducer";
import productCreateReducer from "./productCreateReducer";
import productUpdateReducer from "./productUpdateReducer";
import orderListReducer from "./orderListReducer";
import orderDeliverReducer from "./orderDeliverReducer";
import productCreateReviewReducer from "./productCreateReviewReducer";
import productTopRatedReducer from "./productTopRatedReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  cart: cartReducer,
  userLogin: userReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderdetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  productTopRated: productTopRatedReducer,
});

export default rootReducer;
