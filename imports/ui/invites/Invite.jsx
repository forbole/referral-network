import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, ProfileCard } from '/imports/ui/components/ForboleComponents.jsx';
import validator from 'validator';

class Invite extends Component {
  constructor(props){
    super(props);

    this.state = {
      toUser : '',
      alert: '',
      noErrors: false,
      emailTouched: false,
      emailPass: false,
      ownEmailPass: false,
      toNameTouched: false,
      toNamePass: false,
      relateTouched: false,
      relatePass: false,
      recommend: false,
      eventTouched: false,
      eventPass: false,
      recoTouched: false,
      recoPass: false,
      skillsTouched: false,
      skillsPass: false,
      sending: false,
      charCount: 0
    };
  }

  initTags = () => {
    var tagClass = $('.tagsinput').data('color');

    $('.tagsinput').tagsinput({
        tagClass: 'label label-info tag-'+ tagClass +' ',
        maxTags: 3
    });

    $('.bootstrap-tagsinput').addClass('form-control');

    let self = this;

    $('.tagsinput').on('itemAdded', function(){
      let skillsLength = $('.tagsinput').tagsinput('items').length;
      self.setState({skillsPass:((skillsLength > 0) && (skillsLength <=3))}, self.validateForm);
    });

    $('.tagsinput').on('itemRemoved', function(){
      let skillsLength = $('.tagsinput').tagsinput('items').length;
      self.setState({skillsPass:((skillsLength > 0) && (skillsLength <=3))}, self.validateForm);
    });
  }

  componentDidMount(){
      //Activate tags
      //removed class label and label-color from tag span and replaced with data-color
      // this.initTags();
  }

  componentDidUpdate(){
      this.initTags();
  }

