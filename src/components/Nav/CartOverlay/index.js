import React, { PureComponent } from "react";
import CartOverlayItems from "../CartOverlayItems";
import CartTotals from "../CartTotals";
import { connect } from "react-redux";
import { Container, Title } from "./CartOverlayStyles";

class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cartCount: 0,
    };
    this.handleCount = this.handleCount.bind(this);
  }

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
  render() {
    return (
      <Container>
        <Title>My Bag: {this.state.cartCount} items</Title>
        {this.props.cart.map((item) => (
          <CartOverlayItems key={item.id} itemData={item} />
        ))}
        <CartTotals cartCount={this.state.cartCount} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(index);
