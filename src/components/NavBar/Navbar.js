import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.png';
import "./Navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Toggle mobile menu visibility
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Close dropdown menu
  const closeDropdown = () => setDropdownOpen(false);

  // Close mobile menu
  const closeMenu = () => setMenuOpen(false);

  // Close dropdown and mobile menu if clicked outside
  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      closeDropdown();
      setMenuOpen(false);
    }
  };

  // Close dropdown and mobile menu when a link is clicked
  const handleLinkClick = () => {
    closeDropdown();
    closeMenu();
  };

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={`navbar ${menuOpen ? "active" : ""}`} ref={navbarRef}>
      <div className="navbar-logo">
        <img src={logo} alt="GloryLand Logo" className="logo-image" />EarlyBirds Schools
      </div>

      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span className="hamburger-icon">&#9776;</span>
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink
            to="/"
            onClick={handleLinkClick}  // Close menu when link is clicked
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            onClick={handleLinkClick}  // Close menu when link is clicked
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            onClick={handleLinkClick}  // Close menu when link is clicked
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Contact
          </NavLink>
        </li>
        {/* Dashboard Dropdown */}
        <li
          className="dropdown"
          onMouseLeave={closeDropdown} // Close dropdown when mouse leaves
          ref={dropdownRef}
        >
          <button className="dropdown-button" onClick={toggleDropdown}>
            Portal
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <NavLink
                  to="/studentLogin"
                  onClick={handleLinkClick}  // Close menu when link is clicked
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Student Portal
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teacher/login"
                  onClick={handleLinkClick}  // Close menu when link is clicked
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Teacher Portal
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/adminLogin"
                  onClick={handleLinkClick}  // Close menu when link is clicked
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Admin Portal
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
