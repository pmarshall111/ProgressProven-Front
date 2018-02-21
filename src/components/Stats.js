import React, { Component } from "react";

import Banner from "./Banner";

export default class Stats extends Component {
  render() {
    return (
      <section className="stats-page">
        <Banner title="Stats" exit="/home" />
      </section>
    );
  }
}
