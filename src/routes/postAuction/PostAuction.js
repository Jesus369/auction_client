import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import decode from "jwt-decode";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class PostAuction extends Component {
  state = {
    name: "",
    price: "",
    expiration_date: "",
    image: ""
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
    const { name, price, expiration_date, image } = this.state;
    let response = null;
    try {
      response = await this.props.mutate({
        variables: { name, price, expiration_date, image }
      });
    } catch (err) {
      console.log(err);
      return;
    }

    const { ok } = response.data.createAuction;

    if (ok) {
      this.props.history.push("/");
    }
  };

  render() {
    const { name, price, expiration_date, image } = this.state;
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
          <Input
            placeholder="Price"
            value={price}
            name="price"
            style={{ marginTop: 10 }}
          />
          <Input
            placeholder="Duration"
            value={expiration_date}
            name="expiration_date"
            style={{ marginTop: 10 }}
          />
          <Input
            placeholder="Image"
            value={image}
            name="image"
            style={{ marginTop: 10 }}
          />
          <Button
            primary
            style={{ marginTop: "2em" }}
            onClick={this.submitPost}
          >
            Post Item
          </Button>
        </form>
      </div>
    );
  }
}

const createAuctionMutation = gql`
  mutation(
    $name: String!
    $price: Float!
    $expiration_date: Int!
    $image: String!
  ) {
    createAuction(
      name: $name
      price: $price
      expiration_date: $expiration_date
      image: $image
    ) {
      ok
    }
  }
`;
export default graphql(createAuctionMutation)(PostAuction);
