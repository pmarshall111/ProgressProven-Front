import React, { Component } from "react";

import "../css/Title.css";

export default class Title extends Component {
  render() {
    return (
      <header className="title">
        <h1>Take the chance</h1>
        <button>Log out</button>
      </header>
    );
  }
}
