import React, { PureComponent } from "react";
import {
  CartContainer,
  Container,
  LeftContainer,
  Brand,
  Name,
  Price,
  AttributeName,
  AttributeWrap,
  AttributeValue,
  RightContainer,
  CountContainer,
  Increment,
  Count,
  Decrement,
  ImageContainer,
  Image,
} from "./CartOverlayItemsStyles";

import { connect } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../../redux/shopping/shopping-actions";

class CartOverlay extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cartCount: 0,
      itemCount: this.props.itemData.qty,
    };

    this.handleIncQty = this.handleIncQty.bind(this);
    this.handleDecQty = this.handleDecQty.bind(this);
  }

  //INCREMENT QTY
  handleIncQty(id) {
    this.setState(
      {
        itemCount: this.state.itemCount + 1,
      },
      () => {
        this.props.incrementQty(id, this.state.itemCount);
      }
    );
  }

  //DECREMENT QTY
  handleDecQty(id) {
    if (this.state.itemCount > 1) {
      this.setState(
        {
          itemCount: this.state.itemCount - 1,
        },
        () => {
          this.props.decrementQty(id, this.state.itemCount);
        }
      );
    } else if (this.state.itemCount === 1) {
      this.props.removeFromCart(id);
    }
  }

  render() {
    const { itemData } = this.props;
    return (
      <CartContainer>
        <Container>
          <LeftContainer>
            <Brand>{itemData.brand}</Brand>
            <Name>{itemData.name}</Name>
            <Price>
              {itemData.prices[0].currency.symbol}
              {itemData.prices[0].amount}
            </Price>

            {itemData.attributes?.map((item) =>
              item ? (
                <React.Fragment key={item.id}>
                  <AttributeName>{item.name}</AttributeName>
                  <AttributeWrap>
                    {item.items?.map((item) => {
                      return (
                        <AttributeValue bg={item.value} key={item.id}>
                          {item.value.charAt(0) === "#" ? " " : item.value}
                        </AttributeValue>
                      );
                    })}
                  </AttributeWrap>
                </React.Fragment>
              ) : null
            )}
          </LeftContainer>
          <RightContainer>
            <CountContainer>
              <Increment onClick={() => this.handleIncQty(itemData.id)}>
                +
              </Increment>
              <Count>{itemData.qty}</Count>
              <Decrement onClick={() => this.handleDecQty(itemData.id)}>
                -
              </Decrement>
            </CountContainer>
            <ImageContainer>
              <Image src={itemData.gallery[0]} alt={itemData.name} />
            </ImageContainer>
          </RightContainer>
        </Container>
      </CartContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQty: (id, value) => dispatch(incrementQty(id, value)),
    decrementQty: (id, value) => dispatch(decrementQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(CartOverlay);
