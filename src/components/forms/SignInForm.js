import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus(labelId) {
    let label = document.querySelector(labelId);
    label.style.transform = "translateY(-30px) scale(0.8)";
  }

  handleBlur(labelId, inputId) {
    var input = document.querySelector(inputId);
    if (input.getAttribute("value")) return;
    setTimeout(() => {
      let label = document.querySelector(labelId);
      label.style.transform = "";
    }, 100);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="grouped-input">
          <label id="email-signin" htmlFor="email">
            Email:
          </label>
          <Field
            id="email-signin-input"
            name="email"
            component="input"
            type="text"
            onFocus={() => this.handleFocus("#email-signin")}
            onBlur={() =>
              this.handleBlur("#email-signin", "#email-signin-input")
            }
          />
        </div>
        <div className="grouped-input">
          <label id="password-signin" htmlFor="password">
            Password:
          </label>
          <Field
            id="password-signin-input"
            name="password"
            component="input"
            type="password"
            onFocus={() => this.handleFocus("#password-signin")}
            onBlur={() =>
              this.handleBlur("#password-signin", "#password-signin-input")
            }
          />
        </div>
        <button type="sumbit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({ form: "signin-form" })(SignInForm);
