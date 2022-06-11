import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  data: {},
  filteredProducts: [],
  cart: [],
  currentItem: null,
  cartOverlayOpen: false,
  currencyData: {},
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        data: action.payload,
      };

    case actionTypes.FETCH_FILTERED_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.payload,
      };

    case actionTypes.FETCH_CURRENCIES:
      return {
        ...state,
        currencyData: action.payload,
      };

    case actionTypes.ADD_TO_CART:
      // get items data from the products array
      const item = state.filteredProducts?.find(
        (item) => item.id === action.payload.id
      );
      // check if item is in the cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case actionTypes.INCREMENT_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };

    case actionTypes.DECREMENT_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };

    case actionTypes.TOGGLE_CART_OVERLAY:
      return {
        ...state,
        cartOverlayOpen: !state.cartOverlayOpen,
      };

    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };

    default:
      return state;
  }
};

export default shopReducer;
