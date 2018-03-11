import React, { Component } from 'react';

import About from '/imports/ui/pages/profile/About.jsx';
import Blog from '/imports/ui/pages/profile/Blog.jsx';
import Wallet from '/imports/ui/pages/profile/Wallet.jsx';
import Recommendations from '/imports/ui/pages/profile/Recommendations.jsx';

class Profile extends Component {
  render() {
    let headerBg = {
      backgroundImage:'url(/img/kwun-profile-header.jpg)',
      backgroundPosition: 'center center'
    };

    return (
      <div className="profile-page">

        <div className="page-header header-filter" data-parallax="true" style={headerBg}>
        </div>

        <div className="main main-raised">
          <div className="profile-content">
            <div className="container">

              <div className="row">
                <div className="col-xs-6 col-xs-offset-3">
                   <div className="profile">
                        <div className="avatar">
                            <img src="/img/faces/kwun-profile.jpg" className="img-circle img-responsive img-raised"/>
                        </div>
                        <div className="name">
                            <h3 className="title">Kwun Yeung</h3>
                            <h6>Co-founder &amp; Coductor of Forbole</h6>
                        </div>
                    </div>
                  </div>
                  <div className="col-xs-2 follow">
	                   <a href="/recommend" className="btn btn-fab btn-primary" rel="tooltip" title="Recommend Kwun">
                            <i className="material-icons">add</i>
                        </a>
	                </div>
              </div>

              <div className="card card-nav-tabs card-plain">
                <div className="header header-danger">
                  <div className="nav-tabs-navigation">
                    <div className="nav-tabs-wrapper">
                      <ul className="nav nav-tabs" data-tabs="tabs">
                        <li className="active col-md-3 text-center"><a href="#about" data-toggle="tab">Bio</a></li>
                          <li className="col-md-3 text-center"><a href="#blog" data-toggle="tab">Blog</a></li>
                        <li className="col-md-3 text-center"><a href="#recommendations" data-toggle="tab">Recommendations</a></li>
                        <li className="col-md-3 text-center"><a href="#wallet" data-toggle="tab">Wallet</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <div className="tab-content">
                    <About />
                    <Blog />
                    <Recommendations />
                    <Wallet />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Profile;
