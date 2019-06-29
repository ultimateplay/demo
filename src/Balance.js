import React, { Component } from "react";

export default class Balance extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="d-flex container-fluid"
          style={{ paddingBottom: "20px" }}
        >
          <div style={{ lineHeight: "17px", width: "5.5em" }}>
            <div style={{ fontSize: "0.6em", color: "grey" }}>Balance</div>
            <div style={{ fontSize: "1em" }}>
              {this.props.balance
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              $
            </div>
          </div>

          <div style={{ lineHeight: "17px", width: "5.5em" }}>
            <div style={{ fontSize: "0.6em", color: "grey" }}>Payout</div>
            <div style={{ fontSize: "1em" }}>
              {this.props.next_payout
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}{" "}
              $
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
