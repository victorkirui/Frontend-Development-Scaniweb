import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Interweave } from "interweave";
import { addToCart } from "../../redux/shopping/shopping-actions";
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
      selectedOptions: [],
      productObject: {},
      error: false,
    };
  }

  handleOptions = (id, value) => {
    const exist = this.state.selectedOptions.find((option) => option.id === id);
    if (exist) {
      this.setState((state) => ({
        ...state,
        selectedOptions: this.state.selectedOptions.map((item) =>
          item.id === id ? { ...exist, value } : item
        ),
      }));
    } else {
      this.setState((state) => ({
        ...state,
        selectedOptions: [...this.state.selectedOptions, { id, value }],
      }));
    }
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  handleAddToCart = (id, options) => {
    const AttributesLength = this.state.productObject.product.attributes.length;

    if (
      (this.state.selectedOptions.length &&
        this.state.selectedOptions.length === AttributesLength) ||
      AttributesLength === 0
    ) {
      this.setState({
        error: false,
      });
      this.props.addToCart(id, options);
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

  render() {
    const { active } = this.state;
    return (
      <Query
        query={GET_PRODUCT}
        variables={{ name: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          this.setState({
            productObject: data,
          });

          return (
            <PDPContainer>
              <Container>
                <LeftContainer>
                  {data.product.gallery?.map((image, index) => {
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
                    src={data.product.gallery[active]}
                    alt="main image"
                    style={
                      data.product.inStock ? { opacity: 1 } : { opacity: 0.4 }
                    }
                  />
                  {data.product.inStock ? " " : <InStock>OUT OF STOCK</InStock>}
                </MiddleContainer>
                <RightContainer>
                  <Brand>{data.product.brand}</Brand>
                  <Name>{data.product.name}</Name>

                  {data.product.attributes.map((attribute) => (
                    <AttributeName key={attribute.id}>
                      <React.Fragment>{attribute.name}:</React.Fragment>
                      <br />
                      {attribute.items.map((item) => {
                        const selectedItem = this.state.selectedOptions.find(
                          (option) =>
                            option.id === attribute.id &&
                            option.value === item.value
                        );
                        return attribute.type === "swatch" ? (
                          <AttributeValue
                            bg={item.value}
                            key={item.id}
                            onClick={() =>
                              this.handleOptions(attribute.id, item.value)
                            }
                            className={
                              selectedItem ? "active-color" : undefined
                            }
                          ></AttributeValue>
                        ) : (
                          <AttributeValue
                            key={item.id}
                            className={
                              selectedItem ? "active-option" : undefined
                            }
                            onClick={() =>
                              this.handleOptions(attribute.id, item.value)
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
                      {data.product.prices?.map((price) => (
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
                  {data.product.inStock ? (
                    <Button
                      onClick={() =>
                        this.handleAddToCart(
                          data.product.id,
                          this.state.selectedOptions
                        )
                      }
                      style={
                        data.product.inStock
                          ? { cursor: "pointer" }
                          : { cursor: "not-allowed" }
                      }
                    >
                      ADD TO CART
                    </Button>
                  ) : (
                    <Button
                      disabled
                      onClick={() =>
                        this.handleAddToCart(
                          data.product.id,
                          this.state.selectedOptions
                        )
                      }
                      style={
                        data.product.inStock
                          ? { cursor: "pointer" }
                          : { cursor: "not-allowed" }
                      }
                    >
                      OUT OF STOCK
                    </Button>
                  )}

                  <Desc>
                    <Interweave content={data.product.description} />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, attributes) => dispatch(addToCart(id, attributes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
