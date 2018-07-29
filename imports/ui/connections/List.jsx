import React, { Component } from 'react';
import { ConnectionsListCard } from '../components/ForboleComponents.jsx';

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
        <h3 className="text-center">{this.props.user.profile.name}'s Connections</h3>
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
                  skills={(connection.user(this.props.user._id).skills)?connection.user().skills.slice(0,3):[]}
                  otherSkills={(connection.user(this.props.user._id).skills)?(connection.user().skills.length-3):0}
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
