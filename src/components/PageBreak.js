import React from "react";

import "../css/PageBreak.css";

const PageBreak = props => {
  return (
    <div className="page-break grid">
      <h2>{props.title}</h2>
    </div>
  );
};

export default PageBreak;
