import React, { Component } from "react";

import Time from "./Time";
import "../css/Showcase.css";

export default class Showcase extends Component {
  constructor(props) {
    super(props);
    this.alterShowcase = this.alterShowcase.bind(this);
    this.addDots = this.addDots.bind(this);

    this.state = { currentDot: 0 };
  }

  componentDidMount() {
    this.addDots();

    var letterbox = document.querySelector(".showcase-letterbox");
    letterbox.addEventListener("wheel", e => {
      e.preventDefault();
      this.alterShowcase(e, "wheel");
    });

    window.addEventListener("resize", this.addDots);
  }

  addDots() {
    var dots = document.querySelectorAll(".showcase-dot");
    dots.forEach(dot => dot.remove());

    var targetContainer = document.querySelector(".target-container");
    var letterbox = document.querySelector(".showcase-letterbox");

    if (!targetContainer || !letterbox) return;
    var numbDots = Math.min(
      Math.max(
        Math.ceil(
          (targetContainer.scrollWidth - letterbox.offsetWidth) /
            letterbox.offsetWidth
        ),
        1
      ),
      6
    );
    if (this.state.currentDot >= numbDots)
      this.setState({ currentDot: numbDots - 1 });

    var container = document.querySelector(".showcase-dot-container");
    for (let i = 0; i < numbDots; i++) {
      var div = document.createElement("div");
      div.classList.add("showcase-dot");
      if (i === this.state.currentDot) div.classList.add("active-dot");
      div.setAttribute(
        "data-scroll",
        i *
          (targetContainer.scrollWidth - letterbox.offsetWidth) /
          (numbDots - 1)
      );
      div.addEventListener("click", e => {
        const { currentDot } = this.state;
        const dots = document.querySelectorAll(".showcase-dot");
        dots[currentDot].classList.remove("active-dot");
        dots[i].classList.add("active-dot");
        this.setState({ currentDot: i });
        this.alterShowcase(e, "dot");
      });
      container.appendChild(div);
    }
  }

  alterShowcase(e, origin) {
    const targetContainer = document.querySelector(".target-container");
    const letterbox = document.querySelector(".showcase-letterbox");
    var currentTransform = targetContainer.style.transform.match(/-\d+/);
    if (!currentTransform) currentTransform = 0;

    switch (origin) {
      case "right":
        targetContainer.style.transform = `translateX(${Math.max(
          +currentTransform - 100,
          -targetContainer.scrollWidth + letterbox.offsetWidth
        )}px)`;
        break;
      case "left":
        targetContainer.style.transform = `translateX(${Math.min(
          +currentTransform + 100,
          0
        )}px)`;
        break;
      case "dot":
        var place = e.target.getAttribute("data-scroll");
        return (targetContainer.style.transform = `translateX(${-place}px)`);
      case "wheel":
        var up = e.deltaY < 0;
        if (up) {
          targetContainer.style.transform = `translateX(${Math.min(
            +currentTransform + 100,
            0
          )}px)`;
        } else {
          targetContainer.style.transform = `translateX(${Math.max(
            +currentTransform - 100,
            -targetContainer.scrollWidth + letterbox.offsetWidth
          )}px)`;
        }
    }
    return this.changeActiveDot(
      targetContainer.style.transform.match(/-\d+/),
      targetContainer.scrollWidth - letterbox.offsetWidth
    );
  }

  changeActiveDot(currentTransform, containerWidth) {
    const { currentDot } = this.state;
    const dots = document.querySelectorAll(".showcase-dot");
    if (dots.length === 1) return;
    var lowerTarget = (currentDot + 1) * -containerWidth / (dots.length - 1),
      upperTarget = (currentDot - 1) * -containerWidth / (dots.length - 1);

    if (currentTransform <= lowerTarget && currentDot !== dots.length - 1) {
      dots[currentDot].classList.remove("active-dot");
      dots[currentDot + 1].classList.add("active-dot");
      this.setState({ currentDot: currentDot + 1 });
    } else if (currentTransform >= upperTarget && currentDot !== 0) {
      dots[currentDot].classList.remove("active-dot");
      dots[currentDot - 1].classList.add("active-dot");
      this.setState({ currentDot: currentDot - 1 });
    }
  }

  render() {
    var timeItems = this.props.data.map(x => <Time data={x} />);
    if (timeItems.length === 0) {
      timeItems = "No time to display";
    }
    return (
      <div className="showcase-container">
        <div
          className="showcase-controller move-left"
          onClick={e => this.alterShowcase(e, "left")}
        />
        <div
          className="showcase-controller move-right"
          onClick={e => this.alterShowcase(e, "right")}
        />
        <div className="showcase-letterbox">
          <div className="target-container">{timeItems}</div>
        </div>
        <div className="showcase-dot-container" />
      </div>
    );
  }
}
