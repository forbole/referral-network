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
                <a className="navbar-brand" href="/"><img className="logo" src="/img/forbole-logo-white.svg" />Forbole</a>
              </div>

              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li class="dropdown">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <img src="/img/faces/terence-lam.jpg" className="avatar img-raised"/> Terence Lam
                        <b class="caret"></b>
                      </a>
                      <ul class="dropdown-menu dropdown-with-icons">
                        <li>
                          <a href="examples/about-us.html">
                            <i class="material-icons">account_balance</i> My Profile
                          </a>
                        </li>
                        <li>
                          <a href="examples/blog-posts.html">
                            <i class="material-icons">view_quilt</i> Blog
                          </a>
                        </li>
                        <li>
                          <a href="examples/landing-page.html">
                            <i class="material-icons">view_day</i> Recommendations
                          </a>
                        </li>
                        <li>
                          <a href="examples/pricing.html">
                            <i class="material-icons">attach_money</i> Wallet
                          </a>
                        </li>
                        <li>
                          <a href="examples/product-page.html">
                            <i class="material-icons">beach_access</i> Settings
                          </a>
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
                  <li><a href="#" onClick={this.logout}><i class="material-icons">clear</i> Logout</a></li>
                </ul>
              </div>
            </div>
        </nav>
    );
  }
}

export default Header;
