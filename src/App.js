import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Products from "./pages/Products";
import PDP from "./pages/PDP";
import Cart from "./pages/Cart";
import Nav from "./components/Nav";
import Overlay from "./components/overlay/Overlay";

//TEST git

function App(props) {
  return (
    <div className="App">
      <Nav />
      <div style={{ position: "relative" }}>
        {props.cartOverlayOpen && <Overlay />}
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/category/:category" component={Products} />
            <Route path="/product/:id" component={PDP} />
            <Route path="/cart" render={() => <Cart />} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartOverlayOpen: state.shop.cartOverlayOpen,
  };
};

export default connect(mapStateToProps)(App);
