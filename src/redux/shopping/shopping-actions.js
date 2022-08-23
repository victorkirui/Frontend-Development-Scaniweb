import * as actionTypes from "./shopping-types";

export const addProductToCart = (payload) => ({
  type: actionTypes.ADD_PRODUCT_TO_CART,
  payload,
});

export const loadCurrentItem = (item) => {
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: item,
  };
};

export const changeProductAttribute = (id, val) => {
  return {
    type: actionTypes.CHANGE_PRODUCT_ATTRIBUTE,
    payload: {
      id: id,
      val: val,
    },
  };
};

export const changeProductAttributeInCart = (index, attrType, value) => ({
  type: actionTypes.CHANGE_PRODUCT_ATTRIBUTE_IN_CART,
  index,
  attrType,
  value,
});

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

export const changeProductQuantity = (index, val) => ({
  type: actionTypes.CHANGE_PRODUCT_QUANITY,
  index,
  val,
});

export const removeFromCart = (index) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      index: index,
    },
  };
};
