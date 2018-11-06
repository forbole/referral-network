import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../components/ForboleComponents.jsx';
import validator from 'validator';


class Refer extends Component {
    constructor(props){
        super(props);

        this.state = {
            toUserId: '',
            hasErrors: true,
            emailTouched: false,
            emailPass: false,
            ownEmailPass: false,
            nameTouched: false,
            namePass: false,
            detailsTouch: false,
            detailsPass: false,
            urgencyTouched: false,
            urgencyPass: false,
            sending: false,
          };
    }

    validateForm = () => {
        this.setState({hasErrors:!(this.state.emailPass&&this.state.ownEmailPass&&this.state.namePass&&this.state.detailsPass&&this.state.urgencyPass)});
    }

    handleChange = (e) => {
        // e.preventDefault();
        console.log('handlechange');
        console.log(e.target.value);
    }

    handleInputsFocus = (e) => {
        if (e.target.name == "name") this.setState({nameTouched:true});
        if (e.target.name == "email") this.setState({emailTouched:true});
        if (e.target.name == "details") this.setState({detailsTouch:true});
        if (e.target.name == "urgency") this.setState({urgencyTouched:true});    
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }

    handleInputs = (e) => {
        console.log(Meteor.user().emails[0].address);
        if (e.target.name == "name") this.setState({namePass:!validator.isEmpty(e.target.value)}, this.validateForm);
        if (e.target.name == "email") {
          this.setState({emailPass:validator.isEmail(e.target.value)}, this.validateForm);
          this.setState({ownEmailPass:(e.target.value!=Meteor.user().emails[0].address)}, this.validateForm);
        }
        if (e.target.name == "details") this.setState({detailsPass:!validator.isEmpty(e.target.value)}, this.validateForm);
        if (e.target.name == "urgency"){
          this.setState({urgencyPass:!validator.isEmpty(e.target.value)}, this.validateForm);
        } 
    }

    render() {
        if (this.props.loading){
            return <Loading />
        }
        else{
            if (this.props.userExists){
                return (
                    <div className="main">
                        <div className="container" id="refer">
                            <h1 className="title">You are making a referral to</h1>
                            <div className="card card-blog">
                                <div className="card-header">
                                    <div className="author">
                                        <Link to="#pablo">
                                            <div className="row">
                                                <div className="col-xs-2">
                                                    <img src={this.props.user?this.props.user.profilePic():''} alt={this.props.user.profile.name} className="avatar img-raised" />
                                                </div>
                                                <div className="col-xs-10">
                                                    <span>{this.props.user.profile.name}</span><br />
                                                    <span className="headline">{this.props.user.profile.position}</span>
                                                </div>
                                            </div>
        
                                        </Link>
                                    </div>
                                    <div className="row message">{this.props.message}</div>
                                </div>
                            </div>
                            <form id="ReferralForm" role="form" onSubmit={this.handleSubmit} noValidate>
                                <input type="hidden" name="toUserId" value={this.props.user._id}/>
                                <div className="form-group label-floating">
                                    <label className="control-label" htmlFor="acceptorName">Name of your friend who needs help</label>
                                    <input type="text" className="form-control" name="name" id="refereeName" onChange={this.handleInputs} onBlur={this.handleInputsFocus} />
                                    {(this.state.nameTouched&&!this.state.namePass)?<div className="invalid-feedback">Please enter the name of your friend.</div>:''}
                                </div>
                                <div className="form-group label-floating">
                                    <label className="control-label" htmlFor="acceptorEmail">Email of your friend who needs help</label>
                                    <input type="email" className="form-control" name="email" id="refereeEmail" onChange={this.handleInputs} onBlur={this.handleInputsFocus} />
                                    {(this.state.emailTouched&&(!this.state.ownEmailPass||!this.state.emailPass))?<div className="invalid-feedback">Please enter a valid email address of your friend.</div>:''}
                                </div>
                                <div className="form-group label-floating">
                                    <label className="control-label" htmlFor="referralDetails">Details of the referral (please be specific)</label>
                                    <textarea className="form-control" name="details" id="referralDetails" rows="5" onChange={this.handleInputs} onBlur={this.handleInputsFocus}/>
                                    {(this.state.detailsTouch&&!this.state.detailsPass)?<div className="invalid-feedback">Please enter details of what you think <em>{this.props.user.profile.firstname}</em> may help.</div>:''}
                                </div>
                                <div className="row urgency">
                                    <div className="col-xs-12 form-group"><label className="control-label" htmlFor="referralDetails">Urgency</label></div>
                                    <div className="radio col-xs-4">
                                    <label>
                                        <input type="radio" name="urgency" id="urgencyLow" value="0" onChange={this.handleInputs} />
                                        Low
                                    </label>
                                    </div>
                                    <div className="radio col-xs-4">
                                    <label>
                                        <input type="radio" name="urgency" id="urgencyMid" value="1" onChange={this.handleInputs} />
                                        Mid
                                    </label>
                                    </div>
                                    <div className="radio col-xs-4">
                                    <label>
                                        <input type="radio" name="urgency" id="urgencyHi" value="2" onChange={this.handleInputs} />
                                        High
                                    </label>
                                    </div>
                                    {(this.state.urgencyTouch&&!this.state.urgencyPass)?<div className="invalid-feedback col-xs-12">Please let <em>{this.props.user.profile.firstname}</em> know how urgent your friend need the help.</div>:''}
                                </div>
                                <div className="row text-center">
                                    <button type="submit" className="btn btn-primary" disabled={this.state.hasErrors}>Refer {this.props.user.profile.firstname}!</button>
                                </div>
                            </form>                    
                        </div>
                    </div>
                )
            }
            else{
                return <div>User does not exists.</div>
            }
        }
    }
}

export default Refer;