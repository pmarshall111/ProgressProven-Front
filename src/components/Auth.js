import React, { Component } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import "../css/Auth.css";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.toggleSignUpIn = this.toggleSignUpIn.bind(this);
  }

  toggleSignUpIn(e, onClass, offClass) {
    var rotatingCard = document.querySelector(".rotate");
    var on = document.querySelector(onClass);
    var off = document.querySelector(offClass);

    if (off.classList.contains("inactive")) return;

    off.style["transition-timing-function"] = "ease-in";
    on.style["transition-timing-function"] = "ease-out";
    off.classList.add("inactive");
    off.addEventListener("transitionend", changeActive);

    function changeActive(e) {
      on.classList.remove("inactive");
      off.removeEventListener("transitionend", changeActive);
    }

    //to rotate in different directions
    // var transformVal =
    //   on.textContent === "Sign in"
    //     ? "translateZ(-300px) rotateY(180deg)"
    //     : "translateZ(-300px)";

    //to rotate in same direction
    var currentRotation = rotatingCard.style.transform;

    console.log(currentRotation);
    var transformVal;

    if (currentRotation === "")
      transformVal = "translateZ(-300px) rotateY(179deg)";
    else {
      var currentRotationDeg = +currentRotation.match(/\d+/g)[1];

      transformVal = `translateZ(-300px) rotateY(${currentRotationDeg +
        180}deg)`;
    }

    rotatingCard.style.transform = transformVal;
  }

  render() {
    return (
      <section className="auth-container">
        <div className="toggle-container">
          <div className="toggle">
            <h3
              className="sign-up-text auth-text"
              onClick={e =>
                this.toggleSignUpIn(e, ".sign-up-text", ".sign-in-text")
              }
            >
              Sign up
            </h3>
          </div>
          <div className="toggle">
            <h3
              className="sign-in-text auth-text inactive"
              onClick={e =>
                this.toggleSignUpIn(e, ".sign-in-text", ".sign-up-text")
              }
            >
              Sign in
            </h3>
          </div>
        </div>

        <div className="spinner-container">
          <div className="rotate">
            <figure className="right">3</figure>
            <figure className="left">4</figure>
            <SignIn />
            <SignUp />
          </div>
        </div>
      </section>
    );
  }
}
