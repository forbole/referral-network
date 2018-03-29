import React, { Component } from 'react';

const Footer = () => {
  let year = new Date().getFullYear();
  if (year != '2018'){
    year = '2018-'+year;
  }

  return (
    <footer className="footer">
        <div className="container">
            <nav className="pull-left">
        <ul>
          <li>
            <a href="https://www.forbole.com" target="_blank">About Us</a>
          </li>
          <li>
            <a href="https://www.forbole.com/#contact" target="_blank">Contact Us</a>
          </li>
          <li>
            <a href="https://www.forbole.com/blog/" target="_blank">Blog</a>
          </li>
          <li>
            <a href="https://www.forbole.com/privacy-policy/" target="_blank">Privacy Policy</a>
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
