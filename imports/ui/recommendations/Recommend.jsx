import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Alert, ProfileCard } from '/imports/ui/components/ForboleComponents.jsx';
// import TextareaCompatible from 'react-textarea-compatible';
import validator from 'validator';

class Recommend extends Component {
  constructor(props){
    super(props);

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
      skillsPass: false,
      sending: false
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
          picture={nextProps.user.profilePic()}
          name={nextProps.user.profile.name}
          headline={nextProps.user.profile.headline}
          position={nextProps.user.profile.position}
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
    $("#recommendation-form button").prop('disabled', true);
    this.setState({sending: true});
    const formData = new FormData(e.target);
    let data = {};
    for (let entry of formData.entries()) {
       data[entry[0]] = entry[1];
    }

    if (this.state.toUserId != ''){
      data.toName = '';
      data.email = '';
    }
    Meteor.call('Recommendations.insert', data.name, data.toName, data.email, data.event, data.recommendation, data.skills, this.state.toUserId, true, (error, result) => {
      if (result){
        this.setState({
          alert: <Alert type="success" text={["Thank you! Your recommendation has been sent to ",<strong key="x">{data.toName}</strong>, "."]} />
        });
        $('#recommendation-form').hide();
        // console.log("reseult: "+result);
        // let options = {
        //   recoId: "",
        //   toUserId: "",
        //   toUser: "",
        //   createdAt: ""
        // }
        // Meteor.call('Activities.add', Meteor.userId(), "recommendation", options);
      }
      if (error){
        $("#recommendation-form button").prop('disabled', true);
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
      sending: false
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
        if (Meteor.userId() == this.props.user._id){
          return <div>You cannot recommend yourself</div>;
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
                        <label className="control-label">An event of your recommendation</label>
                        <input type="text" name="event" className="form-control" required={true} onChange={this.handleInputs} onBlur={this.handleInputsFocus}/>
                        {(this.state.eventTouched&&!this.state.eventPass)?<div className="invalid-feedback">Based on what event (Finished a project? Have good performance in class?) you recommend this person?</div>:''}
                      </div>
                      <div className="form-group label-floating required">
                      <textarea
                        name="recommendation" 
                        className="form-control" 
                        id="recommendation"
                        maxLength={140}
                        rows={6}
                        placeholder="Detail of your recommendation.
                        What does he/she do?
                        Why are you recommending this person? (max 140 characters)"
                        required={true} 
                        onChange={this.handleInputs} 
                        onBlur={this.handleInputsFocus}
                        />
                        {(this.state.recoTouched&&!this.state.recoPass)?<div className="invalid-feedback">Recommendation should contain some contents, pal.</div>:''}
        							</div>
  										<div className="form-group">
                        <label className="control-label">Endorse 3 Skills (press Enter for each skill)</label>
                        <input name="skills" type="text" className="tagsinput" data-role="tagsinput" data-color="rose" onChange={this.handleInputs}/>
  										</div>
  										<div className="submit text-center">
                        {this.state.sending?<div className="alert alert-primary">Please wait while we are sending your recommendation.</div>:''}
  											<button type="submit" className="btn btn-primary btn-raised btn-round" disabled={!this.state.hasErrors}>Send</button>
  										</div>
  									</form>
                    {this.state.alert}
                    {(this.state.alert == '')?'':
                    <Link className="btn btn-primary" to="/invite">Recommend Another Person</Link>
                  }
  								</div>
  			        </div>
  		       </div>
  			   </div>
      	)}
      }
  	}
}

export default Recommend;
