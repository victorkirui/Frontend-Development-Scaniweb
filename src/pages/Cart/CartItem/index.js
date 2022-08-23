import React, { PureComponent } from "react";
import "../../../App.css";
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
  ImageContent,
  LeftArrow,
  RightArrow,
} from "./CartItemStyles";

import { connect } from "react-redux";
import {
  changeProductQuantity,
  changeProductAttributeFromCart,
} from "../../../redux/shopping/shopping-actions";

class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
    };

    this.handleNextSlide = this.handleNextSlide.bind(this);
    this.handlePrevSlide = this.handlePrevSlide.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleQuantityChange(index, type, e) {
    e.stopPropagation();
    this.props.changeProductQuantity(index, type);
  }

  handleAttributeChange = (index, id, value, e) => {
    e.stopPropagation();
    this.props.changeProductAttributeFromCart(index, id, value);
  };

  // Thumbnail Image sliders functionality
  handleNextSlide() {
    this.setState({
      current:
        this.state.current === this.props.itemData.gallery.length - 1
          ? 0
          : this.state.current + 1,
    });
  }

  handlePrevSlide() {
    this.setState({
      current:
        this.state.current === 0
          ? this.props.itemData.gallery.length - 1
          : this.state.current - 1,
    });
  }

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
              {itemData.gallery?.map((item, index) => {
                return (
                  <div
                    className={
                      index === this.state.current ? "slide activeImg" : "slide"
                    }
                    key={index}
                  >
                    {index === this.state.current && (
                      <ImageContent src={item} alt={item.name} />
                    )}
                  </div>
                );
              })}
              {itemData.gallery.length > 1 && (
                <>
                  <LeftArrow onClick={this.handlePrevSlide} />
                  <RightArrow onClick={this.handleNextSlide} />
                </>
              )}
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
    changeProductAttributeFromCart: (index, id, value) =>
      dispatch(changeProductAttributeFromCart(index, id, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
