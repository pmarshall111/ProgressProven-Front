import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class SignUpForm extends Component {
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
          <label id="email-signup" htmlFor="email">
            Email:
          </label>
          <Field
            id="email-signup-input"
            name="email"
            component="input"
            type="text"
            onFocus={() => this.handleFocus("#email-signup")}
            onBlur={() =>
              this.handleBlur("#email-signup", "#email-signup-input")
            }
          />
        </div>
        <div className="grouped-input">
          <label id="password-signup" htmlFor="password">
            Password:
          </label>
          <Field
            id="password-signup-input"
            name="password"
            component="input"
            type="password"
            onFocus={() => this.handleFocus("#password-signup")}
            onBlur={() =>
              this.handleBlur("#password-signup", "#password-signup-input")
            }
          />
        </div>
        <div className="grouped-input">
          <label id="password-signup2" htmlFor="confirm-password">
            Confirm Password:
          </label>
          <Field
            id="password-signup-input2"
            name="confirm-password"
            component="input"
            type="password"
            onFocus={() => this.handleFocus("#password-signup2")}
            onBlur={() =>
              this.handleBlur("#password-signup2", "#password-signup-input2")
            }
          />
        </div>
        <button type="sumbit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({ form: "signup-form" })(SignUpForm);
