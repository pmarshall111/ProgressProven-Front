import React from "react";

const HowItWorksContent = props => {
  var title, content;
  switch (props.step) {
    case 0:
      title = "Create A Goal";
      content =
        "Think of something you've always wanted to do. Perhaps you already have something in mind. Add your goal to ProgressProven and we can help you to achieve your goal by congratulating you when it's going well and picking you up when it's not.";
      break;
    case 1:
      title = "Start Working Towards It";
      content =
        "Use ProgressProven to record the time your spend working towards your goals and let you know when you've hit your studying targets.";
      break;
    case 2:
      title = "Earn Badges Based On Your Achievements";
      content =
        "Work hard and we'll give you a pat on the back! Complete your targets and earn badges of varying difficulties.";
      break;
    case 3:
      title = "Look Back At Your Hard Work With Pride";
      content =
        "Using ProgressProven over time means we can show you how much time you've spent improving yourself and help you identify what times you work best and if you're slacking.";
      break;
  }

  return (
    <div className="howitworks-content grid">
      <div className="steps-svg-container grid">
        <svg />
      </div>
      <div className="steps-text-container grid">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default HowItWorksContent;
