import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../components/ForboleComponents.jsx';

export default class ReferralAccept extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if (this.props.loading){
            return <Loading />
        }
        else{
            console.log(this.props.referral.creator());
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
                                    <p className="text-center"><button className="btn btn-primary">Accept</button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}