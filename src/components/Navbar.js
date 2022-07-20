import React, { useState } from "react";  // used command 'rfc'
import PropTypes from 'prop-types'; //used command 'impt'
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const [tab, setTab] = useState('home');

  if (tab === 'home') {
    document.title = 'TextUtils - Home';
  }
  else if (tab === 'about') {
    document.title = 'TextUtils - About';
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" onClick={() => { setTab('home') }} to="/">{props.title}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${tab === 'home' ? 'active' : ''}`} aria-current="page" onClick={() => { setTab('home') }} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${tab === 'about' ? 'active' : ''}`} onClick={() => { setTab('about') }} to="/about">{props.aboutText}</Link>
            </li>
          </ul>
          <div>
            <button type="button" onClick={()=> props.toggleMode('primary')} className="btn mx-1 btn-primary">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('secondary')} className="btn mx-1 btn-secondary">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('success')} className="btn mx-1 btn-success">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('danger')} className="btn mx-1 btn-danger">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('warning')} className="btn mx-1 btn-warning">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('info')} className="btn mx-1 btn-info">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('light')} className="btn mx-1 btn-light">&nbsp;</button>
            <button type="button" onClick={()=> props.toggleMode('dark')} className="btn mx-1 btn-dark">&nbsp;</button>
          </div>
          {/* <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
          </div> */}
        </div>

      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string
}
Navbar.defaultProps = {
  title: 'Title',
  aboutText: 'About'
};