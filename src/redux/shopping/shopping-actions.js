import * as actionTypes from "./shopping-types";

export const fetchProducts = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS,
    payload: products,
  };
};

export const fetchfilteredProducts = (filteredProducts) => {
  return {
    type: actionTypes.FETCH_FILTERED_PRODUCTS,
    payload: filteredProducts,
  };
};

export const removeFromCart = (itemID) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemID,
    },
  };
};

export const incrementQty = (itemID, value) => {
  return {
    type: actionTypes.INCREMENT_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const decrementQty = (itemID, value) => {
  return {
    type: actionTypes.DECREMENT_QTY,
    payload: {
      id: itemID,
      qty: value,
    },
  };
};

export const toggleCartOverlay = () => {
  return {
    type: actionTypes.TOGGLE_CART_OVERLAY,
  };
};

export const fetchCurrencies = (currency) => {
  return {
    type: actionTypes.FETCH_CURRENCIES,
    payload: currency,
  };
};

export const addToCart = (itemID) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
    },
  };
};

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};