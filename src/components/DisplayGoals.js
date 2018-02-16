import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import TargetCollection from "./TargetCollection";

class DisplayGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGoal: null
    };
  }

  render() {
    //needs access to user data to display goals.
    const title = this.props.active ? "Active Goals" : "Previous Goals";
    var userGoals = [
      {
        title: "Cooking",
        targetCollection: [
          {
            period: 1,
            startDate: new Date(70000),
            repeating: true,
            targetHistory: [
              { start: 1, end: 2, targetTime: 5, currentTime: 5.1 },
              { start: 3, end: 4, targetTime: 5, currentTime: 4.1 }
            ]
          }
        ]
      },
      { title: "Walking Toby" },
      { title: "Web dev" }
    ];

    const goals = userGoals.map(x => {
      return <div>{x.title}</div>;
    });

    var currentGoal = userGoals[0];
    if (this.state.activeGoal) {
      currentGoal = this.state.activeGoal;
    }

    console.log(currentGoal);

    var collections = currentGoal.targetCollection.map(collection => {
      return <TargetCollection targets={collection.targetHistory} />;
    });

    return (
      <div>
        <div className="goals-header">
          <h2>{title}</h2>
          {this.props.active && (
            <Link to="/goals/new">
              <button>Add new</button>
            </Link>
          )}
        </div>
        <div className="goals-list">{goals}</div>
        <div>{collections}</div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(DisplayGoals);
