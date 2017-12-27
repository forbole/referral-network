import React, { Component } from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-primary navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Forbole</a>
            </div>

        </div>
      </nav>
  );
}

export default Header;
