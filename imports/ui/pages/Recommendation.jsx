import React, { Component } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { RecommendationCard, Alert } from '/imports/ui/components/ForboleComponents.jsx';

class Recommendation extends Component {
  constructor(props){
    super(props);
    // console.log(props);
    this.state = {
      fromDate: moment("20180311", "YYYYMMDD").fromNow(),
      accepted: false
    }
  }

  handleAccept = (e) => {
    e.preventDefault();
    Meteor.call('recommendations.accept', this.props.reco._id, (err, result) =>{
      if (result){
        this.setState({accepted: true});
        console.log(result);
      }
      else console.log(err);
    });
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
              <Link to="/profile" className="btn btn-primary btn-round">View your profile</Link>
            </div>
          </div>
        )
      }
      else {
      	return (
      			<div className="main">
              {this.props.recoExists?
  			    		<div className="container">
                  <div className="row">
    			    			<h2 className="title text-center">{this.props.reco.toName}, you are recommended!</h2>
    			    			<div className="col-md-12">
    			    				<p>You've got a recommendation from
                        <Link to={"/profile/"+this.props.createdUser._id}>
                          <em> {this.props.reco.name}</em>
                        </Link> {moment(this.props.reco.createdAt,"YYYYMMDD").fromNow()}.
                      </p>
    								  <RecommendationCard
                        createdBy={this.props.reco.name}
                        title={this.props.createdUser.username}
                        picture={this.props.createdUser.profile.picture}
                        recommendation={this.props.reco.recommendation}
                        skills={this.props.reco.skills}
                      />
                      <blockquote className="blockquote">{this.props.reco.event}</blockquote>
                      <div className="text-center">
                        <p>You can accept and display your recommendation by clicking the button below.</p>
                        <button className="btn btn-primary btn-round" onClick={this.handleAccept}>Accept</button>
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
