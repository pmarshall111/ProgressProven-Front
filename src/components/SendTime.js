import React, { Component } from "react";
import { connect } from "react-redux";

import SendTimeForm from "./forms/SendTimeForm";
import Banner from "./Banner";

import "../css/SendTime.css";

class SendTime extends Component {
  render() {
    const { user, playing, time } = this.props;
    var { stopwatchTime } = playing;

    //testing
    var goals = ["shopping", "hula hoops"],
      tags = ["xD, loool"];
    // var goals = user.improvementAreas.map(x => x.subject);
    // var { tags } = user;
    return (
      <div
        className="send-time-container"
        style={{ opacity: 0, display: "none" }}
      >
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
          onSubmit={() => {}}
          goals={goals}
          tags={tags}
          stopwatchTime={stopwatchTime}
        />
      </div>
    );
  }
}

function mapStateToProps({ user, time, playing }) {
  return { user, time, playing };
}

export default connect(mapStateToProps)(SendTime);
