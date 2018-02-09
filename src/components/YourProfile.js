import React, { Component } from "react";

import Banner from "./Banner";
import Profile from "./Profile";
import CompleteProfile from "./CompleteProfile";
import Badges from "./Badges";

export default class ProfilePage extends Component {
  render() {
    return (
      <section className="profile-page">
        <Banner title="Your Profile" exit="/" />
        <Profile />
        <CompleteProfile />
        <Badges />
      </section>
    );
  }
}
