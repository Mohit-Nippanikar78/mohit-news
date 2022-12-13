import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";


export class Header extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
    };
  }
  componentDidMount() {
    var axios = require("axios").default;

    var options = {
      method: "GET",
      url: "https://cricket-live-data.p.rapidapi.com/match",
      headers: {
        "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
        "x-rapidapi-key": "01ef3387f6msh9d796c1eea0c01bp161057jsnf09624f267cd",
      },

    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <Link to="/">
          <div
            className="navbar-brand"
            onClick={() => {
              this.setState({ activeList: null });
            }}
          >
            Navbar
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.props.categories.map((category) => {
              return (
                <li
                  className={
                    this.props.activeList == category.id
                      ? "nav-item active"
                      : "nav-item"
                  }
                  key={category.id}
                  onClick={() => {
                    this.props.updateParent({ activeList: category.id });
                  }}
                >
                  <Link
                    className="nav-link"
                    to={`/category/${category.con}`}
                    style={{ textTransform: "capitalize" }}
                  >
                    {category.con}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div
            className="form-inline my-2 my-lg-0"
            onSubmit={() => {
              console.log("search");
            }}
          >
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                this.setState({ query: e.target.value });
              }}
            />

            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                this.props.updateParent({ activeList: null });
              }}
            >
              <Link to={`/results?search=${this.state.query} `}>Search</Link>
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
