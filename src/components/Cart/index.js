import React, { PureComponent } from "react";
import CartItem from "../CartItem";
import CartOrderComponent from "../CartOrderComponent";
import { CartWrapper, Title, Count } from "./CartStyles";

import { connect } from "react-redux";

class Cart extends PureComponent {
  render() {
    const { cart } = this.props;
    return (
      <CartWrapper>
        <Title>Cart</Title>
        {cart.length === 0 && <Count>You have No Items in your cart</Count>}
        {cart.map((item) => (
          <CartItem key={item.id} itemData={item} />
        ))}
        <CartOrderComponent />
      </CartWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Cart);
