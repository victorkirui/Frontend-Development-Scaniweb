import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadCurrentItem,
  addToCart,
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
    const { products } = this.props;
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
                      {this.props.currencySymbol}{" "}
                      {product.prices?.map((price) => (
                        <React.Fragment key={price.symbol}>
                          {price.currency.symbol ===
                            this.props.currencySymbol && <>{price.amount}</>}
                        </React.Fragment>
                      ))}
                    </Price>

                    {product.inStock ? " " : <InStock>OUT OF STOCK</InStock>}
                  </ProductWrapper>
                </Link>

                {product.inStock && product.attributes.length ? (
                  <Link to={`/product/${product.id}`}>
                    <CartIcon style={{ cursor: "pointer" }} />
                  </Link>
                ) : product.inStock && product.attributes.length === 0 ? (
                  <CartIcon
                    onClick={() =>
                      this.props.addToCart(product.id, product.attributes)
                    }
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <CartIcon
                    style={{ cursor: "not-allowed", display: "none" }}
                  />
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
    addToCart: (id, allAttributes) => dispatch(addToCart(id, allAttributes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
