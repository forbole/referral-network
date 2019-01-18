import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading, FeedCard } from '../components/ForboleComponents.jsx';
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
        // console.log(this.props.timeline);
          if (this.props.timeline.length > 0){
              this.setState({
                  feed: this.props.timeline.map((activity, i) => {
                    return <FeedCard activity={activity} key={i}/>
                  }
                    
                  )
              })
          }
      }
  }

  render() {
    if (this.props.loading){
      return <Loading />
    }
    else{
      return (
        <div className="main">
          {(this.state.feed.length > 0)?<div className="container feed blog-list mansory">
          {this.state.feed}
          </div>:<div className="clearfix container">
              <h4>You don't have connections yet.</h4>
                <p className="lead">No worry! You can now<br/>
                  <Link to="/invite" className="btn btn-primary btn-round btn-lg">Invite</Link><br/>
                  connections and write recommenations to them.<br/>
                  Once they have accepted your invitation,<br/>
                  you can see their activities here.
                  </p>
          </div>}
          
          {/* <div className="create-feed"><Link to="#" className="btn btn-fab btn-primary"  onClick={() => this.setState({ isPaneOpen: true })}><i className="material-icons">create</i></Link></div> */}
        </div>
      );
    }
    
  }
}

export default Timeline;
