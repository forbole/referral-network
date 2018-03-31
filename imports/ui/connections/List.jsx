import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ConnectionsListCard } from '../components/ForboleComponents.jsx';

class Connections extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if (this.props.connectionsExists){
      // console.log(this.props.connections);
    return <div>
      <div className="container">
        <h3 className="text-center">Your Connections</h3>
        <div className="row connections">
          <div className="col-md-12">
							{/* <select className="selectpicker" value="2" data-style="select-with-transition" title="Sort by: Recently recommended" readOnly>
								<option disabled> Sort by: Recently recommended</option>
								<option value="2" >Recently recommended </option>
								<option value="3">First Name</option>
								<option value="4">Last Name</option>
							</select> */}
            </div>
            <div className="col-md-8">
              {this.props.connections.map((connection, i) =>
                <ConnectionsListCard
                  key={i}
                  picture={connection.user().profile.picture}
                  username={connection.user().username}
                  name={connection.user().profile.name}
                  title={connection.user().username}
                  recoCount={connection.user().recoCount()}
                  skills={(connection.user().skills)?connection.user().skills.slice(0,3):[]}
                  otherSkills={(connection.user().skills)?(connection.user().skills.length-3):0}
                />
              )}

            </div>
          </div>



      </div>
    </div>;
  }
  else{
    return <div>No connections yet.</div>;
  }
  }
}

export default Connections
