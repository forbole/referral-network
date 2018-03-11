import React, { Component } from 'react';

class Recommend extends Component {

  componentDidMount(){
      //Activate tags
      //removed class label and label-color from tag span and replaced with data-color
      var tagClass = $('.tagsinput').data('color');

      $('.tagsinput').tagsinput({
          tagClass: 'label label-info tag-'+ tagClass +' ',
          maxTags: 3
      });

      $('.bootstrap-tagsinput').addClass('form-control');
  }

  	render() {
    	return (
    		<div>
          <div className="page-header header-filter header-small" data-parallax="true" style={{backgroundImage: 'url(/img/recommend-bg.jpg)'}}>
            <div className="container">
        			<div className="row">
        				<div className="col-md-8 col-md-offset-2 text-center">
        					<h1 className="title"></h1>
        				</div>
        			</div>
        		</div>
          </div>
    			<div className="main main-raised">
					<div className="contact-content">
			    		<div className="container">
							<div className="row">
								<div className="col-md-12">
                  <div className="title text-center"><h3>Make a Recommendation</h3></div>
                  <div className="card card-profile card-plain">
        						<div className="card-avatar">
        							<a href="#pablo">
        								<img className="img" src="/img/faces/kwun-profile.jpg" />
        							</a>
        						</div>

        						<div className="card-content">
        							<h4 className="card-title">Kwun Yeung</h4>
        							<h6 className="category text-muted">Co-Founder & Conductor of Forbole</h6>

        							<p className="card-description">
        								You can recognize your connection by writing them a recommendation. Your recommendation will be shown on their profiles.
        							</p>
        						</div>
        					</div>
									<form role="form" id="contact-form" method="post">
										<div className="form-group label-floating">
											<label className="control-label">Your name</label>
											<input type="text" name="name" className="form-control" value="Terence Lam"/>
										</div>
                    <div className="form-group label-floating">
      								<label className="control-label">Recommendation</label>
      								<textarea name="recommendation" className="form-control" id="recommendation" rows="6"></textarea>
      							</div>
										<div className="form-group label-floating">
                      <label className="control-label">Endorse 3 Skills</label>
                      <input type="text" value="Blockchain, UX/UI, Entrepreneurship" class="tagsinput" data-role="tagsinput" data-color="rose"/>
										</div>
										<div className="submit text-center">
											<input type="submit" className="btn btn-primary btn-raised btn-round" value="Send" />
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
