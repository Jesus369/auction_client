import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  createNetworkInterface,
  ApolloProvider
} from "react-apollo";
import decode from "jwt-decode";
import "./styles.css";
import "semantic-ui-css/semantic.min.css";

// Imported Routes
import PostAuction from "./routes/postAuction/PostAuction";
import Home from "./routes/home/Home";
import Signup from "./routes/signup/Signup";
import Login from "./routes/login/Login";

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

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    decode(token);
    decode(refreshToken);
  } catch (error) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/login" }} />}
  />;

// Setting up Routes and Server
const App = (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/post" exact component={PostAuction} />
        <Route path="/register" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));
registerServiceWorker();
