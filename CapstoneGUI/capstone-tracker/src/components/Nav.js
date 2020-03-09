import React, { Component } from "react";
import { Link } from "react-router-dom";

const Nav = props => {
  const onHandleLogout = () => {
    localStorage.clear();
  };

  return (
    <nav>
      {localStorage.getItem("info") ? (
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
          <li>
            <Link onClick={onHandleLogout} to="/">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Nav;
