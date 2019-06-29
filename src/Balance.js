import React, { Component } from "react";

export default class Balance extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex container-fluid">
          <div className="col-sm-1">
            <p>Balance</p>
            <p>{this.props.balance}</p>
          </div>

          <div className="col-sm-1">
            <p>Payout</p>
            <p>{this.props.next_payout}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
