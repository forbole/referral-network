import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Loading } from '../components/ForboleComponents.jsx';
import { toast } from 'react-toastify';

export default class ReferralReceive extends Component{
    constructor(props){
        super(props);

        this.state = {
            loginAndReceive: false
        }
    }

    handleReceive = (e) => {
        e.preventDefault();
        Meteor.call('referral.receive', this.props.match.params.id, (err, result) => {
            if (err){
                toast.error(err);
            }
            if (result){
                toast.success('You have received this referral.')
            }
        });
    }

    loginAndReceive = (e) => {
        // store connection_id in case if it's an invite
        e.preventDefault();
        let self = this;
    
        if (Meteor.status().connected){
          Meteor.call('invite.session', Meteor.default_connection._lastSessionId, self.props.referral._id, 'referral', (err, result) => {
            if (err){
              console.log(err);
            }
            if (result){
              self.setState({loginAndReceive:true});
              // console.log(result);
            }
          });
        }

    }

    render(){
        if (this.props.loading){
            return <Loading />
        }
        else if (this.state.loginAndReceive){
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
                            <h1 className="title">You have got a referral</h1>
                            <div className="card card-blog">
                                <div className="card-header">
                                    <Link to={"/@"+this.props.referral.creator().username}>{this.props.referral.creator().profile.name}</Link>
                                    &nbsp;would like to introduce&nbsp;
                                    <Link to={"/@"+this.props.referral.acceptor().username}>{this.props.referral.acceptor().profile.name}</Link>
                                    &nbsp;to you.</div>
                                <div className="card-content">
                                    <div className="introduction row">
                                        <div className="col-xs-5"><img className="avatar img-raised" src={this.props.referral.creator().profilePic()} /></div>
                                        <div className="col-xs-2"><i className="material-icons symbol">forward</i></div>
                                        <div className="col-xs-5"><img className="avatar img-raised" src={this.props.referral.acceptor().profilePic()} /></div>
                                    </div>
                                    <div>
                                        <p><Link to={"/@"+this.props.referral.creator().username}>{this.props.referral.creator().profile.firstname}</Link> has described what <Link to={"/@"+this.props.referral.acceptor().username}>{this.props.referral.acceptor().profile.firstname}</Link> needed in the following message.</p>
                                        <blockquote>{this.props.referral.details}</blockquote>
                                        <p>Please receive this referral and <Link to={"/@"+this.props.referral.acceptor().username}>{this.props.referral.acceptor().profile.firstname}</Link> will contact you once this referral has been accepted.</p>
                                        <p className="text-center">{(!this.props.referral.receivedAt)?Meteor.userId()?((this.props.referral.createdBy != Meteor.userId())?<button
                                            className="btn btn-primary"
                                            onClick={this.handleReceive}>Receive</button>:''):<button
                                            className="btn btn-primary"
                                            onClick={this.loginAndReceive}>Receive</button>
                                        :<span className="label label-info">This referral has been received.</span>}</p>
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