import React, { PureComponent } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
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
} from "./ProductStyles";

import { connect } from "react-redux";
import {
  loadCurrentItem,
  addToCart,
} from "../../redux/shopping/shopping-actions";

class Product extends PureComponent {
  handleAddToCart(id, val) {
    if (val) {
      this.props.addToCart(id);
    }
  }
  render() {
    const { loadCurrentItem, filteredProducts } = this.props;

    return (
      <ContainerWrapper>
        <Container>
          {filteredProducts?.map((product) => {
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
                      opacity={product.inStock}
                    />
                    <ProductName opacity={product.inStock}>
                      {product.name}
                    </ProductName>
                    <Price opacity={product.inStock}>
                      {product.prices[0].currency.symbol}{" "}
                      {product.prices[0].amount}
                    </Price>

                    {product.inStock ? " " : <InStock>OUT OF STOCK</InStock>}
                  </ProductWrapper>
                </Link>

                {product.inStock ? (
                  <CartIcon
                    onClick={() =>
                      this.handleAddToCart(product.id, product.inStock)
                    }
                    cursor={product.inStock}
                  />
                ) : (
                  <CartIcon
                    disabled
                    onClick={() =>
                      this.handleAddToCart(product.id, product.inStock)
                    }
                    cursor={product.inStock}
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
    data: state.shop.data,
    filteredProducts: state.shop.filteredProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
