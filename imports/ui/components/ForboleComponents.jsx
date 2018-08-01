import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const Loading = ({size = 42}) => (
  <img src="/img/loading.svg" height={size} width={size} />
);

export const ValidateSuccess = () => (
  <span className="form-control-feedback">
    <i className="material-icons">done</i>
  </span>
);

export const ValidateFail = () => (
  <span className="form-control-feedback">
    <i className="material-icons">clear</i>
  </span>
)

export const Alert = (props) => {
  return (
    <div className={"alert alert-"+props.type}>
      <div className="container">
        <div className="alert-icon">
          <i className="material-icons">check</i>
        </div>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">
            <i className="material-icons">clear</i>
          </span>
        </button>
        {props.text}
      </div>
    </div>
  )
}

export const Skill = (props) => {
  return(
    <span className="label label-rose">{props.skill}</span>
  )
}

export const ProfileCard = (props) => {
    return (<div className="card card-profile card-plain">
      <div className="card-avatar">
        <Link to={"/@"+props.username}>
          <img className="img" src={props.picture} />
        </Link>
      </div>
      <div className="card-content text-center">
        <h4 className="card-title">{props.name}</h4>
        <div className="category text-grey"><span className="headline">{props.headline}</span><br/><span className="position">{props.position}</span></div>
        <p className="card-description">
          {props.text}
        </p>
      </div>
    </div>)
}

export class RecommendationCard extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let bg = {
      backgroundImage: 'url('+this.props.picture+')'
    }
    return (
      <div className="card card-testimonial">
        <div className="card-avatar" style={bg}>
          <Link to={"/@"+this.props.username} />
        </div>
        <div className="card-content">
          <h4 className="card-title">{this.props.createdBy}</h4>
          <p className="category text-grey">{this.props.title}</p>
          <p className="time text-grey">Recommended on {moment(this.props.createdAt).format("Do MMM YYYY")}</p>
          <p className="card-description">
            {this.props.recommendation}
          </p>
          <div className="footer skills">
            {(this.props.skills)?this.props.skills.map((skill, i) => <Skill key={i} skill={skill} />):''}
          </div>
          <blockquote className="blockquote">{this.props.event}</blockquote>
          {(this.props.notAccepted)?
            <div className="footer text-danger">
              <div className="not-accepted">
                <i className="material-icons">error_outline</i> Not accepted yet
	    	      </div>
            </div>:''}
            {(this.props.acceptButton)?<div className="footer">
              <Link to={"/recommendation/accept/"+this.props.recoId} className="btn btn-primary">Response</Link>
            </div>:''}
        </div>
      </div>
    )
  }
}

export class InvitationCard extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let bg = {
      backgroundImage: 'url('+this.props.picture+')'
    }
    return (
      <div className="card card-testimonial">
        <div className="card-avatar" style={bg}>
          <Link to={"/@"+this.props.username} />
        </div>
        <div className="card-content">
          <h4 className="card-title">{this.props.createdBy}</h4>
          <p className="category text-grey">{this.props.title}</p>
          <blockquote className="blockquote">{this.props.relationship}</blockquote>
          {(this.props.recommendation)?<div>
          <p className="time text-grey">Recommended on {moment(this.props.createdAt).format("Do MMM YYYY")}</p>
          <p className="card-description">
            {this.props.recommendation}
          </p>
          <div className="footer skills">
            {(this.props.skills)?this.props.skills.map((skill, i) => <Skill key={i} skill={skill} />):''}
          </div>
          <blockquote className="blockquote">{this.props.event}</blockquote></div>:''}
        </div>
      </div>
    )
  }
}