  validateForm = () => {
    if (this.state.recommend){
      this.setState({hasErrors:(this.state.toNamePass&&this.state.emailPass&&this.state.ownEmailPass&&this.state.relatePass&&this.state.eventPass&&this.state.recoPass&&this.state.skillsPass)});
    }
    else {
      this.setState({hasErrors:(this.state.toNamePass&&this.state.emailPass&&this.state.ownEmailPass&&this.state.relatePass)});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    $("#recommendation-form button").prop('disabled', true);
    this.setState({sending: true});
    const formData = new FormData(e.target);
    let data = {};
    for (let entry of formData.entries()) {
       data[entry[0]] = entry[1];
    }

    if (!this.state.recommend){
      data.event = '';
      data.recommendation = '';
      data.skills = '';
    }
    
    Meteor.call('invite.insert', data.name, data.toName, data.email, data.relationship, data.event, data.recommendation, data.skills, (error, result) => {
      if (result){
        this.setState({
          alert: <Alert type="success" text={["Thank you! Your invitation has been sent to ",<strong key="x">{data.toName}</strong>, "."]} />
        });
        $('#recommendation-form').hide();
      }
      if (error){
        $("#recommendation-form button").prop('disabled', true);
      }
    });
  }

  handleRecommend = (e) => {
    e.preventDefault();
    this.setState({recommend: !this.state.recommend}, this.validateForm);
  }

  handleInputs = (e) => {
    if (e.target.name == "toName") this.setState({toNamePass:!validator.isEmpty(e.target.value)}, this.validateForm);
    if (e.target.name == "email") {
      this.setState({emailPass:validator.isEmail(e.target.value)}, this.validateForm);
      this.setState({ownEmailPass:(e.target.value!=Meteor.user().emails[0].address)}, this.validateForm);
    }
    if (e.target.name == "relationship") this.setState({relatePass:!validator.isEmpty(e.target.value)}, this.validateForm);
    if (e.target.name == "event") this.setState({eventPass:!validator.isEmpty(e.target.value)}, this.validateForm);
    if (e.target.name == "recommendation"){
      this.setState({recoPass:!validator.isEmpty(e.target.value)}, this.validateForm);
      // console.log();
      this.setState({
        charCount:e.target.value.length
      });
      // console.log((e.target.value.length/140)*100);
    } 


  }

  handleInputsFocus = (e) => {
    if (e.target.name == "toName") this.setState({toNameTouched:true});
    if (e.target.name == "email") this.setState({emailTouched:true});
    if (e.target.name == "relationship") this.setState({relateTouched:true});    
    if (e.target.name == "event") this.setState({eventTouched:true});
    if (e.target.name == "recommendation") this.setState({recoTouched:true});

    // this.setState({hasErrors:(this.state.toNamePass&&this.state.emailPass&&this.state.ownEmailPass&&this.state.eventPass&&this.state.recoPass&&this.state.skillsPass)});
  }


  recommendAgain = (e) =>{
    e.preventDefault();
    this.props.history.push("/invite");
    this.setState({
      toUser : '',
      alert: '',
      noErrors: false,
      emailTouched: false,
      emailPass: false,
      ownEmailPass: false,
      toNameTouched: false,
      toNamePass: false,
      relateTouched: false,
      relatePass: false,
      recommend: false,
      eventTouched: false,
      eventPass: false,
      recoTouched: false,
      recoPass: false,
      skillsTouched: false,
      skillsPass: false,
      sending: false,
      charCount: 0
    });

    $('#recommendation-form input[name=toName]').val('');
    $('#recommendation-form input[name=email]').val('');
    $('#recommendation-form input[name=relationship]').val('');
    $('#recommendation-form input[name=event]').val('');
    $('#recommendation-form textarea[name=recommendation]').val('');
    $('.tagsinput').tagsinput('removeAll');;
    $('.bootstrap-tagsinput').removeClass("bootstrap-tagsinput-max");
    $('#recommendation-form').slideDown('fast');
    $("#recommendBtn").prop('disabled', false);
    this.setState({
      alert: ''
    });
  }

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
          					<h1 className="title">Invite a Connection</h1>
                    <h4>Invite a person you know.</h4>
          				</div>
  								<div className="col-md-12">
                    {this.state.toUser}
  									<form role="form" id="recommendation-form" onSubmit={this.handleSubmit} noValidate>
  										<div className="form-group">
  											<label className="control-label">Your name</label>
  											<input type="text" name="name" className="form-control" value={(Meteor.userId())?Meteor.user().profile.name:''} readOnly={true}/>
  										</div>
                      <div className="form-group required">
                        <label className="control-label">Who are you inviting to connect?</label>
                        <input type="text" name="toName" className="form-control" required={true} onChange={this.handleInputs} onBlur={this.handleInputsFocus}/>
                        {(this.state.toNameTouched&&!this.state.toNamePass)?<div className="invalid-feedback">Please enter the name of the person you are recommending.</div>:''}
                      </div>
                      <div className="form-group  required">
                        <label className="control-label">His/Her email address?</label>
                        <input type="email" name="email" className="form-control" required={true} onChange={this.handleInputs} onBlur={this.handleInputsFocus}/>
                        {(this.state.emailTouched&&!this.state.ownEmailPass&&!this.state.emailPass)?<div className="invalid-feedback">Please enter a valid email address other than yours.</div>:''}
                      </div>
                      <div className="form-group  required">
                        <label className="control-label">What is your relationship with this person?</label>
                        <input type="text" name="relationship" className="form-control" required={true} onChange={this.handleInputs} onBlur={this.handleInputsFocus}/>
                        {(this.state.relateTouched&&!this.state.relatePass)?<div className="invalid-feedback">How do you know this person? A friend? Co-worker? Know each other in a meetup?</div>:''}
                      </div>
                      {this.state.recommend?
                      <div id="recommendation-section">
                        <button className="btn btn-danger" onClick={this.handleRecommend}> <i className="material-icons">close</i> Maybe I will recommend a later time.</button>
                        <div className="form-group">
                          <label className="control-label">An event of your recommendation</label>
                          <input type="text" name="event" className="form-control" onChange={this.handleInputs} onBlur={this.handleInputsFocus}/>
                          {(this.state.eventTouched&&!this.state.eventPass)?<div className="invalid-feedback">Based on what event (Finished a project? Have good performance in class?) you recommend this person?</div>:''}
                        </div>
                        <div className="form-group">
                        <textarea
                          name="recommendation" 
                          className="form-control" 
                          id="recommendation"
                          maxLength={350}
                          rows={6}
                          placeholder="Detail of your recommendation.
                          What does he/she do?
                          Why are you recommending this person? (max 350 characters)"
                          required={true} 
                          onChange={this.handleInputs} 
                          onBlur={this.handleInputsFocus}
                          />
                          <div className="progress progress-line-primary input">
                            <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow={this.state.charCount} aria-valuemin="0" aria-valuemax="350" style={{width:(this.state.charCount*100/350).toFixed(2)+"%"}}>
                              <span className="sr-only">{this.state.charCount} characters</span>
                            </div>
                          </div>
                          {(this.state.recoTouched&&!this.state.recoPass)?<div className="invalid-feedback">Recommendation should contain some contents, pal.</div>:''}
                        </div>
                        <div className="form-group">
                          <label className="control-label">Endorse at least 1 max 3 Skills (press Enter for each skill)</label>
                          <input name="skills" type="text" className="tagsinput" data-role="tagsinput" data-color="rose" onChange={this.handleInputs}/>
                        </div>
                      </div>:<button id="recommendBtn" className="btn btn-primary" onClick={this.handleRecommend}>Add a recommedation with this invite?</button>}
  										<div className="submit text-center">
                        {this.state.sending?<div className="alert alert-primary">Please wait while we are sending your invitation.</div>:''}
  											<button type="submit" className="btn btn-primary btn-raised btn-round" disabled={!this.state.hasErrors}>Send</button>
  										</div>
  									</form>
                    {this.state.alert}
                    {(this.state.alert == '')?'':
                    <button className="btn btn-primary" onClick={this.recommendAgain}>Invite Another Person</button>
                  }
  								</div>
  			        </div>
  		       </div>
  			   </div>
      	)
      }
  	}
}

export default Invite;
