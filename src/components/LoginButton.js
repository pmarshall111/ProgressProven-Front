import React from "react";

import "../css/LoginButton.css";

const LoginButton = props => {
  const classHelper = props.company.toLowerCase();
  return (
    <button className={`oauth ${classHelper}-oauth`}>
      {props.type} with {props.company}
    </button>
  );
};

export default LoginButton;
