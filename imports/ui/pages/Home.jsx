import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="main main-raised">
        <div className="container">
          <h1>Forbole</h1>
          <Link to="/recommend" className="btn btn-primary">Invite</Link> a connection by making a recommendation.
        </div>

      </div>
    );
  }
}

export default Home;
