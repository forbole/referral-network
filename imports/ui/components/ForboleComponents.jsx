import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

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

export const RecommendationCard = (props) => {
  return (
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
      </div>
    </div>
  )
}
