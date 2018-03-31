import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Header extends Component {
  // console.log(props);
  constructor(props){
      super(props);
      this.state = {
        user: props.currentUser?props.currentUser:'',
        headClass: (props.transHead)?" navbar-color-on-scroll navbar-transparent":""
      }
  }

  componentDidMount(){
      if($('.navbar-color-on-scroll').length != 0){
          $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);
      }
      else{
        $(window).off('scroll', materialKit.checkScrollForTransparentNavbar);
      }
  }

  logout(){
    Meteor.logout();
  }

  render(){
    return (
      <nav className={"navbar navbar-primary navbar-fixed-top"+this.state.headClass} color-on-scroll="350">
          <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link className="navbar-brand" to="/"><img className="logo" src="/img/forbole-logo-white.svg" />Forbole</Link>
              </div>

              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <Link to="#" className="dropdown-toggle profile-link" data-toggle="dropdown">
                        <img src={Meteor.user().profile.picture} className="avatar img-raised"/> {Meteor.user().profile.name}
                        <b className="caret"></b>
                      </Link>
                      <ul className="dropdown-menu dropdown-with-icons">
                        <li>
                          <Link to={"/@"+Meteor.user().username}>
                            <i className="material-icons">account_balance</i> My Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/connections">
                            <i className="material-icons">device_hub</i> Connections
                          </Link>
                        </li>
                        {/*
                        <li>
                          <Link to="/blog/">
                            <i className="material-icons">view_quilt</i> Blog
                          </Link>
                        </li>
                        <li>
                          <Link to="/recommendation/">
                            <i className="material-icons">view_day</i> Recommendations
                          </Link>
                        </li>
                        <li>
                          <Link to="/wallet/">
                            <i className="material-icons">attach_money</i> Wallet
                          </Link>
                        </li>
                        <li>
                          <Link to="/settings/">
                            <i className="material-icons">beach_access</i> Settings
                          </Link>
                        </li>
                        */}
                        <li>
                          <Link to="#" onClick={this.logout}>
                            <i className="material-icons">clear</i> Logout
                          </Link>
                        </li>
                      </ul>
                    </li>

                  {/*(this.state.user.profile)?
                      <li>
                        <a href="/profile">Hello, {this.state.user.profile.name}</a>
                      </li>
                  : [
                      (this.state.user.emails?
                          <li>
                            <a href="/profile">Hello, {this.state.user.emails[0].address}</a>
                          </li>
                      : <></>

                      ),
                    ]
                  */}

                </ul>
              </div>
            </div>
        </nav>
    );
  }
}

export default Header;
