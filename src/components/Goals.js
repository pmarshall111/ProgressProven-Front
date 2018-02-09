import React, { Component } from "react";

import Banner from "./Banner";
import DisplayGoals from "./DisplayGoals";

export default class Goals extends Component {
  render() {
    return (
      <section className="new-goal-page">
        <Banner title="Goals" exit="/" />
        <DisplayGoals active={true} />
        <DisplayGoals active={false} />
      </section>
    );
  }
}
