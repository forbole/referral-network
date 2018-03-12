import React, { Component } from 'react';

const Header = () => {
    return (
      <nav className="navbar navbar-primary navbar-transparent navbar-absolute">
          <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/"><img className="logo" src="/img/forbole-logo-white.svg" />Forbole</a>
              </div>

              <div className="collapse navbar-collapse">
            		<ul className="nav navbar-nav navbar-right">
                  <li>
                    <a href="/login">Sign In</a>
                  </li>
                  <li className="button-container">
                    <a href="/signup" className="btn btn-white btn-round">
          							<i className="material-icons">power_settings_new</i> Register
          					</a>
                  </li>
        		    </ul>
              </div>
            </div>
        </nav>
    );
}

export default Header;
