import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FeedCard } from '../components/ForboleComponents.jsx';
import 'react-sliding-pane/dist/react-sliding-pane.css';

class Timeline extends Component {
  constructor(props){
    super(props);
    this.state = {
        feed: <div></div>
    }
  }

  componentDidUpdate(prevProps){
      if (this.props.timeline != prevProps.timeline){
          if (this.props.timeline.length > 0){
              this.setState({
                  feed: this.props.timeline.map((activity, i) => 
                    <FeedCard activity={activity} key={i} />
                  )
              })
          }
      }
  }

  render() {
    return (
      <div className="main">
        <div className="container feed blog-list mansory">
        {this.state.feed}
        </div> 
        <div className="clearfix container">
              <Link to="/invite" className="btn btn-primary btn-round">Invite</Link> a connection.
        </div>
        {/* <div className="create-feed"><Link to="#" className="btn btn-fab btn-primary"  onClick={() => this.setState({ isPaneOpen: true })}><i className="material-icons">create</i></Link></div> */}
      </div>
    );
  }
}

export default Timeline;
