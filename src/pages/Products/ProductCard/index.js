import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadCurrentItem,
  addProductToCart,
} from "../../../redux/shopping/shopping-actions";

import {
  ContainerWrapper,
  Container,
  ItemWrapper,
  ProductWrapper,
  ProductImage,
  ProductName,
  Price,
  CartIcon,
  InStock,
} from "./ProductCardStyles";

class index extends PureComponent {
  render() {
    const { products, currencySymbol, loadCurrentItem, addProductToCart } =
      this.props;
    return (
      <ContainerWrapper>
        <Container>
          {products?.map((product) => {
            return (
              <ItemWrapper key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  onClick={() => loadCurrentItem(product)}
                  style={{ textDecoration: "none" }}
                >
                  <ProductWrapper>
                    <ProductImage
                      src={product.gallery[0]}
                      alt={product.name}
                      style={
                        product.inStock ? { opacity: 1 } : { opacity: 0.4 }
                      }
                    />
                    <ProductName
                      style={
                        product.inStock ? { opacity: 1 } : { opacity: 0.6 }
                      }
                    >
                      {product.brand} {product.name}
                    </ProductName>
                    <Price
                      style={
                        product.inStock ? { opacity: 1 } : { opacity: 0.5 }
                      }
                    >
                      {currencySymbol}{" "}
                      {product.prices?.map((price) => (
                        <React.Fragment key={price.symbol}>
                          {price.currency.symbol === currencySymbol && (
                            <>{price.amount}</>
                          )}
                        </React.Fragment>
                      ))}
                    </Price>

                    {product.inStock ? " " : <InStock>OUT OF STOCK</InStock>}
                  </ProductWrapper>
                </Link>

                {product.inStock && product.attributes.length ? (
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => loadCurrentItem(product)}
                  >
                    <CartIcon style={{ cursor: "pointer" }} />
                  </Link>
                ) : product.inStock && product.attributes.length === 0 ? (
                  <CartIcon
                    onClick={() => addProductToCart(product)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <CartIcon style={{ display: "none" }} />
                )}
              </ItemWrapper>
            );
          })}
        </Container>
      </ContainerWrapper>
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
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
    addProductToCart: (currentItem) => dispatch(addProductToCart(currentItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
