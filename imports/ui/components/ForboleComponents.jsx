import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

export const RecommendationCard = (props) => {
  return (
    <div className="card card-testimonial">
      <div className="card-avatar">
        <Link to="#">
          <img className="img" src="/img/faces/terence-lam.jpg" />
        </Link>
      </div>
      <div className="card-content">
        <h4 className="card-title">{props.createdBy}</h4>
        <h6 className="category text-grey">{props.title}</h6>
        <p className="card-description">
          {props.recommendation}
        </p>
        <div className="footer">
          {props.skills.map((skill, i) => <span className="label label-danger" key={i}>{skill}</span>)}
        </div>
      </div>
    </div>
  )
}
