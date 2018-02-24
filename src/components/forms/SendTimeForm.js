import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import Multiselect from "react-widgets/lib/Multiselect";
import SelectList from "react-widgets/lib/SelectList";

const renderMultiselect = ({ input, data, valueField, textField }) => (
  <Multiselect
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />
);

const renderSelectList = ({ input, data }) => (
  <SelectList {...input} onBlur={() => input.onBlur()} data={data} />
);

class SendTimeForm extends Component {
  render() {
    const { goals, tags, stopwatchTime, handleSubmit } = this.props;
    var goalOptions = goals.map(x => (
      <option value={x} key={`${x}-option`}>
        {x}
      </option>
    ));
    return (
      <form className="send-time-form" onSubmit={handleSubmit}>
        <p className="select-container">
          <Field name="goal" component="select" className="select">
            {goalOptions}
          </Field>
          <span className="select-display">{goalOptions[0]}</span>
        </p>
        <div>
          <label>Add some tags:</label>
          <Field name="tags" component={renderMultiselect} data={tags} />
        </div>
        <div>
          <label>How did it go?</label>
          <Field
            name="mood"
            component={renderSelectList}
            data={["hmpfff", "okay", "great"]}
          />
        </div>
      </form>
    );
  }
}

export default reduxForm({ form: "send-time" })(SendTimeForm);
