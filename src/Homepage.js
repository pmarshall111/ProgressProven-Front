import React, { Component } from "react";

import Title from "./Title";
import StartWork from "./StartWork";
import ProfilePreview from "./ProfilePreview";
import GoalsPreview from "./GoalsPreview";
import QuoteOfTheDay from "./QuoteOfTheDay";
import StatsPreview from "./StatsPreview";

export default class Homepage extends Component {
  render() {
    return (
      <main className="homepage grid">
        <Title />
        <StartWork />
        <ProfilePreview />
        <GoalsPreview />
        <QuoteOfTheDay />
        <StatsPreview />
      </main>
    );
  }
}
