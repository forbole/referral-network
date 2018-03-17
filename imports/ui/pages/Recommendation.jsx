import React, { Component } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { RecommendationCard } from '/imports/ui/components/ForboleComponents.jsx';

class Recommendation extends Component {
  constructor(props){
    super(props);
    // console.log(props);
    this.state = {
      fromDate: moment("20180311", "YYYYMMDD").fromNow()
    }
  }

  handleAccept = (e) => {
    e.preventDefault();

  }
  	render() {
      if (this.props.loading){
        return <div>Loading</div>
      }
      else {
      	return (
      		<div className="contact-page">
      			<div className="main">
  					<div className="contact-content">
              {this.props.recoExists?
  			    		<div className="container">
  			    			<h2 className="title text-center">{this.props.reco.toName}, you are recommended!</h2>
  			    			<div className="col-md-12">
  			    				<p>You've got a recommendation from
                      <Link to={"/profile/"+this.props.createdUser._id}>
                        <em> {this.props.reco.name}</em>
                      </Link> {moment(this.props.reco.createdAt,"YYYYMMDD").fromNow()}.
                    </p>
                    <blockquote className="blockquote">{this.props.reco.event}</blockquote>
  								  <RecommendationCard
                      createdBy={this.props.reco.name}
                      title={this.props.createdUser._id}
                      recommendation={this.props.reco.recommendation}
                      skills={this.props.reco.skills}
                    />
  							</div>
  							<div className="text-center">
                  <p>You can accept and display your recommendation by clicking the button below.</p>
                  <button className="btn btn-primary btn-round" onClick={this.handleAccept}>Accept</button>
                </div>
  						</div>
              :''}
  					</div>
  				</div>
      		</div>
      	)
      }
  	}
}

export default Recommendation;
