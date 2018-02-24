import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

class CompleteProfileForm extends Component {
  constructor(props) {
    super(props);
    this.handleFocus = this.handleFocus.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    var inputs = document.querySelectorAll(".grouped-input");
    inputs.forEach(inputGroup => {
      var label = inputGroup.querySelector("label");
      var input = inputGroup.querySelector("input");

      label.style.transform = `translateY(${input.offsetHeight / 2 -
        label.offsetHeight / 2}px) scale(0.8)`;
    });
  }

  handleFocus(labelId) {
    let label = document.querySelector(labelId);
    let input = document.querySelector(`${labelId}-input`);
    if (labelId === "#complete-dob") {
      input.style.color = "black";
      console.log(input.getBoundingClientRect(), input.offsetHeight);
    }
    label.style.transform = `translateY(-30px) scale(0.8)`;
  }

  handleBlur(labelId, inputId) {
    var input = document.querySelector(inputId);
    if (input.getAttribute("value")) return;
    setTimeout(() => {
      input.style.color = "transparent";
      let label = document.querySelector(labelId);
      label.style.transform = `translateY(${input.offsetHeight / 2 -
        label.offsetHeight / 2}px) scale(0.8)`;
    }, 100);
  }

  render() {
    var { handleSubmit, user } = this.props;
    if (!user) user = {};
    return (
      <form className="complete-profile-form grid" onSubmit={handleSubmit}>
        {!user.name && (
          <div className="grouped-input">
            <label id="complete-name" htmlFor="name">
              First Name:
            </label>
            <Field
              id="complete-name-input"
              name="name"
              component="input"
              type="text"
              onFocus={() => this.handleFocus("#complete-name")}
              onBlur={() =>
                this.handleBlur("#complete-name", "#complete-name-input")
              }
            />
          </div>
        )}
        {!user.DOB && (
          <div className="grouped-input">
            <label id="complete-dob" htmlFor="dob">
              D.O.B.:
            </label>
            <Field
              id="complete-dob-input"
              name="dob"
              component="input"
              type="date"
              onFocus={() => this.handleFocus("#complete-dob")}
              onBlur={() =>
                this.handleBlur("#complete-dob", "#complete-dob-input")
              }
            />
          </div>
        )}
        {!user.email && (
          <div className="grouped-input">
            <label id="complete-email" htmlFor="email">
              Email:
            </label>
            <Field
              id="complete-email-input"
              name="email"
              component="input"
              type="text"
              onFocus={() => this.handleFocus("#complete-email")}
              onBlur={() =>
                this.handleBlur("#complete-email", "#complete-email-input")
              }
            />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(
  reduxForm({ form: "complete-profile" })(CompleteProfileForm)
);
