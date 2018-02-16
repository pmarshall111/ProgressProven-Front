import React, { Component } from "react";

import Banner from "./Banner";
import Profile from "./Profile";
import CompleteProfile from "./CompleteProfile";
import Badges from "./Badges";

import "../css/Profile.css";

export default class YourProfile extends Component {
  render() {
    return (
      <section className="profile-page-container">
        <Banner title="Your Profile" exit="/home" />
        <Profile />
        <CompleteProfile />
        <Badges />
      </section>
    );
  }
}
