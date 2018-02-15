import React, { Component } from "react";

import HowItWorksContent from "./HowItWorksContent";

import "../css/HowItWorks.css";

export default class HowItWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.autoChangeTabs = this.autoChangeTabs.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }

  handleScroll(e) {
    var scroll = document.documentElement.scrollTop;
    if (scroll > 200) {
      document.removeEventListener("scroll", this.handleScroll);
      const steps = document.querySelectorAll(".step");
      steps[0].classList.add("active-step");
      console.log(this);
      this.autoChangeTabs();
    }
  }

  timeout = undefined;

  autoChangeTabs() {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      var nextStep = (this.state.step + 1) % 4;
      this.changeClasses(this.state.step, nextStep);
    }, 10000);
  }

  changeClasses(remove, add) {
    const steps = document.querySelectorAll(".step");

    steps[remove].classList.remove("active-step");

    steps[add].classList.add("active-step");

    this.setState({ step: add });
    this.autoChangeTabs();
  }

  handleClick(e) {
    const steps = document.querySelectorAll(".step");
    const number = e.target.classList.toString().match(/\d+/) - 1;
    if (number === this.state.step) return;

    this.changeClasses(this.state.step, number);
  }

  render() {
    return (
      <div>
        <section className="howitworks-content-container grid">
          <HowItWorksContent step={this.state.step} />
          <div className="step-1 step" onClick={this.handleClick}>
            1
          </div>
          <div className="step-2 step" onClick={this.handleClick}>
            2
          </div>
          <div className="step-3 step" onClick={this.handleClick}>
            3
          </div>
          <div className="step-4 step" onClick={this.handleClick}>
            4
          </div>
        </section>
      </div>
    );
  }
}
