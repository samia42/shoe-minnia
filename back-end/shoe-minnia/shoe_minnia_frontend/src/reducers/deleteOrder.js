import {
  DELETE_THIS_ORDER,
  DELETE_THIS_ORDER_REQUEST,
} from "../constants/deleteOrder";
export const deleteThisOrder = (state = {}, action) => {
  switch (action.type) {
    case DELETE_THIS_ORDER_REQUEST:
      return {
        DeletedData: false,
      };
    case DELETE_THIS_ORDER:
      return {
        DeletedData: action.payload,
      };

    default:
      return state;
  }
};
