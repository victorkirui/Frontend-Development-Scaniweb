import React, { PureComponent } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import ProductCard from "./ProductCard";
import { Container } from "./ProductsListStyles";

import { connect } from "react-redux";
import { fetchProducts } from "../../redux/shopping/shopping-actions";

const GET_PRODUCTS = gql`
  query GetProducts($name: String!) {
    category(input: { title: $name }) {
      name
      products {
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
  }
`;

class Products extends PureComponent {
  render() {
    const { fetchProducts } = this.props;
    return (
      <Query
        query={GET_PRODUCTS}
        variables={{ name: this.props.match.params.category || "all" }}
      >
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          const products = data.category.products;
          fetchProducts(products);

          return (
            <Container>
              <h1 style={{ textTransform: "capitalize", fontWeight: "400" }}>
                {this.props.activeCategory}
              </h1>
              <ProductCard products={products} />
            </Container>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCategory: state.shop.activeCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (data) => dispatch(fetchProducts(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
