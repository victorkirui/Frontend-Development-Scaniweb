import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  changeProductQuantity,
  changeProductAttributeInCart,
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

    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleQuantityChange(index, type, e) {
    e.stopPropagation();
    this.props.changeProductQuantity(index, type);
  }

  handleAttributeChange = (index, id, value, e) => {
    e.stopPropagation();
    this.props.changeProductAttributeInCart(index, id, value);
  };

  render() {
    const { itemData, index } = this.props;
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

            {itemData.attributes?.map((attr) =>
              attr ? (
                <React.Fragment key={attr.id}>
                  <AttributeName>{attr.id}</AttributeName>
                  <AttributeWrap>
                    {attr.items.map((item) => (
                      <>
                        {attr.id === "Color" ? (
                          <AttributeColor
                            bg={item.value}
                            className={
                              item.selected ? "active-color" : undefined
                            }
                            onClick={(e) =>
                              this.handleAttributeChange(
                                index,
                                attr.id,
                                item.value,
                                e
                              )
                            }
                          />
                        ) : (
                          <AttributeValue
                            className={
                              item.selected ? "active-option" : undefined
                            }
                            onClick={(e) =>
                              this.handleAttributeChange(
                                index,
                                attr.id,
                                item.value,
                                e
                              )
                            }
                          >
                            {item.value}
                          </AttributeValue>
                        )}
                      </>
                    ))}
                  </AttributeWrap>
                </React.Fragment>
              ) : null
            )}
          </LeftContainer>
          <RightContainer>
            <CountContainer>
              <Increment
                onClick={(e) =>
                  this.handleQuantityChange(index, "increment", e)
                }
              >
                +
              </Increment>
              <Count>{itemData.qty}</Count>
              <Decrement
                onClick={(e) =>
                  this.handleQuantityChange(index, "decrement", e)
                }
              >
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeProductQuantity: (index, type) =>
      dispatch(changeProductQuantity(index, type)),
    changeProductAttributeInCart: (index, id, value) =>
      dispatch(changeProductAttributeInCart(index, id, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
