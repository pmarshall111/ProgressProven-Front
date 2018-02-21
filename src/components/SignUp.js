import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signUpInActionCreator } from "../actions";

import LoginButton from "./LoginButton";
import SignUpForm from "./forms/SignUpForm";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.props.history.push("/home");
  }

  submit(vals) {
    console.log(vals);
    this.props.signUpInActionCreator(vals, "signup", this.redirect);
  }

  render() {
    return (
      <figure className="front">
        <div className="form-container">
          <h2>Sign Up</h2>
          <LoginButton company="Google" type="Sign Up" />
          <SignUpForm onSubmit={this.submit} />
        </div>
      </figure>
    );
  }
}

export default withRouter(connect(null, { signUpInActionCreator })(SignUp));
