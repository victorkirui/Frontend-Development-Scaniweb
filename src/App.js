import React, { PureComponent } from "react";
import "./App.css";
import styled from "styled-components";

// Components
import ProductsList from "./components/ProductsList";
import Nav from "./components/Nav";
import PDP from "./components/PDP";
import Cart from "./components/Cart";
import Overlay from "./components/Overlay";

// State
import { connect } from "react-redux";
import { fetchProducts } from "./redux/shopping/shopping-actions";
import { fetchfilteredProducts } from "./redux/shopping/shopping-actions";

// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Grapghql
import gql from "graphql-tag";
import { apolloClient } from "./index";

// QUERY
const GET_PRODUCTS = gql`
  query {
    categories {
      products {
        id
        name
        inStock
        gallery
        description
        category
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
        brand
      }
    }
  }
`;

const Container = styled.div`
  margin: auto;
  position: relative;
`;
const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 0px 10px;
`;

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    const { fetchProducts } = this.props;

    let res;
    try {
      res = await apolloClient.query({
        query: GET_PRODUCTS,
      });
    } catch (error) {
      console.log(error);
    }

    fetchProducts(res.data);
    this.filterAllResults(res.data);
  };

  filterAllResults(data) {
    const clothes = data.categories?.slice(0, 1).map((item) => {
      return item.products?.filter((product) => {
        return product.category === "clothes";
      });
    });
    const tech = data.categories?.slice(0, 1).map((item) => {
      return item.products?.filter((product) => {
        return product.category === "tech";
      });
    });
    const children = clothes[0].concat(tech[0]);
    this.props.fetchfilteredProducts(children);
  }

  render() {
    const { cartOverlayOpen } = this.props;
    return (
      <Router>
        <div className="App">
          <Nav />

          <Container>
            {cartOverlayOpen && <Overlay />}
            <ContentWrapper>
              <Routes>
                <Route exact path="/" element={<ProductsList />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<PDP />} />
              </Routes>
            </ContentWrapper>
          </Container>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartOverlayOpen: state.shop.cartOverlayOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: (data) => dispatch(fetchProducts(data)),
    fetchfilteredProducts: (someProducts) =>
      dispatch(fetchfilteredProducts(someProducts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
