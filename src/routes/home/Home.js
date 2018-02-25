import React from "react";
import { graphql } from "react-apollo";
import decode from "jwt-decode";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

import AuctionListings from "../../components/AuctionListings";
import "./Styles.css";

let username = "";
let userId = "";
try {
  const token = localStorage.getItem("token");
  const { user } = decode(token);
  username = user.username;
  userId = user.id;
} catch (err) {}

const Home = ({ data: { getAuctions = [] } }) => {
  return (
    <div>
      <Menu style={{ marginBottom: "10em" }}>
        <Menu.Item>
          <Button>
            <Link to="/register">Sign up</Link>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </Menu.Item>
        <span className="username">
          <Menu.Item>
            <table>
              <tr>
                <td>
                  {username}
                </td>
                <td>
                  {userId ? <button>Logout</button> : <button>Login</button>}
                </td>
                <td>Account</td>
              </tr>
            </table>
          </Menu.Item>
        </span>
      </Menu>
      <div
        columns="equal"
        style={{
          width: "80%",
          margin: "0 auto 0 auto",
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {getAuctions.map(auction =>
          <AuctionListings key={Date.now()} item={auction} />
        )}
      </div>
    </div>
  );
};

const getAuctionsQuery = gql`
  {
    getAuctions {
      id
      name
      price
      image
    }
  }
`;

export default graphql(getAuctionsQuery)(Home);
