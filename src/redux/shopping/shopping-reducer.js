import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  categories: [],
  activeCategory: "All",
  currencies: [],
  currencySymbol: "$",
  cartOverlayOpen: false,
  productsData: [],
  currentItem: {},
  cart: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        productsData: action.payload,
      };

    case actionTypes.FETCH_CURRENT_CATEGORY_NAME:
      return {
        ...state,
        activeCategory: action.payload,
      };

    case actionTypes.FETCH_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      };

    case actionTypes.CHANGE_CURRENCY_SYMBOL:
      return {
        ...state,
        currencySymbol: action.payload,
      };

    case actionTypes.TOGGLE_CART_OVERLAY:
      return {
        ...state,
        cartOverlayOpen: !state.cartOverlayOpen,
      };

    case actionTypes.CLOSE_CART_OVERLAY:
      return {
        ...state,
        cartOverlayOpen: false,
      };

    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };

    case actionTypes.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: [...state.cart].some(
          (item) =>
            JSON.stringify(item.attributes) ===
            JSON.stringify(action.payload.attributes)
        )
          ? [...state.cart].reduce(
              (previousValue, currentValue) =>
                JSON.stringify(currentValue.attributes) ===
                JSON.stringify(action.payload.attributes)
                  ? [
                      ...previousValue,
                      {
                        ...currentValue,
                        qty: currentValue.qty + 1,
                      },
                    ]
                  : [...previousValue, currentValue],
              []
            )
          : [
              ...state.cart,
              {
                ...action.payload,
                qty: 1,
              },
            ],
      };

    case actionTypes.CHANGE_PRODUCT_ATTRIBUTE:
      const { id, val } = action.payload;

      return {
        ...state,
        currentItem: {
          ...state.currentItem,
          attributes: [...state.currentItem.attributes].map((attr) =>
            attr.id === id
              ? {
                  ...attr,
                  items: [...attr.items].map((attr) =>
                    attr.value === val
                      ? {
                          ...attr,
                          selected: true,
                        }
                      : {
                          ...attr,
                          selected: false,
                        }
                  ),
                }
              : {
                  ...attr,
                  items: [...attr.items],
                }
          ),
        },
      };

    case actionTypes.CHANGE_PRODUCT_ATTRIBUTE_FROM_CART:
      const { attrType, value } = action;
      return {
        ...state,
        cart: [...state.cart].map((product, index) => {
          if (index === action.index) {
            return {
              ...product,
              attributes: [...product.attributes].map((attr) =>
                attr.id === attrType
                  ? {
                      ...attr,
                      items: [...attr.items].map((attr) =>
                        attr.value === value
                          ? {
                              ...attr,
                              selected: true,
                            }
                          : {
                              ...attr,
                              selected: false,
                            }
                      ),
                    }
                  : {
                      ...attr,
                      items: [...attr.items],
                    }
              ),
            };
          }
          return product;
        }),
      };

    case actionTypes.CHANGE_PRODUCT_QUANITY:
      if (action.val === "increment") {
        return {
          ...state,
          cart: [...state.cart].map((product, index) => {
            if (index === action.index) {
              return {
                ...product,
                qty: product.qty + 1,
              };
            }
            return product;
          }),
        };
      }
      if (action.val === "decrement") {
        return {
          ...state,
          cart: [...state.cart]
            .map((product, index) => {
              if (index === action.index) {
                return {
                  ...product,
                  qty: product.qty > 0 ? product.qty - 1 : product.qty,
                };
              }
              return product;
            })
            .filter((product) => product.qty > 0),
        };
      }
      return state;

    default:
      return state;
  }
};

export default shopReducer;
