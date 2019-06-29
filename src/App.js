import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Balance from "./Balance";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { requestApiData } from "./actions";

//export default class App extends Component {
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      bonuses_unactive: [
        {
          title: "Sitecostructor.io",
          description: "Site constructor",
          link: "https://sitecostructor.io/?p=itpaycodes",
          promocode: "itpaycodes"
        },
        {
          title: "Appvision.com",
          description: "SDK",
          link: "http://appvision.com/+itpaycodes",
          promocode: "itpaycodes"
        },
        {
          title: "Analytics.com",
          description: "Analytics",
          link: "https://www.analytics.com/?ref=itpaycodes",
          promocode: "itpaycodes"
        }
      ],
      header_unactive: {
        balance: 213920,
        next_payout: 159465,
        currency: "usd"
      }
    };
  }

  componentDidMount() {
    this.props.requestApiData();
    //const results = Array.prototype.slice.call(this.props.data);
    //this.setState({ bonuses: results });
  }

  copyPromoCode = promocode => {
    var dummy = document.createElement("textarea");
    dummy.innerText = promocode;
    dummy.style.height = "0px";
    dummy.style.width = "0px";
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand("copy", false, null);
    dummy.remove();
  };

  onSearch = event => {
    this.setState({ search: event.target.value });
  };

  resetSearch = () => {
    this.setState({ search: "" });
  };

  onActivate = index => {
    this.setState(state => {
      const list = state.bonuses.map((item, i) => {
        if (i === index) {
          item.activated = !item.activated;
        }
      });
      return { list };
    });
  };

  promocodeTableRows = () =>
    this.state.bonuses
      .filter(
        item =>
          item.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
      )
      .map((item, index) => (
        <tr key={item.title}>
          <td style={{ borderRadius: "10px", margin: "0" }}>
            <table
              className="table table-borderless"
              style={{ marginBottom: "0", padding: "0" }}
            >
              <tbody>
                <tr>
                  <td className="h4">{item.title}</td>
                  <td
                    style={{
                      textAlignVertical: "bottom"
                    }}
                  >
                    PROMOCODE
                  </td>
                  <td />
                </tr>

                <tr>
                  <td width="40%">{item.description}</td>
                  <td width="30%">
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="outline-dark"
                        style={{ borderColor: "lightgrey", textAlign: "left" }}
                        block="true"
                        data-promocode={item.promocode}
                        onClick={() => this.copyPromoCode(item.promocode)}
                      >
                        <div
                          className="d-flex justify-content-between"
                          block="true"
                        >
                          <div>itpromocodes</div>
                          <div>
                            <i
                              className="far fa-copy"
                              style={{ color: "blue" }}
                            />
                          </div>
                        </div>
                      </Button>
                    </div>
                  </td>
                  <td width="30%">
                    <Button
                      variant={item.activated ? "primary" : "outline-primary"}
                      onClick={() => {
                        this.onActivate(index);
                      }}
                      block="true"
                    >
                      Activate Bonus
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      ));

  componentWillReceiveProps(nextProps) {
    const bonuses = Array.prototype.slice.call(nextProps.data.bonuses);
    bonuses.map(item => {
      item.activated = false;
    });
    const header = nextProps.data.header;

    this.setState({ bonuses: bonuses, header: header });
  }

  render() {
    return !this.state.bonuses || !this.state.header ? (
      <h1>Loading...</h1>
    ) : (
      <div>
        <h4 className="bg-primary text-white text-center p-2">Promo codes</h4>

        <Balance
          balance={this.state.header.balance}
          next_payout={this.state.header.next_payout}
        />
        <div className="container-fluid">
          <div className="form-group form-group-lg">
            <div className="col-sm-2 small" style={{ fontSize: "1.5em" }}>
              Services
            </div>
            <label
              className="col-sm-2 control-label small"
              htmlFor="search"
              style={{ color: "grey" }}
            >
              FILTER
            </label>
            <div className="d-flex">
              <div className="col-sm-3">
                <input
                  default
                  id="search"
                  type="text"
                  value={this.state.search}
                  className="form-control btn-lg"
                  onChange={ev => this.onSearch(ev)}
                />
              </div>
              <Button
                className="col-sm-1 btn-lg"
                variant="outline-dark"
                style={{ borderColor: "lightgrey", textAlign: "center" }}
                onClick={this.resetSearch}
              >
                Reset
              </Button>
            </div>
          </div>

          <table
            className="table table-bordered"
            style={{
              borderSpacing: "20px",
              borderCollapse: "separate",
              border: "0",
              width: "80%",
              marginLeft: "-7px"
            }}
          >
            <tbody>{this.promocodeTableRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
