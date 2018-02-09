import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <h2>{this.props.title}</h2>
        <Link to={this.props.exit}>
          <button>X</button>
        </Link>
      </div>
    );
  }
}
