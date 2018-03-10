import React, { Component } from 'react';

class About extends Component {
  	render() {
    	return (
    		<div className="tab-pane" id="about">
              <div className="description">
                <p>Kwun is the CoFounder & Conductor of Forbole. He has started his digital entrepreneur life since 2005. He cofounded Creativeworks Group Limited, a digital agency in Hong Kong which has served clients such as UNICEF, AIA, Miss Universe, All Nippon Airways, etc. He is an advocate in digital transformation through the use of information technology and interactive user experience design. Kwun is now a Senior Advisor of Creativeworks to give advice and guidance in design & digital.</p>
                <p>Kwun is also a Adjunct lecturer at The University of Hong Kong (“HKU”). He teaches digital marketing courses in the School of Professional And Continuing Education of HKU.</p>
              </div>
              <div className="space-50"></div>
        		<div>
				</div>

				<div className="space-50"></div>

				<div>
					<h3>Skills</h3>
					<div className="row">
						<span className="label label-primary">Design</span>
						<span className="label label-primary">UI/UX</span>
						<span className="label label-primary">Marketing</span>
					</div>
				</div>

			</div>
    	)
  	}
}

export default About;
