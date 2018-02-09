import React, { Component } from "react";

import "../css/Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <section class="welcome-page">
        <div class="welcome-details">
          <div class="sasche">
            <h1>Welcome to Seize the Day!</h1>
          </div>
        </div>
        <div class="marketing">
          <h2>Visualise the time you put into achieving your goals!</h2>
          <ul class="sample-charts">
            <li>Sample charts go here</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </div>
      </section>
    );
  }
}
