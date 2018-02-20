import React, { Component } from 'react';

class Recommend extends Component {
  	render() {
    	return (
    		<div className="contact-page">
    			<div className="main main-raised">
					<div className="contact-content">
			    		<div className="container">
			            	<h2 className="title">Recommend a Connection</h2>
							<div className="row">
								<div className="col-md-12">
									<p className="description">You can recognize your connection by writing them a recommendation. Your recommendation will be shown on their profiles. <br/><br/>
									</p>
									<form role="form" id="contact-form" method="post">
										<div className="form-group label-floating">
											<label className="control-label">Your name</label>
											<input type="text" name="name" className="form-control"/>
										</div>
										<div className="form-group label-floating">
											<label className="control-label">Email address</label>
											<input type="email" name="email" className="form-control"/>
										</div>
										<div className="form-group label-floating">
											<label className="control-label">Recommendation</label>
											<textarea name="recommendation" className="form-control" id="recommendation" rows="6"></textarea>
										</div>
										<div className="form-group label-floating">
											<label className="control-label">Tag</label>
											<input type="text" value="" class="tagsinput" data-role="tagsinput" data-color="danger"/>
										</div>
										<div className="submit text-center">
											<input type="submit" className="btn btn-primary btn-raised btn-round" value="Save" />
										</div>
									</form>
								</div>
			               </div>
			            </div>
					</div>
			    </div>
    		</div>
    	)
  	}
}

export default Recommend;