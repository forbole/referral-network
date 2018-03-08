import React, { Component } from 'react';

class Header extends Component {
  // console.log(props);
  constructor(props){
      super(props);
      this.state = {
        user: props.currentUser?props.currentUser:'',
        headClass: (props.transHead)?" navbar-color-on-scroll navbar-transparent":""
      }
  }
  // 
  // componentDidMount(){
  //     if($('.navbar-color-on-scroll').length != 0){
  //         $(window).on('scroll', materialKit.checkScrollForTransparentNavbar);
  //     }
  //     else{
  //       $(window).off('scroll', materialKit.checkScrollForTransparentNavbar);
  //     }
  // }

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
                <a className="navbar-brand" href="/">Forbole</a>
              </div>

              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  {(this.state.user.profile)?
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
                  }
                  <li><a href="#" onClick={this.logout}>Logout</a></li>
                </ul>
              </div>
            </div>
        </nav>
    );
  }
}

export default Header;
