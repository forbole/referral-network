import React, { Component } from 'react';

class Recommendation extends Component {
  	render() {
    	return (
    		<div className="contact-page">
    			<div className="main main-raised">
					<div className="contact-content">
			    		<div className="container">
			    			<h2 className="title">Receive a Recommendation</h2>
			    			<div className="col-md-12">
			    				<h5>You've got a recommendation from Alec Thompson on ...</h5>
								<div className="card card-testimonial">
									<div className="icon">
										<i className="material-icons">format_quote</i>
									</div>
									<div className="card-content">
										<h5 className="card-description">
											Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!
										</h5>
										<span class="label label-danger">Marketing</span>
										<span class="label label-danger">Advertising</span>
										<span class="label label-danger">SEM</span>
									</div>

									<div className="footer">
										<h4 className="card-title">Alec Thompson</h4>
										<h6 className="category">@alecthompson</h6>
										<div className="card-avatar">
											<a href="#">
												<img className="img" src="/img/faces/card-profile1-square.jpg" />
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="space-50"></div>
							<button class="btn btn-primary btn-round">Accept</button>
							<div className="space-50"></div>
						</div>
					</div>
				</div>
    		</div>
    	)
  	}
}

export default Recommendation;