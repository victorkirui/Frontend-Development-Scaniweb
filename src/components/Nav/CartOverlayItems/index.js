import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../../../redux/shopping/shopping-actions";

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
  AttributeColor,
  RightContainer,
  CountContainer,
  Increment,
  Count,
  Decrement,
  ImageContainer,
  Image,
} from "./CartOverlayItemsStyles";

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
              {this.props.currencySymbol}{" "}
              {itemData.prices?.map((price) => (
                <React.Fragment key={price.symbol}>
                  {price.currency.symbol === this.props.currencySymbol && (
                    <>{price.amount}</>
                  )}
                </React.Fragment>
              ))}
            </Price>

            {itemData.attributes?.map((item, index) =>
              item ? (
                <React.Fragment key={index}>
                  <AttributeName>{item.id}</AttributeName>
                  <AttributeWrap>
                    {item.id === "Color" ? (
                      <AttributeColor
                        bg={item.value}
                        className="active-color"
                      />
                    ) : (
                      <AttributeValue className="active-option">
                        {item.value}
                      </AttributeValue>
                    )}
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

const mapStateToProps = (state) => {
  return {
    currencySymbol: state.shop.currencySymbol,
    cart: state.shop.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQty: (id, value) => dispatch(incrementQty(id, value)),
    decrementQty: (id, value) => dispatch(decrementQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
