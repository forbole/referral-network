import React, { Component } from 'react';

const NotFound = () => {
    return (
      <div id="not-found" class="container">
        <div class="not-found-image">
          <img src="/img/404.svg" alt="" />
        </div>
        <div class="not-found-title">
          <h1>Sorry, that page doesn't exist</h1>
          <a href="/" class="gotohomepage">Go to home</a>
        </div>
      </div>
    )
}

export default NotFound;
