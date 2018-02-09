import React from "react";
import { Field, reduxForm } from "redux-form";

const CompleteProfileForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      {props.name && (
        <fieldset>
          <label>First Name:</label>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </fieldset>
      )}
      {props.DOB && (
        <fieldset>
          <label>D.O.B.:</label>
          <Field name="dob" component="input" type="date" />
        </fieldset>
      )}
      {props.email && (
        <fieldset>
          <label>Email:</label>
          <Field
            name="email"
            component="input"
            type="text"
            placeholder="keepgoing@hotmail.com"
          />
        </fieldset>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default reduxForm({ form: "complete-profile" })(CompleteProfileForm);
