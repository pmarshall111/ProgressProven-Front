import React, { Component } from "react";
import { connect } from "react-redux";

import Stopwatch from "./Stopwatch";

import { togglePlay, timeStartActionCreator } from "../actions/time";

import "../css/StartWork.css";

class StartWork extends Component {
  render() {
    var { playing, togglePlay, timeStartActionCreator } = this.props;
    if (!playing.playing && playing.stopwatchTime == 0) {
      //we need to return start screen
      return (
        <section
          className="start-work"
          onClick={() => {
            togglePlay(true);
            timeStartActionCreator(new Date());
          }}
        >
          <h2>Start Work!</h2>
        </section>
      );
    }

    return (
      <section className="start-work">
        <Stopwatch />
      </section>
    );
  }
}

function mapStateToProps({ playing }) {
  return { playing };
}

export default connect(mapStateToProps, {
  togglePlay,
  timeStartActionCreator
})(StartWork);
