import React, { Component } from "react";

import Showcase from "./Showcase";
import "../css/Targets.css";

export default class TargetCollection extends Component {
  render() {
    return (
      <div className="target-collection-container">
        <div className="target-collection-header">
          <h3>Hours per Timeperiod</h3>
          <div className="target-collection-info">
            <label className="toggle-switch">
              Active
              <input type="checkbox" />
              <span className="toggle-slider" />
            </label>
            <label className="toggle-switch">
              Renews each week
              <input type="checkbox" />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>

        <Showcase />
      </div>
    );
  }
}
