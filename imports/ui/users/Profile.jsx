import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Skill, RecommendationCard, ProfileUserControl } from '/imports/ui/components/ForboleComponents.jsx';

// import Blog from '/imports/ui/pages/profile/Blog.jsx';
// import Wallet from '/imports/ui/pages/profile/Wallet.jsx';
// import Recommendations from '/imports/ui/pages/profile/Recommendations.jsx';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      recos: {}
    }
  }

  componentDidUpdate(prevProps, prevState){
    // console.log(this.props);
    if (this.props != prevProps){
      this.setState({recos: this.props.recos});
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    // console.log("value changed");
    // console.log(e.target.value);
    if (e.target.value == 'R'){
      this.setState({ recos: this.props.recos})
    }
    else if (e.target.value == 'G'){
      this.setState({recos: this.props.recosSent});
    }
  }

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
              />
                <ul className="nav nav-pills nav-pills-primary">
                  {/* <li className="active"><a href="#about" data-toggle="tab">Bio</a></li> */}
                  <li className="active"><a href="#recommendations" data-toggle="tab">Recommendations</a></li>
                </ul>
                <div className="tab-content tab-space">
                  {/* <div className="tab-pane active" id="about">
                    <div className="description">
                      <p>Kwun is the CoFounder & Conductor of Forbole. He has started his digital entrepreneur life since 2005. He cofounded Creativeworks Group Limited, a digital agency in Hong Kong which has served clients such as UNICEF, AIA, Miss Universe, All Nippon Airways, etc. He is an advocate in digital transformation through the use of information technology and interactive user experience design. Kwun is now a Senior Advisor of Creativeworks to give advice and guidance in design & digital.</p>
                      <p>Kwun is also a Adjunct lecturer at The University of Hong Kong (“HKU”). He teaches digital marketing courses in the School of Professional And Continuing Education of HKU.</p>
                    </div>

                    <div className="skills">
                        <h4>Endorsed Skills</h4>
                        <div className="row">
                          <div className="col-md-12">
                            {(this.props.user.skills)?(this.props.user.skills.map((skill, i) => <Skill key={i} skill={skill} />)):''}
                          </div>
                        </div>
                    </div>
                  </div> */}
                  {/*}<Blog />*/}
                  <div className="tab-pane active" id="recommendations">
                      <div className="row">
								        <div className="col-lg-5 col-md-6 col-sm-3">
                          <select className="selectpicker" data-style="select-with-transition" defaultValue="R" data-size="2" onChange={this.handleChange}>
                            <option value="R">Received</option>
                            <option value="G">Given</option>
                          </select>                  
                        </div>
                      </div>
                    <div className="row">
                    {(this.state.recos.length > 0) ? this.state.recos.map((reco, i) => <div key={i} className="col-md-6 col-lg-4">
                          <RecommendationCard
                          username={reco.creator().username}
                          picture={reco.creator().profilePic()}
                          createdBy={reco.creator().profile.name}
                          title={reco.creator().username}
                          recommendation={reco.recommendation}
                          skills={reco.skills}
                          event={reco.event}
                          createdAt={reco.createdAt}
                        /></div>):''}
                    </div>
                  </div>
                </div>
            </div>
          </div>

        </div>
      );
    }
  }
  }
}

export default Profile;
