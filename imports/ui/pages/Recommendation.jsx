import React, { Component } from 'react';
import moment from 'moment'
import { Link, Redirect } from 'react-router-dom';
import { RecommendationCard, Alert } from '/imports/ui/components/ForboleComponents.jsx';

class Recommendation extends Component {
  constructor(props){
    super(props);
    this.state = {
      fromDate: moment("20180311", "YYYYMMDD").fromNow(),
      acceptButton: '',
      accepted: false,
      loginAndAccept: false
    }
  }

  handleAccept = (e) => {
    e.preventDefault();
    Meteor.call('recommendations.accept', this.props.reco._id, (err, result) =>{
      if (result){
        this.setState({accepted: true});
        // console.log(result);
        Meteor.call('Connections.insert', this.props.reco.createdBy, this.props.reco._id, function(err, result){
          if (err){
            console.log(err);
          }
          if (result){
            console.log('connection created.')
          }
        });
        Meteor.call('contributions.insert', 'recommendations', this.props.reco._id, this.props.reco.createdBy, 500, function(err, result){
          if (err){
            console.log(err);
          }
          if (result){
            console.log('contributions add');
          }
        });

      }
      else if (err) console.log(err);
    });
  }

  loginAndAccept = (e) => {
    e.preventDefault();
    this.setState({loginAndAccept:true});
  }

  	render() {
      if (this.props.loading){
        return <div>Loading</div>
      }
      else if (this.state.accepted){
        return (
          <div className="main">
            <Alert type="success" text="You have accepted the recommendation!" />
            <div className="text-center">
              <Link to={"/@"+Meteor.user().username} className="btn btn-primary btn-round">View your profile</Link>
            </div>
          </div>
        )
      }
      else if (this.state.loginAndAccept){
        return (<Redirect
          to={{
            pathname: "/login",
            state: { from: this.props.location }
          }}
        />);
      }
      else {
      	return (
    			<div className="main">
            {this.props.recoExists?
			    		<div className="container">
                <div className="row">
                  {(this.props.reco.createdBy == Meteor.userId())?
                    <Alert
                      type="info"
                      text="This is a preview of a recommendation you have sent."
                    />:''}
  			    			<h2 className="title text-center">{this.props.reco.toName}, you are recommended!</h2>
  			    			<div className="col-md-12">
  			    				<p>You've got a recommendation from
                      <Link to={"/@"+this.props.createdUser.username}>
                        <em> {this.props.reco.name}</em>
                      </Link> {moment(this.props.reco.createdAt,"YYYYMMDD").fromNow()}.
                    </p>
  								  <RecommendationCard
                      createdBy={this.props.reco.name}
                      title={this.props.createdUser.profile.position}
                      picture={this.props.createdUser.profilePic()}
                      recommendation={this.props.reco.recommendation}
                      skills={this.props.reco.skills}
                      event={this.props.reco.event}
                    />
                    <div className="text-center">
                      <p>You can accept and display your recommendation by clicking the button below.</p>
                      {Meteor.userId()?((this.props.reco.createdBy != Meteor.userId())?<button
                        className="btn btn-primary btn-round"
                        onClick={this.handleAccept}>Accept</button>:''):<button
                          className="btn btn-primary btn-round"
                          onClick={this.loginAndAccept}>Accept</button>
                      }
                    </div>
  							</div>
              </div>
						</div>
            :''}
				</div>
    	)
    }
	}
}

export default Recommendation;
