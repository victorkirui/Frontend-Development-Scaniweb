import React, { PureComponent } from "react";
import "../../App.css";
import Logo from "../../Logo.png";
import CartOverlay from "../CartOverlay";
import {
  Container,
  LinkItems,
  LinkItem,
  LogoContainer,
  CartWrapper,
  CurrencySymbol,
  Select,
  CartIcon,
  BasketWrapper,
  BasketIcon,
} from "./NavStyles";

import { connect } from "react-redux";
import {
  toggleCartOverlay,
  fetchfilteredProducts,
  fetchCurrencies,
} from "../../redux/shopping/shopping-actions";

// Query
import gql from "graphql-tag";
import { apolloClient } from "../../index";

const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

class Nav extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cartCount: 0,
    };

    this.handleToggleCart = this.handleToggleCart.bind(this);
    this.handleCount = this.handleCount.bind(this);
  }

  componentDidMount = async () => {
    const { fetchCurrencies } = this.props;

    let res;
    try {
      res = await apolloClient.query({
        query: GET_CURRENCIES,
      });
      this.handleCount();
    } catch (error) {
      console.log(error);
    }
    fetchCurrencies(res.data);
  };

  //UPDATING QTY
  handleCount() {
    let count = 0;

    this.props.cart.forEach((item) => {
      count += item.qty;
    });

    this.setState({
      cartCount: count,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.cart !== prevProps.cart ||
      this.state.cartCount !== prevState.cartCount
    ) {
      this.handleCount();
    }
  }

  // Toggle cart overlay
  handleToggleCart() {
    this.props.toggleCartOverlay();
  }

  // FILTER PRODUCTS BY CATEGORY
  filterResults = (categoryItem) => {
    const filteredProduct = this.props.data.categories
      ?.slice(0, 1)
      .map((item) => {
        return item.products?.filter((product) => {
          return product.category === categoryItem;
        });
      });
    this.props.fetchfilteredProducts(filteredProduct[0]);
  };

  filterAllResults = () => {
    const clothes = this.props.data.categories?.slice(0, 1).map((item) => {
      return item.products?.filter((product) => {
        return product.category === "clothes";
      });
    });
    const tech = this.props.data.categories?.slice(0, 1).map((item) => {
      return item.products?.filter((product) => {
        return product.category === "tech";
      });
    });
    const children = clothes[0].concat(tech[0]);
    this.props.fetchfilteredProducts(children);
  };

  render() {
    const { cartOverlayOpen, currencyData } = this.props;
    return (
      <Container>
        <LinkItems>
          <LinkItem to="/" onClick={() => this.filterAllResults()}>
            All
          </LinkItem>
          <LinkItem to="/" onClick={() => this.filterResults("tech")}>
            Tech
          </LinkItem>
          <LinkItem to="/" onClick={() => this.filterResults("clothes")}>
            Clothes
          </LinkItem>
        </LinkItems>
        <LogoContainer to="/" onClick={() => this.filterAllResults()}>
          <img src={Logo} alt="Ecommerce Logo" />
        </LogoContainer>
        <CartWrapper>
          <CurrencySymbol>
            <Select>
              {currencyData.currencies?.map((item, index) => {
                return (
                  <option key={index} value={item.symbol}>
                    {item.symbol}
                    {item.label}
                  </option>
                );
              })}
            </Select>
          </CurrencySymbol>
          <CartIcon>
            <BasketWrapper onClick={this.handleToggleCart}>
              <BasketIcon />
              <span>{this.state.cartCount}</span>
            </BasketWrapper>
            {cartOverlayOpen && <CartOverlay />}
          </CartIcon>
        </CartWrapper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartOverlayOpen: state.shop.cartOverlayOpen,
    cart: state.shop.cart,
    data: state.shop.data,
    currencyData: state.shop.currencyData,
    filteredProducts: state.shop.filteredProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
    fetchfilteredProducts: (someProducts) =>
      dispatch(fetchfilteredProducts(someProducts)),
    fetchCurrencies: (data) => dispatch(fetchCurrencies(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
