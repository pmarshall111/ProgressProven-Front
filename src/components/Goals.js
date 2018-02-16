import React, { Component } from "react";

import Banner from "./Banner";
import DisplayGoals from "./DisplayGoals";

import "../css/Goals.css";

export default class Goals extends Component {
  render() {
    return (
      <section className="goal-page">
        <Banner title="Goals" exit="/home" />
        <DisplayGoals active={true} />
        <DisplayGoals active={false} />
      </section>
    );
  }
}
