import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { LinkItems, LinkItem } from "./NavLinkStyles";

// State
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchCurrentCategoryName,
  closeCartOverlay,
} from "../../../redux/shopping/shopping-actions";

import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

class index extends PureComponent {
  handleClick = (name) => {
    this.props.fetchCurrentCategoryName(name);
    this.props.closeCartOverlay();
  };

  render() {
    const { categories, fetchCategories } = this.props;
    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          data && fetchCategories(data.categories);

          return (
            <LinkItems>
              {categories.map((item) => (
                <LinkItem
                  key={item.name}
                  to={`/category/${item.name}`}
                  onClick={() => this.handleClick(item.name)}
                >
                  {item.name}
                </LinkItem>
              ))}
            </LinkItems>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.shop.categories,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (data) => dispatch(fetchCategories(data)),
    fetchCurrentCategoryName: (name) =>
      dispatch(fetchCurrentCategoryName(name)),
    closeCartOverlay: () => dispatch(closeCartOverlay()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(index));
