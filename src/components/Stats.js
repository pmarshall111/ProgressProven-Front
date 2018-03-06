import React, { Component } from "react";

import Banner from "./Banner";
import StatsTimeSpent from "./StatsTimeSpent";

export default class Stats extends Component {
  render() {
    return (
      <section className="stats-page">
        <Banner title="Stats" exit="/home" />
        <StatsTimeSpent />
      </section>
    );
  }
}
