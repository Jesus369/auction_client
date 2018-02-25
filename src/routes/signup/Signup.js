import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Input, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

// Imported store

class Signup extends Component {
  state = {
    email: "",
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

  onSubmit = async () => {
    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password }
    });
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <div>
        <form
          className="registerForm"
          onSubmit={this.preventRefresh}
          onChange={this.onChange}
        >
          <Input placeholder="Email" value={email} name="email" type="text" />
          <Input
            style={{ marginTop: 10 }}
            placeholder="Username"
            value={username}
            name="username"
            type="text"
          />
          <Input
            style={{ marginTop: 10 }}
            placeholder="Password"
            value={password}
            name="password"
            type="text"
          />
          <Link to="/login" style={{ textAlign: "center" }}>
            <Button
              style={{ marginTop: "2em" }}
              className="submit"
              primary
              onClick={this.onSubmit}
            >
              Register
            </Button>
          </Link>
        </form>
      </div>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
    }
  }
`;

export default graphql(registerMutation)(Signup);
