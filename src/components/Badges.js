import React, { Component } from "react";
import { connect } from "react-redux";

import BadgeItem from "./BadgeItem";

class Badges extends Component {
  render() {
    var { badges } = this.props;

    badges = badges.map(category => {
      var badgeItems = category.badges.map(badge => {
        <BadgeItem badgeInfo={badge} />;
      });

      return (
        <div key={category.category} className="all-badges-row">
          <h4>{category.category}</h4>
          {badgeItems}
        </div>
      );
    });
    return (
      <div className="badges-container grid">
        <h3>Awards</h3>
        <div className="top-badges grid">
          //in here will be best badges on display
        </div>
        <div className="all-badges grid">
          //4 columns
          <div className="all-badges-header">
            <h4>Bronze</h4>
            <h4>Silver</h4>
            <h4>Gold</h4>
          </div>
          <div className="all-badges-main-display">{badges}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ badges }) {
  return { badges };
}

export default connect(mapStateToProps)(Badges);
