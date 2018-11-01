import React, { Component } from 'react';
import moment from 'moment';
import { Loading, ContributionListCard } from '../components/ForboleComponents.jsx';

class Contributions extends Component {
  constructor(props){
    super(props);
  }

  getToUserName(contrib){
    switch(contrib.type){
      case "recommendations":
        return contrib.reco().acceptor();
      case "invites":
        return contrib.invite().acceptor();
      default:
        return '';
    }
  }

  render(){
    if (this.props.loading){
      return <Loading />
    }
    else if (_.isEmpty(this.props.contributions)){
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
            {/* <ContributionListCard
              type="introduction"
              from="Kwun Yeung"
              to='Sami Yim'
              object="Roy Kwok"
              time='ISODate("2018-08-04T06:31:10.204Z")'
              score={5}
            />
            <ContributionListCard
              type="referral"
              from="Kwun Yeung"
              to='Joe Wong'
              time='ISODate("2018-08-04T06:31:10.204Z")'
              score={5}
            />
            <ContributionListCard
              type="share"
              from="Kwun Yeung"
              to='Vennis Ma'
              time='ISODate("2018-08-04T05:23:00.204Z")'
              score={2}
            />
            <ContributionListCard
              type="comment"
              from="Kwun Yeung"
              to='Terence Lam'
              time='ISODate("2018-08-03T14:24:10.204Z")'
              score={1}
            />
            <ContributionListCard
              type="post"
              from="Kwun Yeung"
              to=''
              time='ISODate("2018-08-03T10:23:00.204Z")'
              score={2}
            />
            <ContributionListCard
              type="connection"
              from="Kwun Yeung"
              to='Vennis Ma'
              time='ISODate("2018-08-02T23:24:10.204Z")'
              score={1}
            />
            <ContributionListCard
              type="blog"
              from="Kwun Yeung"
              to='Step-by-step to join Cosmos Hub testnet'
              time='ISODate("2018-08-02T22:23:00.204Z")'
              score={10}
            />
              <ContributionListCard
                type="upvote"
                from="Kwun Yeung"
                to='Terence Lam'
                object='answer'
                time='ISODate("2018-08-02T18:24:10.204Z")'
                score={1}
              />
              <ContributionListCard
                type="downvote"
                from="Kwun Yeung"
                to='Rachel Lau'
                object='recommendation'
                time='ISODate("2018-08-02T18:23:00.204Z")'
                score={2}
              /> */}
              {this.props.contributions.map((contrib, i) =>
                <ContributionListCard key={i}
                  type={contrib.type}
                  from={this.props.user.profile.name}
                  to={this.getToUserName(contrib)}
                  time={contrib.createdAt}
                  score={contrib.score}
                />
              )}

            </div>
          </div>
      </div>
    </div>;
  }
  }
}

export default Contributions
