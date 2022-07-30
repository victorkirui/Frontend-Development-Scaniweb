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
  }

  handleTotals = () => {
    let items = 0;
    let price = 0;

    this.props.cart.forEach((item) => {
      items += item.qty;

      item.prices.map((itemPrice) => {
        if (itemPrice.currency.symbol === this.props.currencySymbol) {
          price += item.qty * itemPrice.amount;
        }
        return price;
      });
    });

    this.setState({
      totalItems: items,
      totalPrice: price,
    });
  };

  componentDidMount() {
    this.handleTotals();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.currencySymbol !== prevProps.currencySymbol ||
      this.props.cart !== prevProps.cart ||
      this.state.totalItems !== prevState.totalItems ||
      this.state.totalPrice !== prevState.totalPrice
    ) {
      this.handleTotals();
    }
  }

  render() {
    const { totalItems, totalPrice } = this.state;
    const { currencySymbol } = this.props;
    return (
      <Container>
        <Tax>
          <Title>Tax 21%:</Title>{" "}
          <TotalTax>
            {currencySymbol} {(totalPrice * 0.21).toFixed(2)}
          </TotalTax>
        </Tax>
        <Quantity>
          <Title>Quantity:</Title> <Value>{totalItems}</Value>
        </Quantity>
        <Total>
          <Title>Total:</Title>{" "}
          <Amount>
            {currencySymbol} {totalPrice.toFixed(2)}
          </Amount>
        </Total>
        <OrderBtn>ORDER</OrderBtn>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    currencySymbol: state.shop.currencySymbol,
  };
};

export default connect(mapStateToProps)(CartOrderComponent);
