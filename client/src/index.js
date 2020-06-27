import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./modules/store";
import "bootstrap/dist/css/bootstrap.css";

const reduxStore = configureStore();

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
