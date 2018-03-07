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

  createPoints() {
    this.points = [];
    const { detailedTime } = this.props;
    console.log(this.props);
    var cumHours = 0;
    var indivCumHours = {};
    //we want time start plus hours at that point.
    detailedTime.forEach(time => {
      var { timeStarted, timeFinished, totalHours, goal } = time;
      if (!indivCumHours[goal.subject]) indivCumHours[goal.subject] = 0;
      this.points.push({
        time: timeStarted,
        goal,
        hours: cumHours,
        goalHours: indivCumHours[goal.subject]
      });
      cumHours += totalHours;
      indivCumHours[goal.subject] += totalHours;
      this.points.push({
        time: timeFinished,
        goal,
        hours: cumHours,
        goalHours: indivCumHours[goal.subject]
      });
    });

    this.indivCumHours = indivCumHours;

    this.points.sort((a, b) => {
      if (a.time > b.time) return 1;
      return -1;
    });
  }

  render() {
    const { user, detailedTime } = this.props;
    console.log({ user, detailedTime });
    if (!user || !detailedTime.length) return <div />;
    this.createPoints();

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

    console.log(this.points);

    var allTimeData =
      this.state.goal == "all"
        ? this.points
        : this.points.filter(x => x.goal.subject == this.state.goal);

    if (moment(this.points[0].time).isBefore(allTimeData[0].time)) {
      allTimeData.unshift({
        time: this.points[0].time,
        goal: { subject: this.state.goal },
        goalHours: 0
      });
    }
    if (
      moment()
        .startOf("day")
        .isAfter(allTimeData[allTimeData.length - 1].time)
    ) {
      if (this.state.goal === "all") {
        var goals = user.improvementAreas.map(x => x.subject);
        for (let i = 0; i < goals.length; i++) {
          allTimeData.push({
            time: moment(),
            goal: { subject: goals[i] },
            goalHours: this.indivCumHours[goals[i]],
            hours: allTimeData[allTimeData.length - 1].hours
          });
        }
      } else
        allTimeData.push({
          time: moment(),
          goal: { subject: this.state.goal },
          goalHours: this.indivCumHours[this.state.goal],
          hours: allTimeData[allTimeData.length - 1].hours
        });
    }

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

        <LineGraph
          goals={user.improvementAreas.map(x => x.subject)}
          times={allTimeData}
          period="all-time"
          filter={this.state.goal}
        />
      </div>
    );
  }
}

// <GithubGraph
//   changeState={this.changeDay}
//   data={user.days}
//   filter={this.state.goal}
// />

function mapStateToProps({ detailedTime, user }) {
  return { detailedTime, user };
}

export default connect(mapStateToProps)(StatsTimeSpent);
