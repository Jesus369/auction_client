import React, { Component } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";

import Modal from "react-modal";

import "./Styles.css";

class AuctionListings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  preventRefresh = e => {
    e.preventDefault();
  };

  submitBid = () => {
    console.log("button is clicked");
  };

  render() {
    return (
      <div key={this.props.item.id} className="homeItem">
        <Grid.Column>
          <Segment>
            <h4 onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
              {this.props.item.name}
            </h4>
            <img
              alt="This is cool"
              src={this.props.item.image}
              className="itemImg"
            />
          </Segment>
          <Segment>
            {this.props.item.price}
          </Segment>
        </Grid.Column>

        <Modal isOpen={this.state.isOpen} className="modal">
          <div className="sectionTop">
            <Image
              alt="This is super cool"
              src={this.props.item.image}
              className="image"
            />
            <ul className="item_description">
              <li className="item_name">
                {this.props.item.name}
              </li>
              <li className="item_text">
                Current Price: {this.props.item.price}
              </li>
              <li className="item_text">
                <form onSubmit={this.preventRefresh}>
                  <tbody>
                    <table className="bid_table">
                      <tr>
                        <td className="dollar_sign">$</td>
                        <td className="bid_input">
                          <input
                            type="text"
                            placeholder="0.00"
                            className="input_bid"
                          />
                        </td>
                      </tr>
                    </table>
                    <button className="submit_bid" onClick={this.submitBid}>
                      Bid
                    </button>
                  </tbody>
                </form>
              </li>
            </ul>
          </div>
          <button
            onClick={() => this.setState({ isOpen: false })}
            className="closeButton"
          >
            X
          </button>
        </Modal>
      </div>
    );
  }
}

export default AuctionListings;
