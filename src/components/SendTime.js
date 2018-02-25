import React, { Component } from "react";
import { connect } from "react-redux";

import { timeFinishActionCreator } from "../actions/time";

import SendTimeForm from "./forms/SendTimeForm";
import Banner from "./Banner";

import "../css/SendTime.css";

class SendTime extends Component {
  render() {
    window.tags = [];
    const { user, time } = this.props;

    //testing
    // var goals = ["shopping", "hula hoops"],
    //   tags = ["xD", "loool"];
    // var styleObj = { opacity: 1, display: "block" };
    var goals = user.improvementAreas.map(x => x.subject);
    var { tags } = user;
    var styleObj = { opacity: 0, display: "none" };

    var stopwatchDOM = document.querySelector(".stopwatch");
    return (
      <div className="send-time-container grid" style={styleObj}>
        <div className="banner">
          <h2>Nice Work!</h2>
          <button
            onClick={() => {
              var sendTime = document.querySelector(".send-time-container");
              sendTime.style.opacity = 0;
              sendTime.style.display = "block";
            }}
          >
            X
          </button>
        </div>
        <SendTimeForm
          onSubmit={vals => {
            console.log(vals);
            vals.tags = window.tags;

            var goal = user.improvementAreas.filter(
              x => x.subject == vals.goal
            );
            vals.goalId = goal[0]._id;
            console.log(user.improvementAreas, goal, vals.goal);

            vals.mood = ["hmpfff", "okay", "great"].indexOf(vals.mood) + 1;

            console.log(vals);
            this.props.timeFinishActionCreator(
              vals,
              this.props.time,
              this.props.finishStamp
            );
          }}
          goals={goals}
          tags={tags}
          stopwatchTime={stopwatchDOM ? stopwatchDOM.textContent : "00:00:00"}
        />
      </div>
    );
  }
}

function mapStateToProps({ user, time }) {
  return { user, time };
}

export default connect(mapStateToProps, { timeFinishActionCreator })(SendTime);
