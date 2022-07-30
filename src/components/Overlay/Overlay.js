import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { toggleCartOverlay } from "../../redux/shopping/shopping-actions";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  content: "";
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
`;

export class Overlay extends PureComponent {
  render() {
    return (
      <Container onClick={() => this.props.toggleCartOverlay()}></Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCartOverlay: () => dispatch(toggleCartOverlay()),
  };
};

export default connect(null, mapDispatchToProps)(Overlay);
