import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

// State
import { connect } from "react-redux";
import {
  fetchCategories,
  fetchCurrentCategoryName,
  closeCartOverlay,
} from "../../../redux/shopping/shopping-actions";

import { LinkItems, LinkItem } from "./NavLinkStyles";

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
    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) console.log(error);

          //Setting categories data to REDUX
          this.props.fetchCategories(data.categories);

          return (
            <LinkItems>
              {data.categories.map((item) => (
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: (data) => dispatch(fetchCategories(data)),
    fetchCurrentCategoryName: (name) =>
      dispatch(fetchCurrentCategoryName(name)),
    closeCartOverlay: () => dispatch(closeCartOverlay()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(index));
