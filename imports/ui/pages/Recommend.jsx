import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, ProfileCard } from '/imports/ui/components/ForboleComponents.jsx';
import validator from 'validator';

class Recommend extends Component {
  constructor(props){
    super(props);
    console.log(props);
    // this.props = props;

    this.state = {
      toUser : '',
      toUserId: '',
      alert: '',
      noErrors: false,
      emailTouched: false,
      emailPass: false,
      ownEmailPass: false,
      toNameTouched: false,
      toNamePass: false,
      eventTouched: false,
      eventPass: false,
      recoTouched: false,
      recoPass: false,
      skillsTouched: false,
      skillsPass: false
    };
  }

  initTags = () => {
    var tagClass = $('.tagsinput').data('color');

    $('.tagsinput').tagsinput({
        tagClass: 'label label-info tag-'+ tagClass +' ',
        maxTags: 3,
        minTags: 3
    });

    $('.bootstrap-tagsinput').addClass('form-control');

    let self = this;

    $('.tagsinput').on('itemAdded', function(){
      self.setState({skillsPass:($('.tagsinput').tagsinput('items').length == 3)}, self.validateForm);

      /*
      if (self.state.toUserId != '') self.setState({hasErrors:(self.state.eventPass&&self.state.recoPass&&self.state.skillsPass)});
      else self.setState({hasErrors:(self.state.toNamePass&&self.state.emailPass&&self.state.ownEmailPass&&self.state.eventPass&&self.state.recoPass&&self.state.skillsPass)});
      */
      // console.log("item added");
      // console.log(self.state);
    });

    $('.tagsinput').on('itemRemoved', function(){
      self.setState({skillsPass:($('.tagsinput').tagsinput('items').length == 3)}, self.validateForm);
    });
  }

  componentDidMount(){
      //Activate tags
      //removed class label and label-color from tag span and replaced with data-color
      this.initTags();
  }

