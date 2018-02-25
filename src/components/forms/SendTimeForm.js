import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Multiselect from "react-widgets/lib/Multiselect";
import SelectList from "react-widgets/lib/SelectList";

import "react-widgets/dist/css/react-widgets.css";

const renderMultiselect = props => {
  var { input, data, valueField, textField } = props;
  //couldn't get the default input.value to work well with redux-form
  //when using allowCreate and onCreate. Instead I have used global variable :(
  input.value = window.tags;

  return (
    <Multiselect
      {...input}
      onBlur={() => input.onBlur()}
      value={window.tags}
      data={data}
      valueField={valueField}
      textField={textField}
      allowCreate={true}
      onCreate={name => {
        var inThere = window.tags.filter(x => x === name).length;
        if (!inThere && name !== "") window.tags.push(name);
      }}
      onSelect={(x, y) => {
        window.tags.push(x);
      }}
    />
  );
};

const renderSelectList = ({ input, data }) => (
  <SelectList {...input} onBlur={() => input.onBlur()} data={data} />
);

class SendTimeForm extends Component {
  render() {
    const { goals, tags, stopwatchTime, handleSubmit } = this.props;
    var goalOptions = goals.map((x, idx) => (
      <option value={x} key={`${x}-option-${idx}`}>
        {x}
      </option>
    ));
    goalOptions.unshift(<option key="default-option">Select One...</option>);
    return (
      <form className="send-time-form grid" onSubmit={handleSubmit}>
        <div>
          <label>Which goal were you working towards?</label>
          <p className="select-container">
            <Field
              name="goal"
              component="select"
              className="select s-goal"
              onChange={() =>
                (document.querySelector(
                  "#goal"
                ).textContent = document.querySelector(".s-goal").value)
              }
            >
              {goalOptions}
            </Field>
            <span className="select-display" id="goal">
              {goalOptions[0]}
            </span>
          </p>
        </div>

        <div>
          <label>How did it go?</label>
          <Field
            name="mood"
            component={renderSelectList}
            data={["hmpfff", "okay", "great"]}
          />
        </div>
        <div>
          <label>Add some tags:</label>
          <Field name="tags" component={renderMultiselect} data={tags} />
        </div>
        <div>
          {stopwatchTime}
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: "send-time" })(SendTimeForm);
