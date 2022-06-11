import React, { PureComponent } from "react";
import "../../App.css";
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
  ImageContent,
  LeftArrow,
  RightArrow,
} from "./CartItemStyles";

import { connect } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart,
} from "../../redux/shopping/shopping-actions";

class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      cartCount: 0,
      itemCount: this.props.itemData.qty,
      current: 0,
    };

    this.handleIncQty = this.handleIncQty.bind(this);
    this.handleDecQty = this.handleDecQty.bind(this);
    this.handleNextSlide = this.handleNextSlide.bind(this);
    this.handlePrevSlide = this.handlePrevSlide.bind(this);
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

  componentDidMount() {
    console.log(this.props.itemData);
  }

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
                  <AttributeName>{item.name}:</AttributeName>
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
              <Count>{this.state.itemCount}</Count>
              <Decrement onClick={() => this.handleDecQty(itemData.id)}>
                -
              </Decrement>
            </CountContainer>
            <ImageContainer>
              {itemData.gallery?.map((item, index) => {
                return (
                  <div
                    className={
                      index === this.state.current ? "slide active" : "slide"
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

const mapDispatchToProps = (dispatch) => {
  return {
    incrementQty: (id, value) => dispatch(incrementQty(id, value)),
    decrementQty: (id, value) => dispatch(decrementQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(null, mapDispatchToProps)(index);
