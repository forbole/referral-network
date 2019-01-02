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
        {/* <FeedCard 
                // cardImage="https://media.licdn.com/media-proxy/ext?w=1280&h=720&f=pj&hash=ghKQztcNOdvpei0m63j%2FDm4kwGk%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6jnhodx1Ey9KGTqAGj6E5DQJHUA3L0CHH05IbfPWi9cJPffeaooUBFfSkJjQA1eOi1EmXmGo7uKoi8L9RxjMXhJ8b5aRUPbhU4hGUB5sE-Pg"
                // category="Why Design Thinking"
                message={<div><Link to="#">Kendall Jenner</Link> has just introduced <Link to="#">Marc Jacob</Link> to <Link to="#">Gurjeet Chima</Link>.</div>}
                name="Kendall Jenner"
                headline="American Model"
                timeago="Now"
                avatar="/img/faces/kendall.jpg"
                introA="/img/faces/marc.jpg"
                introB="/img/faces/gurjeet-chima.jpg"
                likes={38}
                liked={true}
                comments={15}
                shares={279}
            />
        <FeedCard 
                cardImage="https://media.licdn.com/media-proxy/ext?w=1280&h=720&f=pj&hash=ghKQztcNOdvpei0m63j%2FDm4kwGk%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6jnhodx1Ey9KGTqAGj6E5DQJHUA3L0CHH05IbfPWi9cJPffeaooUBFfSkJjQA1eOi1EmXmGo7uKoi8L9RxjMXhJ8b5aRUPbhU4hGUB5sE-Pg"
                category="Why Design Thinking"
                message="Studies suggest that Design Thinking can be used successfully within any industry that aims to focus on the end customer."
                name="Sami Yim"
                headline="Brand Manager"
                timeago="26 seconds ago"
                avatar="/img/faces/sami-yim.jpg"
                date="Jun 29, 2018"
                likes={523}
                liked={true}
                comments={78}
                shares={36}
            />
        <FeedCard 
                cardImage="https://cdn-images-1.medium.com/max/800/1*qvCHBSU0s6uvamb99a_EIg.jpeg"
                category="Blockchain"
                title="Your recommendations can change the lives of others"
                name="Terence Lam"
                headline="Co-Founder@Forbole"
                timeago="5 minutes ago"
                avatar="/img/faces/terence-lam.jpg"
                date="Jun 29, 2018"
                likes={523}
                liked={true}
                comments={78}
                shares={36}
            />
             */}
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
