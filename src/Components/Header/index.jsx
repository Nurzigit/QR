import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__logo">
          <li>
            <NavLink
              to="/list"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              Logo
            </NavLink>
          </li>
        </div>
        <div className="header__links">
          <li>
          <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              Home
            </NavLink>
          </li>
          <li>
          <NavLink
              to="/list"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              List
            </NavLink>
          </li>
          <li>
          <NavLink
              to="/scanner"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              Scanner
            </NavLink>
          </li>
        </div>
      </header>
    </>
  );
};

export default Header;
