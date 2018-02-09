import React, { Component } from "react";

import Title from "./Title";
import StartWork from "./StartWork";
import ProfilePreview from "./ProfilePreview";
import GoalsPreview from "./GoalsPreview";
import QuoteOfTheDay from "./QuoteOfTheDay";
import StatsPreview from "./StatsPreview";

import "../css/Homepage.css";

export default class Homepage extends Component {
  render() {
    return (
      <div className="app">
        <main className="homepage grid">
          <Title />
          <StartWork />
          <ProfilePreview />
          <GoalsPreview />
          <QuoteOfTheDay />
          <StatsPreview />
        </main>
      </div>
    );
  }
}
