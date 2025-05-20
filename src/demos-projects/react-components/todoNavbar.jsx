import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid d-flex justify-content-between">
        {/* Left Side: Home + Hamburger */}
        <div className="d-flex align-items-center">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand d-lg-none ms-2" href="../../">Home Page</a>
        </div>

        {/* Centered Navigation (Only visible when expanded) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="../../">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../about/">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../clock/">Clock</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../project-2/">Date Button</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../react/">React: Animal List</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../todo/">To Do List</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="../simple_fetch/">Simple Fetch API</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="../local_fetch/">Local Fetch API</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="../jeopardy_app/">Jeopardy App</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="../resume/">Resume</a>
            </li>
          </ul>
        </div>

        {/* Logo on the Right */}
        <a className="navbar-brand ms-auto" href="./">
          <img src="/client-side-demos/logo.svg" alt="Logo" width="30" height="24" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

