import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const ValidateSuccess = () => (
  <span className="form-control-feedback">
    <i className="material-icons">done</i>
  </span>
);

export const ValidateFail = () => (
  <span class="form-control-feedback">
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
        <Link to={"/profile/"+props.username}>
          <img className="img" src={props.picture} />
        </Link>
      </div>
      <div className="card-content text-center">
        <h4 className="card-title">{props.name}</h4>
        <h6 className="category text-muted">@{props.username}</h6>

        <p className="card-description">
          {props.text}
        </p>
      </div>
    </div>)
}

export const RecommendationCard = (props) => {
  return (
    <div className="col-md-6 col-lg-4">
    <div className="card card-testimonial">
      <div className="card-avatar">
        <Link to={"/profile/"+props.username}>
          <img className="img" src={props.picture} />
        </Link>
      </div>
      <div className="card-content">
        <h4 className="card-title">{props.createdBy}</h4>
        <p className="category text-grey">@{props.title}</p>
        <p className="time text-grey">Recommended on {moment(props.createdAt).format("Do MMM YYYY")}</p>
        <p className="card-description">
          {props.recommendation}
        </p>
        <div className="footer skills">
          {(props.skills)?props.skills.map((skill, i) => <Skill key={i} skill={skill} />):''}
        </div>
        <blockquote className="blockquote">{props.event}</blockquote>
      </div>
    </div>
  </div>
  )
}

export const ConnectionsListCard = (props) => {
  return (
    <div className="card">
      <div className="card-body media">
        <div className="row">
          <div className="col-xs-3">
            <Link to={"/profile/"+props.username} className="pull-left">
              <div className="avatar">
                <img src={props.picture} />
              </div>
            </Link>
          </div>
          <div className="col-xs-9">
            <h4 className="media-heading">{props.name}</h4>
            <h6 className="media-muted">{props.title}</h6>
          </div>
          <div className="media-footer col-xs-12">
            {(props.recoCount > 0)?<p>Received {props.recoCount} recommendations.</p>:''}
            {(props.skills.length > 0)?props.skills.map((skill, i) =>
              <span className="label label-rose" key={i}>{skill}</span>
            ):<div>No recommendation yet. <Link to={"/recommend/"+props.title} className="btn btn-primary btn-round btn-sm">Recommend</Link></div>}
          </div>
          {(props.otherSkills > 0)? <small>And {props.otherSkills} more skills</small>: ''}

        </div>
      </div>
    </div>
  )
}
