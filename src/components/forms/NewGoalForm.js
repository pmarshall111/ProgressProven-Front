import React, { Component } from "react";
import { Field, reduxForm, FieldArray } from "redux-form";

class RenderTargets extends Component {
  render() {
    const { fields, meta } = this.props;

    var startingVals = [
      { targetTime: 1, timePeriod: 1 },
      { targetTime: 10, timePeriod: 7 },
      { targetTime: 20, timePeriod: 7 }
    ];

    if (fields.length === 0) {
      fields.push({ targetTime: 1, timePeriod: 1 });
      fields.push({ targetTime: 10, timePeriod: 7 });
      fields.push({ targetTime: 20, timePeriod: 7 });
    }
    return (
      <div className="new-goal-target-container">
        <div className="new-goal-target-items-container">
          {fields.map((x, idx, field) => {
            var timeOptions = new Array(50).fill("xyz").map((x, i) => {
              var suffix = "hour";
              if (i > 0) suffix += "s";
              return (
                <option value={i + 1} key={i + 1 + "hours"}>
                  {i + 1} {suffix}
                </option>
              );
            });
            return (
              <div className="new-goal-target-item" key={`target${idx}`}>
                <div className="new-goal-target-header">
                  <h3>
                    {idx < 3 &&
                    field.get(idx).targetTime == startingVals[idx].targetTime &&
                    field.get(idx).timePeriod == startingVals[idx].timePeriod
                      ? "SUGGESTED"
                      : "CUSTOM"}
                  </h3>
                  <button onClick={() => fields.remove(idx)}>X</button>
                </div>
                <p className="select-container">
                  <Field
                    name={`${x}.timePeriod`}
                    component="select"
                    onChange={e => {
                      e.target.blur();
                    }}
                    className="select"
                  >
                    <option value={1}>Every Day</option>
                    <option value={7}>Every Week</option>
                  </Field>
                  <span className="select-display">
                    {field.get(idx).timePeriod == 7
                      ? "Every Week"
                      : "Every Day"}
                  </span>
                </p>
                I will do...
                <p className="select-container">
                  <Field
                    name={`${x}.targetTime`}
                    component="select"
                    onChange={e => e.target.blur()}
                    className="select"
                  >
                    {timeOptions}
                  </Field>
                  <span className="select-display">
                    {field.get(idx).targetTime == 1
                      ? "1 hour"
                      : `${field.get(idx).targetTime} hours`}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
        <button onClick={() => fields.push({ targetTime: 1, timePeriod: 1 })}>
          Add New
        </button>
      </div>
    );
  }
}

class NewGoalForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="new-goal-form-container">
          I want to get better at...
          <Field
            name="subject"
            component="input"
            type="text"
            placeholder="basket weaving"
          />.
          <h3>Targets</h3>
          I want to do...
          <FieldArray name="targets" component={RenderTargets} />
          <button type="submit">Go!</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: "new-goal"
})(NewGoalForm);