export class ContributionListCard extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let action = "";
    let object = "";
    switch (this.props.type){
      case "recommendations":
        action = "recommended";
        object = <Link to={"/@"+this.props.to.username}>{this.props.to.profile.name}</Link>
        break;
    }
    return <div className="card contribution">
      <div className="card-content clearfix">
        <div className="col-xs-9">{this.props.from} <span className="text-info">{action}</span> {object} <em>{moment(this.props.time, "YYYYMMDD").fromNow()}</em>.</div>
        <div className="col-xs-3 text-right"><span className="label label-success">+ {this.props.score}</span></div>
      </div>
    </div>
  }
}
export class ConnectionsListCard extends Component {
  constructor(props){
    super(props);
  }
  render(){
    let bg = {
      backgroundImage: 'url('+this.props.picture+')'
    }
    return (
      <div className="card">
        <div className="card-body media">
          <div className="row">
            <div className="col-xs-3">
              <Link to={"/@"+this.props.username} className="pull-left">
                <div className="avatar" style={bg} />
              </Link>
            </div>
            <div className="col-xs-9">
              <h4 className="media-heading">{this.props.name}</h4>
              <h6 className="media-muted">{this.props.title}</h6>
            </div>
            <div className="media-footer col-xs-12">
              {(this.props.recoCount > 0)?<p>Received {this.props.recoCount} recommendations.</p>:''}
              {(this.props.skills.length > 0)?this.props.skills.map((skill, i) =>
                <span className="label label-rose" key={i}>{skill}</span>
              ):<div>No recommendation yet. <Link to={"/recommend/"+this.props.title} className="btn btn-primary btn-round btn-sm">Recommend</Link></div>}
              {(this.props.otherSkills > 0)? <small>And {this.props.otherSkills} more skills</small>: ''}
            </div>

          </div>
        </div>
      </div>
    )
  }

}

export class BlogCard extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div className="card card-blog">
      <div className="card-image">
        <Link to="#pablo">
          <img className="img" src={this.props.cardImage} />
	    								</Link>
          {/* <div className="colored-shadow" style={{backgroundImage: "url(/img/examples/blog8.jpg)", opacity: 1}}></div> */}
        <div className="ripple-container"></div>
        </div>
        <div className="card-content">
          <h6 className="category text-danger">
            <i className="material-icons">trending_up</i> Trending
	    								</h6>
          <h4 className="card-title">
            <Link to="#pablo">{this.props.title}</Link>
          </h4>
          <div className="footer">
            <div className="author">
              <Link to="#pablo">
                <img src={this.props.avatar} alt="..." className="avatar img-raised" />
                  <span>{this.props.name}</span>
	    	                                    </Link>
	    	                                </div>
              <div className="stats">
                <i className="material-icons">schedule</i> {this.props.time} read
	    	                                </div>
            </div>
          </div>
        </div>
  }
}
export class ProfileUserControl extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();
  }

  render(){
    let bg = {
      backgroundImage: 'url('+this.props.picture+')'
    }
    return (<div className="profile row">
      <div className="col-xs-6 col-xs-offset-3">
         <div className="">
              <div className="avatar img-circle img-raised" style={bg}>
              </div>
          </div>
        </div>
        <div className="col-xs-3 follow">
          {(this.props.userId != Meteor.userId())?
           (<Link to={"/recommend/"+this.props.username} className="btn btn-fab btn-primary" rel="tooltip" title={"Recommend "+this.props.firstname}>
                  <i className="material-icons">add</i>
              </Link>):''}
              {(this.props.edit)?<div className="fileinput profile text-center" data-provides="fileinput" rel="tooltip" title="Replace profile picture">
                <div>
                  <span className="btn btn-fab btn-info btn-file">
                    <i className="material-icons">insert_emoticon</i>
                    <input type="file" name="profile" />
                  </span>
                </div>
              </div>:''}
        </div>
        <div className="name col-xs-12">
            <h4 className="title">{this.props.name}</h4>
        <div className="category text-grey"><span className="headline">{(this.props.headline != null) ? this.props.headline : <em>Headline not provided yet</em>}</span><br /><span className="position">{(this.props.position != null) ? this.props.position:<em>Position not provided yet</em>}</span></div>
        <div className="other-info category text-muted"><span><i className="material-icons">location_on</i>{(this.props.location != null) ? this.props.location:<em>Location not provided yet</em>}</span> {/*<span><i className="material-icons">grade</i>{this.props.reputation}</span>*/}</div>
            <div className="row">
            <div className="records col-md-6 col-md-offset-3 clearfix">
              <div className="record text-grey col-xs-4"><Link to={"/@"+this.props.username+"/connections"}><strong>{this.props.connections}</strong> Connections</Link></div>
              <div className="record text-grey col-xs-4"><Link to={"/@"+this.props.username+"/contributions"}><strong>{this.props.scores}</strong> Scores</Link></div>
              <div className="record text-grey col-xs-4 rank"><img src="/img/icons/diamond.png" /> Conductor</div>
            </div>
            </div>
        </div>
    </div>)
  }

}
