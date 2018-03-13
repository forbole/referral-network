import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Recommend extends Component {
  constructor(props){
    super(props);
    this.props = props;

    this.state = {
      toUser : ''
    };
  }

  componentDidMount(){
      //Activate tags
      //removed class label and label-color from tag span and replaced with data-color
      var tagClass = $('.tagsinput').data('color');

      $('.tagsinput').tagsinput({
          tagClass: 'label label-info tag-'+ tagClass +' ',
          maxTags: 3
      });

      $('.bootstrap-tagsinput').addClass('form-control');
      if (this.props.match.params.username != null){
          const toUser = (<div className="card card-profile card-plain">
            <div className="card-avatar">
              <Link to="#pablo">
                <img className="img" src="/img/faces/kwun-profile.jpg" />
              </Link>
            </div>
            <div className="card-content">
              <h4 className="card-title">Kwun Yeung</h4>
              <h6 className="category text-muted">Co-Founder & Conductor of Forbole</h6>

              <p className="card-description">
                You can recognize your connection by writing them a recommendation. Your recommendation will be shown on their profiles.
              </p>
            </div>
          </div>);
          this.setState({toUser: toUser});
      }
  }

  	render() {
    	return (
    		<div>
          <div className="page-header header-filter header-small" data-parallax="true" style={{backgroundImage: 'url(/img/recommend-bg.jpg)'}}>
            <div className="container">
        			<div className="row">
        				<div className="col-md-8 col-md-offset-2 text-center">
        					<h1 className="title">Make a Recommendation</h1>
                  <h4>Recommend a person that you trust.</h4>
        				</div>
        			</div>
        		</div>
          </div>
    			<div className="main main-raised">
  					<div className="contact-content">
  			    		<div className="container">
    							<div className="row">
    								<div className="col-md-12">
                      {this.state.toUser}
    									<form role="form" id="contact-form" method="post">
    										<div className="form-group label-floating">
    											<label className="control-label">Your name</label>
    											<input type="text" name="name" className="form-control" value="Terence Lam" readOnly={true}/>
    										</div>
                        <div className="form-group label-floating">
          								<label className="control-label">Recommendation</label>
          								<textarea name="recommendation" className="form-control" id="recommendation" rows="6" value="Kwun always keeps abreast with the latest development of multimedia technology. He shows to me high degree of management skill with junior colleagues. He shows also excellent EQ when handling difficult tasks and clients.

    He is a great business partner, colleague and friend to work with." readOnly={true}></textarea>
          							</div>
    										<div className="form-group label-floating">
                          <label className="control-label">Endorse 3 Skills</label>
                          <input type="text" readOnly={true} defaultValue="Blockchain, UX/UI, Entrepreneurship" className="tagsinput" data-role="tagsinput" data-color="rose"/>
    										</div>
    										<div className="submit text-center">
    											<Link to="/recommend/sent/" className="btn btn-primary btn-raised btn-round">Send</Link>
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
