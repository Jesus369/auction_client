import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Input, Button } from "semantic-ui-react";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  preventRefresh = e => {
    e.preventDefault();
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(this.state);
  };

  login = async () => {
    const { username, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, password }
    });
    console.log(response);
    const { ok, token, refreshToken } = response.data.login;
    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      this.props.history.push("/");
    } else {
      console.log("error");
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form
          className="registerForm"
          onSubmit={this.preventRefresh}
          onChange={this.onChange}
        >
          <Input
            style={{ marginTop: 10 }}
            placeholder="Username"
            name="username"
            value={username}
            type="text"
          />
          <Input
            style={{ marginTop: 10 }}
            placeholder="Password"
            name="password"
            value={password}
            type="text"
          />
          <Button primary style={{ marginTop: 30 }} onClick={this.login}>
            Signin
          </Button>
        </form>
      </div>
    );
  }
}

const loginMutation = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      refreshToken
    }
  }
`;

export default graphql(loginMutation)(Login);
