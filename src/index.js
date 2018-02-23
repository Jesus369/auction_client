import { BrowserRouter, Switch, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import { combineReducers } from "redux";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from "react-apollo";

import "./styles.css";
import "semantic-ui-css/semantic.min.css";

// Imported Routes
import ShowAuction from "./routes/showAuction/ShowAuction";
import PostAuction from "./routes/postAuction/PostAuction";
import Home from "./routes/home/Home";
import Signup from "./routes/signup/Signup";
import Login from "./routes/login/Login";
import Sell from "./routes/sell/Sell";
import store from "./routes/signup/reducer";

// Provider for stores
import { Provider } from "react-redux";

// Connecting to our server
const networkInterface = createNetworkInterface({
  uri: "http://localhost:8081/graphql"
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers["x-token"] = localStorage.getItem("token");
      req.options.headers["x-refresh-token"] = localStorage.getItem(
        "refreshToken"
      );
      next();
    }
  }
]);

networkInterface.useAfter([
  {
    applyAfterware({ response: { headers } }, next) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token) {
        localStorage.setItem("token", token);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

const reducers = combineReducers({
  apollo: client.reducer()
});

// Setting up Routes and Server
const App = (
  <ApolloProvider client={client} store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/item/:id" component={ShowAuction} />
        <Route path="/post" exact component={PostAuction} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));
registerServiceWorker();
