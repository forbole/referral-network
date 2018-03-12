import React, { Component } from 'react';

class Connections extends Component {
  render(){
    return <div>
      <div className="container">
        <h3 className="text-center">Your Connections</h3>
        <div className="row">
          <div className="col-md-12">
							<select className="selectpicker" data-style="select-with-transition" title="Sort by: Recently recommended">
								<option disabled> Sort by: Recently recommended</option>
								<option value="2" selected>Recently recommended </option>
								<option value="3">First Name</option>
								<option value="4">Last Name</option>
							</select>
              <div className="card">
                <div className="card-body media">
                  <div className="col-xs-3">
                    <a href="/profile" className="pull-left">
                      <div className="avatar">
                        <img src="/img/faces/kwun-profile.jpg" />
                      </div>
                    </a>
                  </div>
                  <div className="col-xs-9">
                    <h4 className="media-heading">Kwun Yeung</h4>
                    <h6 className="media-muted">Co-founder &amp; Conductor of Forbole</h6>
                    <div className="media-footer">
                      <span className="label label-rose">Blockchain</span>
                      <span className="label label-rose">Entrepreneurship</span>
                      <span className="label label-rose">Lecturing</span>
                    </div>
                    <small>And 39 more skills</small>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body media">
                  <div className="col-xs-3">
                    <a href="/profile" className="pull-left">
                      <div className="avatar">
                        <img src="/img/faces/jade-lai.jpg" />
                      </div>
                    </a>
                  </div>
                  <div className="col-xs-9">
                    <h4 className="media-heading">Jade Lai</h4>
                    <h6 className="media-muted">Managing Director of Creativeworks</h6>
                    <div className="media-footer">
                      <span className="label label-rose">Account Servicing</span>
                      <span className="label label-rose">Advertising</span>
                      <span className="label label-rose">Digital Marketing</span>
                    </div>
                    <small>And 42 more skills</small>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body media">
                  <div className="col-xs-3">
                    <a href="/profile" className="pull-left">
                      <div className="avatar">
                        <img src="/img/faces/gurjeet-chima.jpg" />
                      </div>
                    </a>
                  </div>
                  <div className="col-xs-9">
                    <h4 className="media-heading">Gurjeet Chima</h4>
                    <h6 className="media-muted">Business Development Director of Variety China</h6>
                    <div className="media-footer">
                      <span className="label label-rose">Film</span>
                      <span className="label label-rose">Media</span>
                      <span className="label label-rose">Business Development</span>
                    </div>
                    <small>And 26 more skills</small>
                  </div>
                </div>
              </div>
					</div>
        </div>
      </div>
    </div>;
  }
}

export default Connections
