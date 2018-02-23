import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Showcase from "./Showcase";
import Targets from "./Targets";

class DisplayGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGoal: null
    };
  }

  render() {
    //needs access to user data to display goals.
    console.log(this.props);

    var userGoals = [
      {
        subject: "Cooking",
        targets: [],
        time: []
      },
      { subject: "Walking Toby" },
      { subject: "Web dev" }
    ];

    if (this.props.user) {
      userGoals = this.props.user.improvementAreas;
    }

    console.log(userGoals);

    const goals = userGoals.map(x => {
      return <div>{x.subject}</div>;
    });

    var currentGoal = userGoals[0];
    if (this.state.activeGoal) {
      currentGoal = this.state.activeGoal;
    }

    //need to calculate completion percentage etc in Target component
    var targetItems = currentGoal.targets.map(x => (
      <Targets data={x} time={currentGoal.time} />
    ));

    return (
      <div>
        <div className="goals-header">
          <h2>Areas of Improvement</h2>
          <Link to="/home/goals/new">
            <button>Add new</button>
          </Link>
        </div>
        <div className="goals-list">{goals}</div>
        <Showcase data={currentGoal.time} />
        <div className="target-group-container">{targetItems}</div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(DisplayGoals);
