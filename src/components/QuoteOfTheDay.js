import React, { Component } from "react";

import "../css/QuoteOfTheDay.css";

export default class QuoteOfTheDay extends Component {
  render() {
    return (
      <section className="quote-of-the-day-container">
        <div className="quote-of-the-day-preview">
          <h3>"Be who you want to be"</h3>
        </div>
      </section>
    );
  }
}
