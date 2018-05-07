import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="main">
        <div className="container">
          <h1>Forbole</h1>
          <Link to="/invite" className="btn btn-primary btn-round">Invite</Link> a connection.
        </div>

      </div>
    );
  }
}

export default Home;
