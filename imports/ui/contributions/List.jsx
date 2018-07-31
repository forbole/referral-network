import React, { Component } from 'react';
import moment from 'moment';
// import { ConnectionsListCard } from '../components/ForboleComponents.jsx';

class Contributions extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if (_.isEmpty(this.props.contributions)){
      return <div className="container">
        <h3 className="text-center">{this.props.user.profile.name}'s Contributions</h3>
        <div className="card"><div className="card-content"><h6>No contribution yet.</h6></div></div>
        </div>;
    }
    else{
    return <div>
      <div className="container">
        <h3 className="text-center">{this.props.user.profile.name}'s Contributions</h3>
        <div className="row contributions">
            <div className="col-md-12">
              {this.props.contributions.map((contrib, i) =>
                <div className="card" key={i}>
                  
                </div>
              )}
            </div>
          </div>
      </div>
    </div>;
  }
  }
}

export default Contributions
