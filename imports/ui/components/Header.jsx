import React, { Component } from 'react';

class Header extends Component {
  // console.log(props);
  constructor(props){
      super(props);
      this.state = {
        user: props.currentUser?props.currentUser:''
      }
  }

  render(){
    return (
      <nav className="navbar navbar-primary navbar-fixed-top">
          <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">Forbole</a>
              </div>

              <div className="collapse navbar-collapse">
                  {(this.state.user.profile)?
                    <ul className="nav navbar-nav navbar-right">
                      <li>
                        <a href="#">Hello, {this.state.user.profile.name}</a>
                      </li>
                    </ul>
                  : [
                      (this.state.user.emails? 
                        <ul className="nav navbar-nav navbar-right">
                          <li>
                            <a href="#">Hello, {this.state.user.emails[0].address}</a>
                          </li>
                        </ul>
                      : 
                        <ul className="nav navbar-nav navbar-right">
                          <li>
                            <a href="/login">Sign In</a>
                          </li>
                          <li className="button-container">
                            <a href="/signup" className="btn btn-white btn-round">
                              <i className="material-icons">shopping_cart</i> Register
                           </a>
                          </li>
                        </ul>
                      ),
                    ]
                  }
              </div>
            </div>
        </nav>
    );
  }
}

export default Header;
