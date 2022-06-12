import React, { PureComponent } from "react";
import { Interweave } from "interweave";
import {
  PDPContainer,
  Container,
  LeftContainer,
  ProductImage,
  MiddleContainer,
  MainImage,
  InStock,
  RightContainer,
  Brand,
  Name,
  AttributeName,
  AttributeValue,
  Price,
  PriceLabel,
  Amount,
  Button,
  Desc,
} from "./PdpStyles";

import { connect } from "react-redux";
import { addToCart } from "../../redux/shopping/shopping-actions";

class PDP extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      attributes: [],
    };

    this.handleIndexClick = this.handleIndexClick.bind(this);
    this.handleSelectAttribute = this.handleSelectAttribute.bind(this);
  }

  handleSelectAttribute(e) {
    this.setState((prevState) => ({
      attributes: [
        ...prevState.attributes,
        { [e.target.parentNode.innerText.split("\n")[0]]: e.target.innerText },
      ],
    }));
  }

  handleIndexClick(event) {
    this.setState({
      active: +event.target.dataset.index,
    });
  }

  render() {
    const { active } = this.state;
    const { currentItem, addToCart } = this.props;

    return (
      <PDPContainer>
        <Container>
          <LeftContainer>
            {currentItem.gallery?.map((image, index) => {
              return (
                <ProductImage
                  src={image}
                  alt="product image"
                  key={image}
                  data-index={index}
                  onClick={this.handleIndexClick}
                  className={index === active ? "active" : ""}
                />
              );
            })}
          </LeftContainer>
          <MiddleContainer>
            <MainImage
              src={currentItem.gallery[active]}
              alt="main image"
              opacity={currentItem.inStock}
            />
            {currentItem.inStock ? " " : <InStock>OUT OF STOCK</InStock>}
          </MiddleContainer>
          <RightContainer>
            <Brand>{currentItem.brand}</Brand>
            <Name>{currentItem.name}</Name>

            {currentItem.attributes?.map((item) =>
              item ? (
                <React.Fragment key={item.id}>
                  <AttributeName>
                    <React.Fragment>{item.name}</React.Fragment>
                    <br />
                    {item.items?.map((item) => {
                      return (
                        <AttributeValue
                          bg={item.value}
                          key={item.id}
                          onClick={(e) => this.handleSelectAttribute(e)}
                        >
                          {item.value.charAt(0) === "#" ? " " : item.value}
                        </AttributeValue>
                      );
                    })}
                  </AttributeName>
                </React.Fragment>
              ) : null
            )}

            <Price>
              <PriceLabel>PRICE:</PriceLabel>
              <Amount>
                {currentItem.prices[0].currency.symbol}
                {currentItem.prices[0].amount}
              </Amount>
            </Price>

            {currentItem.inStock ? (
              <Button
                cursor={currentItem.inStock}
                onClick={() => addToCart(currentItem.id, this.state.attributes)}
              >
                ADD TO CART
              </Button>
            ) : (
              <Button
                cursor={currentItem.inStock}
                disabled
                onClick={() => addToCart(currentItem.id, this.state.attributes)}
              >
                ADD TO CART
              </Button>
            )}

            <Desc>
              <Interweave content={currentItem.description} />
            </Desc>
          </RightContainer>
        </Container>
      </PDPContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentItem: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, attributeValues) =>
      dispatch(addToCart(id, attributeValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
