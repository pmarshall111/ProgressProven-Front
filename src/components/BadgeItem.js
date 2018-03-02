import React, { Component } from "react";

export default class BadgeItem extends Component {
  render() {
    var {
      points,
      title,
      userCompletions,
      percentageUnlocked,
      distance,
      description,
      lastCompleted
    } = this.props;

    distance = 100 - distance;

    return (
      <div className="badge-item grid">
        <div className="badge-item-header">
          <div className="badge-item-title">
            {title}-{points}
          </div>
          <div className="badge-item-completed">x{userCompletions}</div>
        </div>
        <div className="badge-svg" />
        <div className="badge-item-info grid">
          <div className="badge-item-progress">
            <div
              className="badge-item-progress-bar"
              style={{ transform: "translateX(-{ distance })" }}
            />
          </div>
          <div className="badge-item-slideshow">
            <div className="badge-item-description">{description}</div>
            <div className="badge-item-last-earned">
              Last earned: {lastCompleted}
            </div>
            <div className="badge-item-unlocked-by">
              Unlocked by: {percentageUnlocked}%
            </div>
          </div>
        </div>
      </div>
    );
  }
}
