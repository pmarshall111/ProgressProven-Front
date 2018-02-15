import React, { Component } from "react";
import Auth from "./Auth";
import PageBreak from "./PageBreak";
import HowItWorks from "./HowItWorks";

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
        <PageBreak title="How it Works" />
        <HowItWorks />
        <PageBreak title="Why Use ProgressProven" />
      </section>
    );
  }
}
