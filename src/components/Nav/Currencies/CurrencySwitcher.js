import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { changeCurrencySymbol } from "../../../redux/shopping/shopping-actions";

const Container = styled.div`
  background: #fff;
  p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #1d1f22;
    cursor: pointer;
    padding: 10px 20px;
    margin: 0;

    &:hover {
      background: #eee;
    }
  }
`;

class CurrencySwitcher extends PureComponent {
  handleCurencyChange = () => {
    this.props.changeCurrencySymbol(this.props.item.symbol);

    this.props.handleShow();
  };

  render() {
    const { item, show } = this.props;
    return (
      <Container>
        {show && (
          <p onClick={this.handleCurencyChange}>
            {item.symbol} {item.label}
          </p>
        )}
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrencySymbol: (symbol) => dispatch(changeCurrencySymbol(symbol)),
  };
};

export default connect(null, mapDispatchToProps)(CurrencySwitcher);
