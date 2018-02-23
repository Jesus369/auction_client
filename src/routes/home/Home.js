import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const Home = ({ data: { getAuctions = [] } }) =>
  getAuctions.map(auction =>
    <h1 key={auction.id}>
      <Link to={`/item/${auction.id}`}>
        <li>
          {auction.name}
        </li>
        <li>
          {auction.price}
        </li>
      </Link>
    </h1>
  );

const getAuctionsQuery = gql`
  {
    getAuctions {
      id
      name
      price
    }
  }
`;

export default graphql(getAuctionsQuery)(Home);
