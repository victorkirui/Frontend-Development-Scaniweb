import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Interweave } from "interweave";
import {
  addProductToCart,
  changeProductAttribute,
} from "../../redux/shopping/shopping-actions";
import { GrCircleInformation } from "react-icons/gr";

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
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const GET_PRODUCT = gql`
  query GetProduct($name: String!) {
    product(id: $name) {
      id
      name
      inStock
      gallery
      description
      brand
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      error: false,
    };
  }

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { currentItem, changeProductAttribute, addProductToCart } =
      this.props;

    const isValidAttributes =
      currentItem &&
      currentItem.attributes.reduce(
        (acc, val) => (val.items.every((item) => !item.selected) ? false : acc),
        true
      );

    const handleAddToCart = () => {
      if (isValidAttributes) {
        addProductToCart(currentItem);
      } else {
        this.setState({
          error: true,
        });
        setTimeout(() => {
          this.setState({
            error: false,
          });
        }, 3000);
      }
    };

    return (
      <Query
        query={GET_PRODUCT}
        variables={{ name: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          return (
            <PDPContainer>
              <Container>
                <LeftContainer>
                  {currentItem.gallery?.map((image, index) => {
                    return (
                      <ProductImage
                        key={index}
                        src={image}
                        alt="product image"
                        data-index={index}
                        onClick={this.handleIndexClick}
                        className={index === active ? "activeImg" : ""}
                      />
                    );
                  })}
                </LeftContainer>
                <MiddleContainer>
                  <MainImage
                    src={currentItem.gallery[active]}
                    alt="main image"
                    style={
                      currentItem.inStock ? { opacity: 1 } : { opacity: 0.4 }
                    }
                  />
                  {currentItem.inStock ? " " : <InStock>OUT OF STOCK</InStock>}
                </MiddleContainer>
                <RightContainer>
                  <Brand>{currentItem.brand}</Brand>
                  <Name>{currentItem.name}</Name>

                  {currentItem.attributes.map((attribute) => (
                    <AttributeName key={attribute.id}>
                      <React.Fragment>{attribute.name}:</React.Fragment>
                      <br />
                      {attribute.items.map((item) => {
                        return attribute.type === "swatch" ? (
                          <AttributeValue
                            bg={item.value}
                            key={item.id}
                            onClick={() =>
                              currentItem.inStock &&
                              changeProductAttribute(attribute.id, item.value)
                            }
                            className={
                              item.selected ? "active-color" : undefined
                            }
                          ></AttributeValue>
                        ) : (
                          <AttributeValue
                            key={item.id}
                            className={
                              item.selected ? "active-option" : undefined
                            }
                            onClick={() =>
                              currentItem.inStock &&
                              changeProductAttribute(attribute.id, item.value)
                            }
                          >
                            {item.value}
                          </AttributeValue>
                        );
                      })}
                    </AttributeName>
                  ))}

                  <Price>
                    <PriceLabel>PRICE:</PriceLabel>
                    <Amount>
                      {this.props.currencySymbol}{" "}
                      {currentItem.prices?.map((price) => (
                        <React.Fragment key={price.symbol}>
                          {price.currency.symbol ===
                            this.props.currencySymbol && <>{price.amount}</>}
                        </React.Fragment>
                      ))}
                    </Amount>
                  </Price>
                  {this.state.error && (
                    <span
                      style={{
                        marginBottom: "20px",
                        color: "red",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <GrCircleInformation
                        style={{ marginRight: "5px", color: "red" }}
                      />{" "}
                      Please select all options to add to cart
                    </span>
                  )}
                  {currentItem.inStock ? (
                    <Button
                      onClick={handleAddToCart}
                      style={
                        currentItem.inStock
                          ? { cursor: "pointer" }
                          : { cursor: "not-allowed" }
                      }
                    >
                      ADD TO CART
                    </Button>
                  ) : (
                    <Button
                      disabled
                      style={
                        currentItem.inStock
                          ? { cursor: "pointer" }
                          : { cursor: "not-allowed" }
                      }
                    >
                      OUT OF STOCK
                    </Button>
                  )}

                  <Desc>
                    <Interweave content={currentItem.description} />
                  </Desc>
                </RightContainer>
              </Container>
            </PDPContainer>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencySymbol: state.shop.currencySymbol,
    currentItem: state.shop.currentItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (currentItem) => dispatch(addProductToCart(currentItem)),
    changeProductAttribute: (id, val) =>
      dispatch(changeProductAttribute(id, val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
