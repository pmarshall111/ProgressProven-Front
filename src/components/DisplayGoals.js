import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DisplayGoals extends Component {
  render() {
    //needs access to user data to display goals.
    const title = this.props.active ? "Active Goals" : "Previous Goals";
    return (
      <div>
        <h2>{title}</h2>
        {this.props.active && (
          <Link to="/goals/new">
            <button>+</button>
          </Link>
        )}
        <div className="grid goals-list" />
      </div>
    );
  }
}
