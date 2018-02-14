import React, { Component } from "react";

import CompleteProfileForm from "./forms/CompleteProfileForm";

export default class CompleteProfile extends Component {
  toggle() {
    var container = document.querySelector(".complete-profile-container");
    var button = document.querySelector(".complete-profile-container button");
    if (container.style["max-height"] === "50px") {
      container.style["max-height"] = "450px";
      button.textContent = "SHOW";
    } else {
      container.style["max-height"] = "50px";
      button.textContent = "HIDE";
    }
  }

  render() {
    //page re-calculates page width when hiding complete profile info. This i becasuse the scrollbar appears
    return (
      <div className="complete-profile-container">
        <div className="title-banner">
          <h3>Your profile is not complete!</h3>
          <button onClick={() => this.toggle()}>HIDE</button>
        </div>
        <div className="profile-alert-body">
          <p>Please complete the following fields and press submit!</p>
          <div className="grid complete-profile-info">
            <CompleteProfileForm />
            <div className="complete-profile-questions grid">
              <h2>Why do we need this info?</h2>
              <p>
                We don't! You can close this alert now if you'd like. This
                information will be used to create a more personal experience
                like greeting you by your name or sending you a message when
                it's your birthday!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
