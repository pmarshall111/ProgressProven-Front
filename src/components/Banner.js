import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../css/Banner.css";

export default class Banner extends Component {
  render() {
    const classN = this.props.title.replace(/\s/g, "-");
    return (
      <div className={`banner ${classN}`}>
        <h2>{this.props.title}</h2>
        <Link to={this.props.exit}>
          <button>X</button>
        </Link>
      </div>
    );
  }
}
