import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import GithubGraph from "./graphs/GithubGraph";
import LineGraph from "./graphs/LineGraph";

class StatsTimeSpent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "all",
      selectedDate: moment().startOf("day")
    };
    this.changeDay = this.changeDay.bind(this);
  }

  changeDay(date) {
    this.setState({ selectedDate: date });
  }

  render() {
    const { user } = this.props;

    if (!user) return <div />;

    var options = user.improvementAreas.map(x => {
      return (
        <option key={`${x.subject}-stats-select`} value={x.subject}>
          {x.subject}
        </option>
      );
    });

    options.unshift(
      <option key={`all-stats-select`} value="all" selected="selected">
        All
      </option>
    );

    // var monthLineData = graphData.map(
    //   goal =>
    //     (goal.time = goal.time.filter(y =>
    //       moment(y.timeStarted).isSame(this.state.selectedDate, "month")
    //     ))
    // );
    // var weekLineData = graphData.map(
    //   goal =>
    //     (goal.time = goal.time.filter(y =>
    //       moment(y.timeStarted).isSame(this.state.selectedDate, "week")
    //     ))
    // );
    // var dayLineData = graphData.map(
    //   goal =>
    //     (goal.time = goal.time.filter(y =>
    //       moment(y.timeStarted).isSame(this.state.selectedDate, "day")
    //     ))
    // );

    return (
      <div className="time-spent-stats-container">
        <h2>Time Spent</h2>
        <select
          onChange={e => {
            console.log(`event from select: ${e.target.value}`);
            this.setState({ goal: e.target.value });
          }}
          defaultValue="all"
        >
          {options}
        </select>
        <GithubGraph
          changeState={this.changeDay}
          data={user.days}
          filter={this.state.goal}
        />
      </div>
    );
  }
}

function mapStateToProps({ areas, user }) {
  return { areas, user };
}

export default connect(mapStateToProps)(StatsTimeSpent);
