import React from "react";
import "../../styles/header.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Header = () => {
  return (
    <div className="HeaderContainer">
      <Logo />
    </div>
  );
};

export default Header;
