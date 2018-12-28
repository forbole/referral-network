import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from '../components/ForboleComponents.jsx';
import { toast } from 'react-toastify';

export default class ReferralAccept extends Component{
    constructor(props){
        super(props);

        this.state = {
            loginAndAccept: false
        }
    }

    handleAccept = (e) => {
        e.preventDefault();
        Meteor.call('referral.accept', this.props.match.params.id, (err, result) => {
            if (err){
                toast.error(err);
            }
            if (result){
                // show alert
                // console.log(result);
                toast.success('You have accepted this referral.')
                // add contribution score to the sender
                
                // Meteor.call('connections.insert', this.props.referral.createdBy, "referral", this.props.referral._id, function(err, result){
                //     if (err){
                //       console.log(err);
                //     }
                //     if (result){
                //       console.log('connection created.')
                //     }
                // });
            }
        });
    }

    loginAndAccept = (e) => {
        // store connection_id in case if it's an invite
        e.preventDefault();
        let self = this;
    
        if (Meteor.status().connected){
          Meteor.call('invite.session', Meteor.default_connection._lastSessionId, self.props.referral._id, 'referral', (err, result) => {
            if (err){
              console.log(err);
            }
            if (result){
              self.setState({loginAndAccept:true});
              // console.log(result);
            }
          });
        }

    }

    render(){
        if (this.props.loading){
            return <Loading />
        }
        else if (this.state.loginAndAccept){
            return (<Redirect
              to={{
                pathname: "/login",
                state: { from: this.props.location }
              }}
            />);
        }
        else{
            if (this.props.referralExists){            
                return (
                    <div className="main referral">
                        <div className="container">
                            <h1 className="title">You are being referred</h1>
                            <div className="card card-blog">
                                <div className="card-header"><Link to={"/@"+this.props.referral.creator().username}>{this.props.referral.creator().profile.name}</Link> would like to introduce <Link to={"/@"+this.props.referral.referee().username}>{this.props.referral.referee().profile.name}</Link> to you. </div>
                                <div className="card-content">
                                    <div className="introduction row">
                                        <div className="col-xs-5"><img className="avatar img-raised" src={this.props.referral.creator().profilePic()} /></div>
                                        <div className="col-xs-2"><i className="material-icons symbol">forward</i></div>
                                        <div className="col-xs-5"><img className="avatar img-raised" src={this.props.referral.referee().profilePic()} /></div>
                                    </div>
                                    <div>
                                        <p><Link to={"/@"+this.props.referral.creator().username}>{this.props.referral.creator().profile.firstname}</Link> has given the following message to <Link to={"/@"+this.props.referral.referee().username}>{this.props.referral.referee().profile.firstname}</Link>.</p>
                                        <blockquote>{this.props.referral.details}</blockquote>
                                        <p>Please accept being referrerd and <Link to={"/@"+this.props.referral.referee().username}>{this.props.referral.referee().profile.firstname}</Link> will contact you once this referral has been received.</p>
                                        <p className="text-center">{(!this.props.referral.acceptedAt)?Meteor.userId()?((this.props.referral.createdBy != Meteor.userId())?<button
                                            className="btn btn-primary"
                                            onClick={this.handleAccept}>Accept</button>:''):<button
                                            className="btn btn-primary"
                                            onClick={this.loginAndAccept}>Accept</button>
                                        :<span className="label label-info">This referral has been accepted.</span>}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                return <div>No such referral.</div>
            }
        }
    }
}