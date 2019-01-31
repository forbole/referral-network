import React, { Component } from 'react';
import { ConnectionsListCard } from '../components/ForboleComponents.jsx';
import { Link } from 'react-router-dom';

class Connections extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if (_.isEmpty(this.props.connections)){
      return <div className="card"><div className="card-content"><h6>No connections yet.</h6></div></div>;
    }
    else{
    return <div>
      <div className="container">
        <div className="invite-lead"><Link to="/invite" className="btn btn-primary btn-round">Invite</Link> <span>your trusted friends and grow your Contribution Scores.</span></div>
        <div className="row connections">
          <div className="col-md-12">
            </div>
            <div className="col-md-8">
              {this.props.connections.map((connection, i) =>
                <ConnectionsListCard
                  key={i}
                  picture={connection.user(this.props.user._id).profilePic()}
                  username={connection.user(this.props.user._id).username}
                  name={connection.user(this.props.user._id).profile.name}
                  title={connection.user(this.props.user._id).username}
                  recoCount={connection.user(this.props.user._id).recoCount()}
                  skills={(connection.user(this.props.user._id).skills) ? connection.user(this.props.user._id).skills.slice(0,3):[]}
                  otherSkills={(connection.user(this.props.user._id).skills) ? (connection.user(this.props.user._id).skills.length-3):0}
                />
              )}
            </div>
          </div>
      </div>
    </div>;
  }
  }
}

export default Connections
