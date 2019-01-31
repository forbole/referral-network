import React, { Component } from 'react';
// import moment from 'moment'
// import { Link, Redirect } from 'react-router-dom';
import { Loading, RecommendationCard } from '/imports/ui/components/ForboleComponents.jsx';

export default class Recommendation extends Component {
    constructor(props){
        super(props);
        console.log(props);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props);
        if (this.props != prevProps) {
            console.log(this.props);
        }
    }

    render(){
        if (this.props.loading){
            return <Loading />
        }
        else{
            if (this.props.recoExists){
                console.log(this.props.reco);
                return <div className="single-reco"><RecommendationCard
                    recoId={this.props.reco._id}
                    username={this.props.reco.creator().username}
                    acceptor={this.props.reco.acceptor().username}
                    picture={this.props.reco.creator().profilePic()}
                    createdBy={this.props.reco.creator().profile.name}
                    title={this.props.reco.creator().profile.position}
                    recommendation={this.props.reco.recommendation}
                    skills={this.props.reco.skills}
                    event={this.props.reco.event}
                    createdAt={this.props.reco.createdAt}
                    acceptButton={(this.props.reco.acceptor()) ? false : true}
                    share={true}
                /></div>
            }
            else{
                return <div>No recommendation found.</div>
            }
        }
    }
}