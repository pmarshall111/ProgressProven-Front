import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import SendTime from "./SendTime";

import {
  togglePlay,
  timeStartActionCreator,
  timePauseActionCreator,
  timePlayActionCreator,
  timeChangeDayActionCreator,
  timeFinishActionCreator
} from "../actions/time";

class Stopwatch extends Component {
  render() {
    var {
      playing,
      timeChangeDayActionCreator,
      togglePlay,
      timePlayActionCreator,
      timePauseActionCreator
    } = this.props;
    console.log(playing);
    console.log(playing.stopwatchTime);
    if (!playing.stopwatchTime)
      playing.stopwatchTime = { hour: 0, minute: 0, second: 0 };
    var { hour, minute, second } = playing.stopwatchTime;

    console.log(hour, minute, second);

    var time = moment()
      .hour(hour)
      .minute(minute)
      .second(second);
    console.log(time);

    this.interval = setInterval(() => {
      console.log(this.props.playing.playing);
      if (this.props.playing.playing) {
        time.second(time.second() + 1);
        document.querySelector(".stopwatch").textContent = time.format(
          "HH : mm : ss"
        );
      } else {
        console.log(this);
        clearInterval(this.interval);
      }
    }, 1000);

    const removeInterval = () => {
      const { playing, togglePlay } = this.props;
      if (playing.playing) clearInterval(this.interval);
      togglePlay(!playing.playing, {
        hour: time.hour(),
        minute: time.minute(),
        second: time.second()
      });
    };

    return (
      <div className="stopwatch-container">
        <div className="stopwatch">{time.format("HH : mm : ss")}</div>
        <div className="stopwatch-controls">
          <button
            onClick={() => {
              // if (this.props.playing.playing) clearInterval(this.interval);
              // togglePlay(!playing.playing, {
              //   hour: time.hour(),
              //   minute: time.minute(),
              //   second: time.second()
              // });
              removeInterval();
              playing
                ? timePauseActionCreator(new Date())
                : timePlayActionCreator(new Date());
            }}
          >
            {this.props.playing.playing ? "Pause" : "Play"}
          </button>
          <button
            onClick={() => {
              // if (this.props.playing.playing) clearInterval(this.interval);
              // togglePlay(!playing.playing, {
              //   hour: time.hour(),
              //   minute: time.minute(),
              //   second: time.second()
              // });
              removeInterval();
              timePauseActionCreator(new Date());
              var sendTime = document.querySelector(".send-time-container");
              sendTime.style.opacity = 1;
              sendTime.style.display = "block";
            }}
          >
            Finish
          </button>
        </div>
        <SendTime />
      </div>
    );
  }
}

function mapStateToProps({ playing, time }) {
  return { playing, time };
}

export default connect(mapStateToProps, {
  togglePlay,
  timePauseActionCreator,
  timePlayActionCreator,
  timeChangeDayActionCreator,
  timeFinishActionCreator
})(Stopwatch);