  componentDidUpdate(){
      // this.initTags();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.userExists){
      if (nextProps.user.username){
        const toUser = <ProfileCard
          username={nextProps.user.username}
          picture={nextProps.user.profile.picture}
          name={nextProps.user.profile.name}
          text={"You can recognize "+nextProps.user.profile.name+" by writing her/him a recommendation. Your recommendation will be shown on his/her profile once accepted."}
        />
        this.setState({toUser: toUser, toUserId: nextProps.user._id});
        // $('#recommendation-form input[name=toName]').val(nextProps.user.profile.name);
        // $('#recommendation-form input[name=email]').val(nextProps.user.emails[0].address);
      }
    }
  }

  validateForm = () => {
    if (this.state.toUserId != '') this.setState({hasErrors:(this.state.eventPass&&this.state.recoPass&&this.state.skillsPass)});
    else this.setState({hasErrors:(this.state.toNamePass&&this.state.emailPass&&this.state.ownEmailPass&&this.state.eventPass&&this.state.recoPass&&this.state.skillsPass)});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const formData = new FormData(e.target);
    let data = {};
    for (let entry of formData.entries()) {
       data[entry[0]] = entry[1];
    }

    if (this.state.toUserId != ''){
      data.toName = '';
      data.email = '';
    }
    Meteor.call('Recommendations.insert', data.name, data.toName, data.email, data.event, data.recommendation, data.skills, this.state.toUserId, (error, result) => {
      // console.log(result);
      if (result){
        this.setState({
          alert: <Alert type="success" text={["Thank you! Your recommendation has been sent to ",<strong key="x">{data.toName}</strong>, "."]} />
        });
        $('#recommendation-form').hide();
      }
    });
  }

  handleInputs = (e) => {
    if (e.target.name == "toName") this.setState({toNamePass:!validator.isEmpty(e.target.value)}, this.validateForm);
    if (e.target.name == "email") {
      this.setState({emailPass:validator.isEmail(e.target.value)}, this.validateForm);
      this.setState({ownEmailPass:(e.target.value!=Meteor.user().emails[0].address)}, this.validateForm);
    }
    if (e.target.name == "event") this.setState({eventPass:!validator.isEmpty(e.target.value)}, this.validateForm);
    if (e.target.name == "recommendation") this.setState({recoPass:!validator.isEmpty(e.target.value)}, this.validateForm);


    // console.log(e.target.name);
    // console.log(this.state.hasErrors);
  }

  handleInputsFocus = (e) => {
    if (e.target.name == "toName") this.setState({toNameTouched:true});
    if (e.target.name == "email") this.setState({emailTouched:true});
    if (e.target.name == "event") this.setState({eventTouched:true});
    if (e.target.name == "recommendation") this.setState({recoTouched:true});

    // this.setState({hasErrors:(this.state.toNamePass&&this.state.emailPass&&this.state.ownEmailPass&&this.state.eventPass&&this.state.recoPass&&this.state.skillsPass)});
  }


  recommendAgain = (e) =>{
    e.preventDefault();
    this.props.history.push("/recommend");
    this.setState({
      toUser : '',
      toUserId: '',
      alert: '',
      noErrors: false,
      emailTouched: false,
      emailPass: false,
      ownEmailPass: false,
      toNameTouched: false,
      toNamePass: false,
      eventTouched: false,
      eventPass: false,
      recoTouched: false,
      recoPass: false,
      skillsTouched: false,
      skillsPass: false,
    });

    $('#recommendation-form input[name=toName]').val('');
    $('#recommendation-form input[name=email]').val('');
    $('#recommendation-form input[name=event]').val('');
    $('#recommendation-form textarea[name=recommendation]').val('');
    $('.tagsinput').tagsinput('removeAll');;
    $('.bootstrap-tagsinput').removeClass("bootstrap-tagsinput-max");
    $('#recommendation-form').slideDown('fast');
    this.setState({
      alert: ''
    });
  }

  // recommendNew = (e) => {
  //   e.preventDefault();
  //   // this.setState({redirect: true});
  //   this.props.history.push("/recommend");
  // }
  	render() {
      // if (this.props.loading){
      //   return (<div>Loading...</div>)
      // }
      // else {
      if (this.state.redirect){
        return (
          <Redirect
            to={{
              pathname: "/recommend"
            }}
          />
        )
      }
      else {
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
  									<form role="form" id="recommendation-form" onSubmit={this.handleSubmit} noValidate>
  										<div className="form-group label-floating">
  											<label className="control-label">Your name</label>
  											<input type="text" name="name" className="form-control" value={(Meteor.userId())?Meteor.user().profile.name:''} readOnly={true}/>
  										</div>
                      {(!this.state.toUser && !this.props.loading)?<div>
                      <div className="form-group label-floating required">
                        <label className="control-label">Who are you recommending?</label>
                        <input type="text" name="toName" className="form-control" required={true} onChange={this.handleInputs} onBlur={this.handleInputsFocus}/>
                        {(this.state.toNameTouched&&!this.state.toNamePass)?<div className="invalid-feedback">Please enter the name of the person you are recommending.</div>:''}
                      </div>
                      <div className="form-group label-floating required">
                        <label className="control-label">His/Her email address?</label>
                        <input type="email" name="email" className="form-control" required={true} onChange={this.handleInputs} onBlur={this.handleInputsFocus}/>
                        {(this.state.emailTouched&&!this.state.ownEmailPass&&!this.state.emailPass)?<div className="invalid-feedback">Please enter a valid email address other than yours.</div>:''}
                      </div></div>:''}
                      <div className="form-group label-floating required">
                        <label className="control-label">An event you interact with</label>
                        <input type="text" name="event" className="form-control" required={true} onChange={this.handleInputs} onBlur={this.handleInputsFocus}/>
                        {(this.state.eventTouched&&!this.state.eventPass)?<div className="invalid-feedback">Based on what event/relationship you recommend this person?</div>:''}
                      </div>
                      <div className="form-group label-floating required">
        								<textarea name="recommendation" className="form-control" id="recommendation" rows="6" placeholder="Detail of your recommendation.

                          What does he/she do?

                          Why are you recommending this person?
                          " required={true} onChange={this.handleInputs} onBlur={this.handleInputsFocus} />
                          {(this.state.recoTouched&&!this.state.recoPass)?<div className="invalid-feedback">Recommendation should contain some contents, pal.</div>:''}
        							</div>
  										<div className="form-group">
                        <label className="control-label">Endorse 3 Skills (press Enter for each skill)</label>
                        <input name="skills" type="text" className="tagsinput" data-role="tagsinput" data-color="rose" onChange={this.handleInputs}/>
  										</div>
  										<div className="submit text-center">
  											<button type="submit" className="btn btn-primary btn-raised btn-round" disabled={!this.state.hasErrors}>Send</button>
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
}

export default Recommend;
