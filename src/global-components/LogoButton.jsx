import React from "react";

const LogoButton = ({ children, title, onClick }) => {
  return (
    <div className="custom-button dflex" onClick={onClick}>
      {children}
      <span className="ml-15">{title}</span>
    </div>
  );
};

export default LogoButton;
