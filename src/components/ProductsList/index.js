import React, { PureComponent } from "react";
import Product from "../Product";
import { Container} from "./ProductListStyles";

class ProductsList extends PureComponent {
  render() {
    return (
      <Container>
        <Product />
      </Container>
    );
  }
}

export default ProductsList;
