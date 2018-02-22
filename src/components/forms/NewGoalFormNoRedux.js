import React, { Component } from "react";

export default class NewGoalFormNoRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      targetTime0: "1",
      timePeriod0: "1"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  handleChange(event) {
    console.log(event.target);
    var name = event.target.getAttribute("name");
    this.setState({ name: event.target.value });
  }

  //used for adding new inputs
  // var biggestNumb = selects.reduce((t,c) => c>t ? c : t, -Infinity)

  render() {
    var numbProps = Object.keys(this.state);
    var selects = numbProps.filter(x => x.match(/\d+/));
    console.log(selects);
    var targets = selects.map(x => {
      var options = x.includes("targetTime")
        ? new Array(49).fill("xyz").map((x, i) => {
            var suffix = "hour";
            if (i > 0) suffix += "s";
            return (
              <option value={i + 1}>
                {i + 1} {suffix}
              </option>
            );
          })
        : [
            <option value="1">Each Day</option>,
            <option value="7">Each Week</option>
          ];
      return (
        <select name={x} onChange={this.handleChange}>
          {options}
        </select>
      );
    });
    console.log(targets);
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          I want to get better at...
          <input
            type="text"
            placeholder="basket weaving"
            name="subject"
            onChange={this.handleChange}
            value={this.state.subject}
          />. By putting in the time, practicing and working hard ~~MYSUBJECT~~
          can get easier and if I am persistent I can achieve mastery.
          <h3>The Plan</h3>
          {targets}
          <button>Add another target!</button>
          <button type="submit">Go!</button>
        </div>
      </form>
    );
  }
}
