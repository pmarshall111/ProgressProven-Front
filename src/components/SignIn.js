import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signUpInActionCreator } from "../actions";

import LoginButton from "./LoginButton";
import SignInForm from "./forms/SignInForm";

import "../css/SignIn.css";

class SignIn extends Component {
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
    this.props.signUpInActionCreator(vals, "login", this.redirect);
  }

  render() {
    return (
      <figure className="back">
        <div className="form-container">
          <h2>Sign In</h2>
          <LoginButton company="Google" type="Sign In" />
          <span>OR</span>
          <SignInForm onSubmit={this.submit} />
        </div>
      </figure>
    );
  }
}

export default withRouter(connect(null, { signUpInActionCreator })(SignIn));
