import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Navbar.css"; // Import CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Chaintask</h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
