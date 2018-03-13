import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
      <div id="not-found" className="container">
        <div className="not-found-image">
          <img src="/img/404.svg" alt="" />
        </div>
        <div className="not-found-title">
          <h1>Sorry, that page doesn't exist</h1>
          <Link to="/" className="gotohomepage">Go to home</Link>
        </div>
      </div>
    )
}

export default NotFound;
