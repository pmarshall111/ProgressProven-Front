import React, { Component } from "react";

import "../css/Goals.css";

export default class GoalsPreview extends Component {
  render() {
    return (
      <section className="goals-preview-container">
        <div className="goals-preview">
          <ul>
            <li className="goal-item">
              <p>Goal 1</p>
              <div className="goal-achieved achieved" />
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
