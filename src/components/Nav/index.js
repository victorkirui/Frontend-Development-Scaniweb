import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Logo.png";
import NavLinks from "./NavLinks";
import Currencies from "./Currencies";
import { connect } from "react-redux";
import {
  fetchCurrentCategoryName,
  closeCartOverlay,
} from "../../redux/shopping/shopping-actions";
import { Container } from "./NavStyles";

class index extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = () => {
    this.props.fetchCurrentCategoryName("All");
    this.props.closeCartOverlay();
  };

  render() {
    return (
      <Container>
        <NavLinks />

        <Link to="/category/all" onClick={this.handleClick}>
          <img src={Logo} alt="logo" />
        </Link>

        <Currencies />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentCategoryName: (name) =>
      dispatch(fetchCurrentCategoryName(name)),
    closeCartOverlay: () => dispatch(closeCartOverlay()),
  };
};

export default connect(null, mapDispatchToProps)(index);
