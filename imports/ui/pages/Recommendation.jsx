import React, { Component } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'

class Recommendation extends Component {
  constructor(props){
    super(props);
    this.state = {
      fromDate: moment("20180311", "YYYYMMDD").fromNow()
    }
  }

  	render() {
    	return (
    		<div className="contact-page">
    			<div className="main main-raised">
					<div className="contact-content">
			    		<div className="container">
			    			<h2 className="title">You are recommended!</h2>
			    			<div className="col-md-12">
			    				<h5>You've got a recommendation from <Link to="#"><em>Terence Lam</em></Link> {this.state.fromDate}</h5>
								<div className="card card-testimonial">
									<div className="icon">
										<i className="material-icons">format_quote</i>
									</div>
									<div className="card-content">
										<blockquote className="blockquote">
											<p>Kwun always keeps abreast with the latest development of multimedia technology. He shows to me high degree of management skill with junior colleagues. He shows also excellent EQ when handling difficult tasks and clients.</p>
                      <p>He is a great business partner, colleague and friend to work with.</p>
										</blockquote>
										<span className="label label-danger">Blockchain</span>
										<span className="label label-danger">UX/UI</span>
										<span className="label label-danger">Entrepreneurship</span>
									</div>

									<div className="footer">
										<h4 className="card-title">Terence Lam</h4>
										<h6 className="category">@terencelam</h6>
										<div className="card-avatar">
											<Link to="#">
												<img className="img" src="/img/faces/terence-lam.jpg" />
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="space-50"></div>
							<button className="btn btn-primary btn-round">Accept</button>
							<div className="space-50"></div>
						</div>
					</div>
				</div>
    		</div>
    	)
  	}
}

export default Recommendation;
