import React from "react";
import "./Header.css";
import logo from "../assets/logo_with_name.svg";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="header_wrapper">
      <div className="header_logo_container">
        <NavLink to={"/"} className={"logo"}>
          <img src={logo} className="header_logo_image" alt="Company logo" />
        </NavLink>
      </div>
    </div>
  );
};
