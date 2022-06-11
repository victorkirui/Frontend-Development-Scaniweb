import React, { PureComponent } from "react";
import {
  Container,
  Tax,
  Title,
  TotalTax,
  Quantity,
  Value,
  Total,
  Amount,
  OrderBtn,
} from "./CartOrderStyles";

import { connect } from "react-redux";

class CartOrderComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      totalItems: 0,
      totalPrice: 0,
    };
    
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

  render() {
    const { totalItems, totalPrice } = this.state;
    return (
      <Container>
        <Tax>
          <Title>Tax 21%:</Title>{" "}
          <TotalTax>${(totalPrice * 0.21).toFixed(2)}</TotalTax>
        </Tax>
        <Quantity>
          <Title>Quantity:</Title> <Value>{totalItems}</Value>
        </Quantity>
        <Total>
          <Title>Total:</Title> <Amount>${totalPrice.toFixed(2)}</Amount>
        </Total>
        <OrderBtn>ORDER</OrderBtn>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(CartOrderComponent);
