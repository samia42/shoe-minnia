import {
  ADD_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";
// import { ALL_PRODUCT_SUCCESS } from "../constants/productConstants";
import axios from "axios";

export const addItemsToCart = (_id, quantity) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.get(`api/product/${_id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].path,
        stock: data.product.stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getstate().cart.cartItems)
    );
  } catch (error) {}
};

//REMOVE FROM CART

export const removeItemFromCart = (id) => async (dispatch, getstate) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getstate().cart.cartItems));
};

//Save shipping info

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
