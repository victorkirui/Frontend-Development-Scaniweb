import React, { PureComponent } from "react";
import CartOverlay from "../CartOverlay";
import CurrencySwitcher from "./CurrencySwitcher";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { connect } from "react-redux";
import {
  fetchCurrencies,
  changeCurrencySymbol,
  toggleCartOverlay,
} from "../../../redux/shopping/shopping-actions";

import {
  CartWrapper,
  CurrencySymbol,
  CurrencySwitchWrapper,
  CartIcon,
  BasketWrapper,
  BasketIcon,
} from "./CurrencyStyles";

import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

export class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cartCount: 0,
    };

    this.handleCount = this.handleCount.bind(this);
  }

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

  componentDidMount() {
    this.handleCount();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.cart !== prevProps.cart ||
      this.state.cartCount !== prevState.cartCount
    ) {
      this.handleCount();
    }
  }

  handleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    return (
      <Query query={GET_CURRENCIES}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          this.props.fetchCurrencies(data.currencies);

          return (
            <CartWrapper>
              <CurrencySymbol>
                <span
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={this.handleShow}
                >
                  {this.props.currencySymbol}
                  {this.state.show ? (
                    <BsChevronUp style={{ marginLeft: "6px" }} />
                  ) : (
                    <BsChevronDown style={{ marginLeft: "6px" }} />
                  )}
                </span>

                <CurrencySwitchWrapper className="currencySwitchWrapper">
                  {data.currencies?.map((item) => (
                    <CurrencySwitcher
                      key={item.label}
                      item={item}
                      show={this.state.show}
                      handleShow={this.handleShow}
                    />
                  ))}
                </CurrencySwitchWrapper>
              </CurrencySymbol>
              <CartIcon>
                <BasketWrapper onClick={() => this.props.toggleCartOverlay()}>
                  <BasketIcon />
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.cartCount}
                  </span>
                </BasketWrapper>
                {this.props.cartOverlayOpen && <CartOverlay />}
              </CartIcon>
            </CartWrapper>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencySymbol: state.shop.currencySymbol,
    cartOverlayOpen: state.shop.cartOverlayOpen,
    cart: state.shop.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrencies: (currencies) => dispatch(fetchCurrencies(currencies)),
    changeCurrencySymbol: (symbol) => dispatch(changeCurrencySymbol(symbol)),
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
