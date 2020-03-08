import React, { Component } from "react";
import { Link } from "react-router-dom";

const Nav = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/currentDay">Current Day</Link>
        </li>
        <li>
          <Link to="/previousDays">Previous Days</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
