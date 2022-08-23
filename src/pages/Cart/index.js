import React, { PureComponent } from "react";
import CartItem from "./CartItem";
import CartOrderComponent from "./CartOrderComponent";
import { connect } from "react-redux";
import { CartWrapper, Title, Count } from "./CartStyles";

class index extends PureComponent {
  render() {
    const { cart } = this.props;
    return (
      <CartWrapper>
        <Title>Cart</Title>
        {cart.length === 0 && <Count>You have No Items in your cart</Count>}
        {cart.map((item, index) => (
          <CartItem key={index} itemData={item} index={index} />
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

export default connect(mapStateToProps)(index);
