import {
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../actions/types";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_TOP_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case PRODUCT_TOP_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
