import axios from "axios";
import {
  DELETE_THIS_ORDER,
  DELETE_THIS_ORDER_REQUEST,
} from "../constants/deleteOrder";
export const deleteThisOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_THIS_ORDER_REQUEST });
    const { data } = await axios.delete(`/api/admin/order/${id}`);
    dispatch({ type: DELETE_THIS_ORDER, payload: data.success });
  } catch (error) {}
};
