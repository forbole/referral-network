import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Refer extends Component {
    render() {
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
                                            <img src="/img/faces/sami-yim.jpg" alt="..." className="avatar img-raised" />
                                        </div>
                                        <div className="col-xs-10">
                                            <span>Sami Yim</span><br />
                                            <span className="headline">Brand Manager</span>
                                        </div>
                                    </div>

                                </Link>
                            </div>
                            <div className="row message">{this.props.message}</div>
                        </div>
                    </div>
                    <form role="form">
                        <div className="form-group label-floating">
                            <label className="control-label" htmlFor="acceptorName">Who you are going to refer the referee?</label>
                            <input type="text" className="form-control" id="acceptorName" />
                        </div>
                        <div className="form-group label-floating">
                            <label className="control-label" htmlFor="acceptorEmail">Your friend's Email</label>
                            <input type="email" className="form-control" id="acceptorEmail" />
                        </div>
                        <div className="form-group label-floating">
                            <label className="control-label" htmlFor="referralDetails">Details of the referral</label>
                            <textarea className="form-control" id="referralDetails" rows="5"/>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 form-group"><label className="control-label" htmlFor="referralDetails">Urgency</label></div>
                            <div className="radio col-xs-4">
                            <label>
                                <input type="radio" name="urgency" id="urgencyLow" value="0"  />
                                Low
                            </label>
                            </div>
                            <div className="radio col-xs-4">
                            <label>
                                <input type="radio" name="urgency" id="urgencyMid" value="1" checked />
                                Mid
                            </label>
                            </div>
                            <div className="radio col-xs-4">
                            <label>
                                <input type="radio" name="urgency" id="urgencyHi" value="2"  />
                                High
                            </label>
                            </div>
                        </div>
                        <div className="row text-center">
                            <Link className="btn btn-primary" to="#">Refer Sami!</Link>
                        </div>
                    </form>                    
                </div>
            </div>
        )
    }
}

export default Refer;