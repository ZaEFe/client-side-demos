import React from "react";
import { Link } from "react-router-dom"; // Ensure react-router is installed
import '../../styles/bootstrap.scss'
import * as bootstrap from 'bootstrap'


const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/clock">Project 1: Clock</Link>
      <Link to="/project-2">Project 2: Date Button</Link>
      <Link to="/react">React Project: Animals List</Link>
      <Link to="/todo">To Do List Project</Link>
    </nav>
  );
};

export default Navbar;

