import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productImagesReducer,
  productReducer,
  productReviewsReducer,
  reviewsReducer,
} from "../reducers/productReducer";
import {
  allUsersReducer,
  profileReducer,
  UserDetailsReducer,
  userReducer,
} from "../reducers/userReducer";
import { cartReducer } from "../reducers/cartReducer";
import {
  allOrdersReducer,
  deleteOrder,
  myOrdersReducer,
  newOrderReducer,
  orderReducer,
  ordersDetailReducer,
  singleOrderReducer,
} from "../reducers/orderReducer";
import { deleteThisOrder } from "../reducers/deleteOrder";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  cart: cartReducer,
  profile: profileReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: ordersDetailReducer,
  newReviews: newReviewReducer,
  newProduct:newProductReducer,
  productImages:productImagesReducer,
  allOrders: allOrdersReducer,
  singleOrder: singleOrderReducer,
  // deleteOrder: deleteOrder,
  delete: deleteThisOrder,
  allUsers: allUsersReducer,
  userDetails: UserDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  //   cart: {
  //     cartItems: localStorage.getItem("cartItems")
  //       ? JSON.parse(localStorage.getItem("cartItems"))
  //       : [],
  //   },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
