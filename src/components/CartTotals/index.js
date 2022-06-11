import React, { PureComponent } from "react";
import {
  Container,
  TotalsWrapper,
  Total,
  TotalAmount,
  ButtonsWrapper,
  ViewBagBtn,
  CheckoutBtn,
} from "./CartTotalsStyles";

import { connect } from "react-redux";
import { toggleCartOverlay } from "../../redux/shopping/shopping-actions";

class CartTotals extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      totalItems: 0,
      totalPrice: 0,
    };
    this.handleToggleCart = this.handleToggleCart.bind(this);
    this.handleTotals = this.handleTotals.bind(this);
  }

  handleTotals() {
    let items = 0;
    let price = 0;

    this.props.cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.prices[0].amount;
    });

    this.setState({
      totalItems: items,
      totalPrice: price,
    });
  }

  componentDidMount() {
    this.handleTotals();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.cart !== prevProps.cart ||
      this.state.totalItems !== prevState.totalItems ||
      this.state.totalPrice !== prevState.totalPrice
    ) {
      this.handleTotals();
    }
  }

  handleToggleCart() {
    this.props.toggleCartOverlay();
  }

  render() {
    const { totalPrice } = this.state;
    return (
      <Container>
        <TotalsWrapper>
          <Total>Total</Total>
          <TotalAmount>${totalPrice.toFixed(2)}</TotalAmount>
        </TotalsWrapper>
        <ButtonsWrapper>
          <ViewBagBtn to="/cart" onClick={this.handleToggleCart}>
            View Bag
          </ViewBagBtn>
          <CheckoutBtn to="#" onClick={this.handleToggleCart}>
            Checkout
          </CheckoutBtn>
        </ButtonsWrapper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTotals);
