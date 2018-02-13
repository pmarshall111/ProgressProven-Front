import React, { Component } from "react";
import Auth from "./Auth";

import "../css/Welcome.css";

export default class Welcome extends Component {
  render() {
    return (
      <section className="welcome-page">
        <div className="welcome-title grid">
          <div className="welcome-title-details">
            <h1>Welcome to ProgressProven</h1>
            <h2>Track the time you spend achieving your goals!</h2>
          </div>
          <Auth />
        </div>
      </section>
    );
  }
}

// <div className="square" id="sq1" />
// <div className="square" id="sq2" />
// <div className="square" id="sq3" />
// <div className="square" id="sq4" />
// <div className="square" id="sq5" />
// <div className="square" id="sq6" />
// <div className="square" id="sq7" />
