import React, { Component } from "react";

export default class GoalsPreview extends Component {
  render() {
    return (
      <section className="goals-preview">
        <ul>
          <li>
            <p>Goal 1</p>
            <div className="goal-item achieved" />
          </li>
        </ul>
      </section>
    );
  }
}
