import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import decode from "jwt-decode";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class PostAuction extends Component {
  state = {
    name: "",
    price: "",
    expiration_date: ""
  };

  preventRefresh = e => {
    e.preventDefault();
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    console.log(this.state);
  };

  submitPost = async () => {
    const { name, price, expiration_date } = this.state;
    const response = await this.props.mutate({
      variables: { name, price, expiration_date }
    });

    const { ok } = response.data.createAuction;

    if (ok) {
      this.props.history.push("/");
    }
  };

  render() {
    const { name, price, expiration_date } = this.state;
    let username = "";
    try {
      const token = localStorage.getItem("token");
      const { user } = decode(token);
      username = user.username;
    } catch (err) {}

    return (
      <div>
        {username}
        <form
          className="registerForm"
          onChange={this.onChange}
          onSubmit={this.preventRefresh}
        >
          <Input placeholder="Product Name" value={name} name="name" />
          <Input placeholder="Price" value={price} name="price" />
          <Input
            placeholder="Duration"
            value={expiration_date}
            name="expiration_date"
          />
          <Button primary onClick={this.submitPost}>
            Post Item
          </Button>
        </form>
      </div>
    );
  }
}

const createAuctionMutation = gql`
  mutation($name: String!, $price: Float!, $expiration_date: Int!) {
    createAuction(
      name: $name
      price: $price
      expiration_date: $expiration_date
    ) {
      ok
    }
  }
`;
export default graphql(createAuctionMutation)(PostAuction);
