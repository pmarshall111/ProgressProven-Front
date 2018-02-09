import React, { Component } from "react";

import CompleteProfileForm from "./forms/CompleteProfileForm";

export default class CompleteProfile extends Component {
  render() {
    return (
      <div className="attention">
        <h3>Your profile is not complete!</h3>
        <p>Please complete the following fields and press submit!</p>
        <CompleteProfileForm />
      </div>
    );
  }
}
