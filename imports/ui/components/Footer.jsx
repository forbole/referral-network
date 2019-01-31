import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  let year = new Date().getFullYear();
  if (year != '2019'){
    year = '2019-'+year;
  }
  
  let path = "";

  if (props.match && props.match.path){
    path = props.match.path;
  }

  return (
    <footer className="footer">
        <div className="container hidden-xs">
            <nav className="pull-left">
              <ul>
                <li>
                  <a href="https://www.forbole.com" target="_blank">About Us</a>
                </li>
                <li>
                  <a href="https://www.forbole.com/#contact" target="_blank">Contact Us</a>
                </li>
                <li>
                  <a href="https://medium.com/forbole/" target="_blank">Blog</a>
                </li>
                <li>
                  <a href="https://www.forbole.com/privacy-policy/" target="_blank">Privacy Policy</a>
                </li>
              </ul>
            </nav>
            <div className="copyright pull-right">
                &copy; {year}, made with <i className="fa fa-heart heart"></i> by Forbole Limited.
            </div>
            <div className="motto">Don't trust. Verify.</div>
        </div>
        {Meteor.userId()?
        <nav className="navbar navbar-default navbar-fixed-bottom visible-xs-block mobile-menu">
          <ul className="nav navbar-nav">
            <li className={(path == '/')?"active":""}><Link to="/"><i className="material-icons">home</i></Link></li>
            <li className={(path == '/connections')?"active":""}><Link to="/connections"><i className="material-icons">people</i></Link></li>
            <li className={(path == '/@:username/contributions')?"active":""}><Link to={"/@"+Meteor.user().username+"/contributions"}><i className="material-icons">fingerprint</i></Link></li>
            <li className={(path == '/@:username?')?"active":""}><Link to={"/@"+Meteor.user().username}><i className="material-icons">face</i></Link></li>
            <li className={(path == '/settings')?"active":""}><Link to="/settings"><i className="material-icons">settings</i></Link></li>
          </ul>
        </nav>:''}
    </footer>
  );
}

export default Footer;
