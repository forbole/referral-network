import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '/imports/ui/components/ForboleComponents.jsx';

class Recommend extends Component {
  constructor(props){
    super(props);
    // this.props = props;

    this.state = {
      toUser : '',
      alert: ''
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

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const formData = new FormData(e.target);
    let data = {};
    for (let entry of formData.entries()) {
       data[entry[0]] = entry[1];
    }

    Meteor.call('Recommendations.insert', data.name, data.toName, data.email, data.event, data.recommendation, data.skills, (error, result) => {
      console.log(result);
      if (result){
        this.setState({
          alert: <Alert type="success" text={["Thank you! Your recommendation has been sent to ",<strong key="x">{data.toName}</strong>, "."]} />
        });
        $('#recommendation-form').hide();
      }
    });
    // console.log(data);
    // console.log("submitted");
  }

  recommendAgain = (e) =>{
    e.preventDefault();
    $('#recommendation-form input[name=toName]').val('');
    $('#recommendation-form input[name=email]').val('');
    $('#recommendation-form input[name=event]').val('');
    $('#recommendation-form textarea[name=recommendation]').val('');
    $('.tagsinput').tagsinput('removeAll');;
    $('#recommendation-form').slideDown('fast');
    this.setState({
      alert: ''
    });
  }

  	render() {
    	return (
    			<div className="main">
  			    		<div className="container">
    							<div className="row">
                    <div className="col-md-8 col-md-offset-2 text-center">
            					<h1 className="title">Make a Recommendation</h1>
                      <h4>Recommend a person that you trust.</h4>
            				</div>
    								<div className="col-md-12">
                      {this.state.toUser}
    									<form role="form" id="recommendation-form" onSubmit={this.handleSubmit}>
    										<div className="form-group label-floating">
    											<label className="control-label">Your name</label>
    											<input type="text" name="name" className="form-control" value={(this.props.currentUser)?this.props.currentUser.profile.name:''} readOnly={true}/>
    										</div>
                        {(!this.state.toUser)?<div>
                        <div className="form-group label-floating">
                          <label className="control-label">Who are you recommending?</label>
                          <input type="text" name="toName" className="form-control" />
                        </div>
                        <div className="form-group label-floating">
                          <label className="control-label">His/Her email address?</label>
                          <input type="email" name="email" className="form-control" />
                        </div></div>:''}
                        <div className="form-group label-floating">
                          <label className="control-label">An event you interact with</label>
                        <input type="text" name="event" className="form-control" />
                        </div>
                        <div className="form-group label-floating">
          								<textarea name="recommendation" className="form-control" id="recommendation" rows="6" placeholder="Detail of your recommendation.

                            What does he/she do?

                            Why are you recommending this person?
                            "></textarea>
          							</div>
    										<div className="form-group">
                          <label className="control-label">Endorse 3 Skills (press Enter for each skill)</label>
                          <input name="skills" type="text" className="tagsinput" data-role="tagsinput" data-color="rose"/>
    										</div>
    										<div className="submit text-center">
    											<button type="submit" className="btn btn-primary btn-raised btn-round">Send</button>
    										</div>
    									</form>
                      {this.state.alert}
                      {(this.state.alert == '')?'':
                      <button className="btn btn-primary" onClick={this.recommendAgain}>Recommend Another Person</button>
                    }
    								</div>
    			        </div>
  			       </div>
			    </div>
    	)
  	}
}

export default Recommend;
