import React from "react";

import { ROOT_URL } from "../actions";
import { connect } from "react-redux";
import "../css/LoginButton.css";

const LoginButton = props => {
  const classHelper = props.company.toLowerCase();
  return (
    <a
      className={`oauth ${classHelper}-oauth`}
      href={`${ROOT_URL}/auth/google`}
    >
      {props.type} with {props.company}
    </a>
  );
};

export default LoginButton;
