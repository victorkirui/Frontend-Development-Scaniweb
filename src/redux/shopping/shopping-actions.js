import * as actionTypes from "./shopping-types";

export const fetchCategories = (data) => {
  return {
    type: actionTypes.FETCH_CATEGORIES,
    payload: data,
  };
};

export const fetchProducts = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS,
    payload: products,
  };
};

export const fetchCurrentCategoryName = (name) => {
  return {
    type: actionTypes.FETCH_CURRENT_CATEGORY_NAME,
    payload: name,
  };
};

export const fetchCurrencies = (currency) => {
  return {
    type: actionTypes.FETCH_CURRENCIES,
    payload: currency,
  };
};

export const changeCurrencySymbol = (symbol) => {
  return {
    type: actionTypes.CHANGE_CURRENCY_SYMBOL,
    payload: symbol,
  };
};

export const toggleCartOverlay = () => {
  return {
    type: actionTypes.TOGGLE_CART_OVERLAY,
  };
};

export const closeCartOverlay = () => {
  return {
    type: actionTypes.CLOSE_CART_OVERLAY,
  };
};

export const selectAttributes = (id, value) => {
  return {
    type: actionTypes.SELECTED_ATTRIBUTES,
    payload: {
      id,
      value,
    },
  };
};

export const addToCart = (itemID, attributes) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemID,
      attributes: attributes,
    },
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

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};
