import React, { Component } from 'react';

class About extends Component {
  	render() {
    	return (
    		<div className="tab-pane active" id="about">
        		<div>
        			<h3>Bio</h3>
        			<p className="description">An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. </p>
        		</div>

        		<div className="space-50"></div>

        		<div>
					<h3>Recommendation</h3>
					<div className="row">
						<div className="col-md-4">
							<div className="card card-testimonial">
								<div className="icon">
									<i className="material-icons">format_quote</i>
								</div>
								<div className="card-content">
									<h5 className="card-description">
										Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!
									</h5>
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

						<div className="col-md-4">
							<div className="card card-testimonial">
								<div className="icon">
									<i className="material-icons">format_quote</i>
								</div>
								<div className="card-content">
									<h5 className="card-description">
										"Don't be scared of the truth because we need to restart the human foundation in truth. That's why I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is not so attractive"
									</h5>
								</div>

								<div className="footer">
									<h4 className="card-title">Gina Andrew</h4>
									<h6 className="category">@ginaandrew</h6>
									<div className="card-avatar">
										<a href="#">
											<img className="img" src="/img/faces/card-profile4-square.jpg" />
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-4">
							<div className="card card-testimonial">
								<div className="icon">
									<i className="material-icons">format_quote</i>
								</div>
								<div className="card-content">
									<h5 className="card-description">
										"Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!"
									</h5>
								</div>

								<div className="footer">
									<h4 className="card-title">George West</h4>
									<h6 className="category">@georgewest</h6>
									<div className="card-avatar">
										<a href="#">
											<img className="img" src="/img/faces/card-profile2-square.jpg" />
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="space-50"></div>

				<div>
					<h3>Skill</h3>
					<div class="row">
						<input type="text" value="Design,UI/UX,Marketing,Web Development" class="tagsinput" data-role="tagsinput" data-color="rose"/>
					</div>
				</div>

			</div>
    	)
  	}
}

export default About;