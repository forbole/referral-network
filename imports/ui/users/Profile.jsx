import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { ProfileUserControl } from '/imports/ui/components/ForboleComponents.jsx';
import RecommendationList from '/imports/ui/users/RecommendationList.jsx';
import Skills from '/imports/ui/users/Skills.jsx';
import BlogList from '/imports/ui/users/BlogList.jsx';

// import Blog from '/imports/ui/pages/profile/Blog.jsx';
// import Wallet from '/imports/ui/pages/profile/Wallet.jsx';
// import Recommendations from '/imports/ui/pages/profile/Recommendations.jsx';

class Profile extends Component {
  constructor(props){
    console.log(props);
    super(props);
    this.state = {
      activeMenu: 0
    }
  }

  componentDidUpdate(prevProps, prevState){
    // console.log(this.props);
    if (this.props != prevProps){
      this.setState({recos: this.props.recos});
      //    Activate bootstrap-select
      if ($(".selectpicker").length != 0) {
        $(".selectpicker").selectpicker();
      }
    }
  }

  handleMenu = (index) => this.setState({activeMenu:index});

  render() {
    if (this.props.loading){
      return (<div>Loading... </div>);
    }
    else {
    if (!this.props.userExists){
      if (Meteor.userId()){
        return (<div>No user found.</div>)
      }
      else{
        return (<Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />)
      }
    }
    else {
      let headerBg = {
        backgroundImage:'url('+this.props.user.coverPic()+')',
        backgroundPosition: 'center center'
      };

      return (
        <div className="profile-page">

          <div className="page-header header-filter" data-parallax="true" style={headerBg}>
          </div>

          <div className="main">
            <div className="profile-content container">

              <ProfileUserControl
                picture={this.props.user.profilePic()}
                name={this.props.user.profile.name}
                username={this.props.user.username}
                userId={this.props.user._id}
                headline={this.props.user.profile.headline}
                position={this.props.user.profile.position}
                location={this.props.user.profile.location}
                connections={100}
                scores={20000}
              />
               <nav>
                <ul className="nav nav-tabs">
                  <li role="presentation" index={0} className={(this.state.activeMenu === 0) ? "active":''}><Link to={"/@"+this.props.match.params.username} onClick={this.handleMenu.bind(this,0)}>Recommendation</Link></li>
                  <li role="presentation" index={1} className={(this.state.activeMenu === 1) ? "active" : ''}><Link to={"/@" + this.props.match.params.username + "/skills"} onClick={this.handleMenu.bind(this, 1)}>Skills</Link></li>
                  <li role="presentation" index={2} className={(this.state.activeMenu === 2) ? "active" : ''}><Link to={"/@" + this.props.match.params.username + "/blog"} onClick={this.handleMenu.bind(this, 2)}>Blog</Link></li>
                </ul>
               </nav>
                <Switch>
                  <Route path='/@:username' exact={true} render={() => <RecommendationList />} />
                  <Route path='/@:username/skills' exact={true} render={() => <Skills />} />
                  <Route path='/@:username/blog' exact={true} render={() => <BlogList />} />
                </Switch>
            </div>
          </div>
        </div>
      );
    }
  }
  }
}

export default Profile;
