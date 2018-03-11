import React, { Component } from 'react';

class Recommendations extends Component {
  	render() {
    	return (
    		<div className="tab-pane" id="recommendations">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="card card-testimonial">
                <div className="icon">
                  <i className="material-icons">format_quote</i>
                </div>
                <div className="card-content">
                  <blockquote className="card-description blockquote">
                    <p>Kwun always keeps abreast with the latest development of multimedia technology. He shows to me high degree of management skill with junior colleagues. He shows also excellent EQ when handling difficult tasks and clients.</p>
                    <p>He is a great business partner, colleague and friend to work with.</p>
                  </blockquote>
                </div>

                <div className="footer">
                  <h4 className="card-title">Terence Lam</h4>
                  <h6 className="category">@terencelam</h6>
                  <div className="card-avatar">
                    <a href="#">
                      <img className="img" src="/img/faces/terence-lam.jpg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card card-testimonial">
                <div className="icon">
                  <i className="material-icons">format_quote</i>
                </div>
                <div className="card-content">
                  <blockquote className="card-description blockquote">
                    <p>Kwun is a multi-talented problem solver. He was the web / IT master and graphic design person in the team who always up to challenge and provide design solutions with strategic thinking toward positive and measurable result. He ease concern and make the management worries-free. I am appreciated and delighted to have Kwun in the team, and I would recommend him to all employer with no hesitation.</p>
                  </blockquote>
                </div>

                <div className="footer">
                  <h4 className="card-title">Sami Edger</h4>
                  <h6 className="category">@samiyim</h6>
                  <div className="card-avatar">
                    <a href="#">
                      <img className="img" src="/img/faces/sami-yim.jpg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className="card card-testimonial">
                <div className="icon">
                  <i className="material-icons">format_quote</i>
                </div>
                <div className="card-content">
                  <blockquote className="card-description blockquote">
                    <p>While studying for my Masters at University of Edinburgh I had the good fortune to work with him as part of a project team. I found Kwun to be a mature, honest a direct person, with a pleasant manner and approachable demeanor.</p>
                    <p>His technical skills were also excellent. A competent coder coupled with excellent design skills meant he was a tremendous asset to the project team. I was a pleasure to work with him and would not hesitate to seek his advice or skills when needed.</p>
                  </blockquote>
                </div>

                <div className="footer">
                  <h4 className="card-title">Colin Calnan</h4>
                  <h6 className="category">@colincalnan</h6>
                  <div className="card-avatar">
                    <a href="#">
                      <img className="img" src="/img/faces/colin-calnan.jpg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-50"></div>
        </div>

    	)
  	}
}

export default Recommendations;
