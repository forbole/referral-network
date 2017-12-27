import React, { Component } from 'react';

const Footer = () => {
  let year = new Date().getFullYear();
  if (year != '2017'){
    year = '2017-'+year;
  }

  return (
    <footer className="footer">
        <div className="container">
            <nav className="pull-left">
        <ul>
          <li>
            <a href="#">
              Creative Tim
            </a>
          </li>
          <li>
            <a href="#">
               About Us
            </a>
          </li>
          <li>
            <a href="#">
               Blog
            </a>
          </li>
          <li>
            <a href="#">
              Licenses
            </a>
          </li>
        </ul>
            </nav>
            <div className="copyright pull-right">
                &copy; {year}, made with <i className="fa fa-heart heart"></i> by Forbole Limited.
            </div>
        </div>
    </footer>
  );
}

export default Footer;
