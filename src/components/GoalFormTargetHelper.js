import React, { Component } from "react";
import { Field, clearFields } from "redux-form";

class DeletableField extends Field {
  componentWillUnmount() {
    super.componentWillUnmount();
    this.context._reduxForm.dispatch(
      clearFields(this.context._reduxForm.form, false, false, this.props.name)
    );
  }

  render() {
    return <Field {...this.props} />;
  }
}

export default class TargetGoalForm extends Component {
  render() {
    const { numb, remove } = this.props;
    const options = new Array(49)
      .fill("xyz")
      .map((x, i) => <option value={i + 2}>{i + 2} hours</option>);
    return (
      <div>
        <DeletableField
          name={`timePeriod${numb}`}
          component="select"
          placeholder="1"
        >
          <option value="1">Each Day</option>
          <option value="7">Each Week</option>
        </DeletableField>
        I will spend
        <DeletableField name={`targetTime${numb}`} component="select">
          <option value={1}>1 hour</option>
          {options}
        </DeletableField>
        improving!
        <button onClick={() => remove(numb)}>X</button>
      </div>
    );
  }
}
