import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose } from "redux";

const ShowAuction = ({
  data: { getAuction = [] },
  match: { params: { id } }
}) =>
  getAuction.map(auction =>
    <h1 key={auction.id}>
      {auction.name}
    </h1>
  );

const showAuctionQuery = gql`
  {
    getAuction {
      id
      name
    }
  }
`;

export default compose(
  graphql(showAuctionQuery, {
    options: props => ({
      variables: { id: props.match.params.id },
      fetchPolicy: "network-only"
    })
  })
)(ShowAuction);
