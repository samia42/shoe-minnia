import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERRORS,
  MY_ORDER_REQUEST,
  MY_ORDER_FAIL,
  MY_ORDER_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_RESET,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_REQUEST,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = axios.post("api/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    localStorage.setItem("cartItems", []);
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const myOrders = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_ORDER_REQUEST,
    });

    const { data } = await axios.get("api/orders/me");
    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDER_FAIL,
      payload: error,
    });
  }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get("/api/admin/orders");

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/admin/order/${id}`, order, config);
    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ORDER_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/order/${id}`);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    console.log(error, "error");
  }
};
export const getOrdersDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
    });

    const data = await axios.get(`/api/order/${id}`);
    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data?.data?.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload: error,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
