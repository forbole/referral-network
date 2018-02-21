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
            		<ul className="nav navbar-nav navbar-right">
                  {(this.state.user)?
                  <li>
                    <a href="#">Hello, {this.state.user}</a>
                  </li>:
                  <>
                    <li>
                      <a href="/login">Sign In</a>
                    </li>
                    <li className="button-container">
                      <a href="/signup" className="btn btn-white btn-round">
            							<i className="material-icons">shopping_cart</i> Register
            					</a>
                    </li></>}
        		    </ul>
              </div>
            </div>
        </nav>
    );
  }
}

export default Header;
