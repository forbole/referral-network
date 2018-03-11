import React, {Component} from 'react';

class Blog extends Component {
  render() {
    return (<div className="tab-pane" id="blog">
      <div className="cards">
        <div className="row">
          <div className="col-md-6 col-lg-4">
          <div className="card card-blog">
            <div className="card-image">
              <a href="#pablo">
                <img className="img" src="/img/examples/card-blog3.jpg"/>
              </a>
              <div className="colored-shadow" style={{backgroundImage: 'url(/img/examples/card-blog3.jpg)',opacity: 1}}></div>
              <div className="ripple-container"></div>
            </div>

            <div className="card-content">
              <h6 className="category text-success">Blockchain</h6>

              <h4 className="card-title">
                <a href="#pablo">Proof-of-Work vs Proof-of-Stake</a>
              </h4>
              <p className="card-description">
                Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
              </p>
              <div className="footer">
                <div className="author">
                  <a href="/profile">
                    <img src="/img/faces/kwun-profile.jpg" alt="..." className="avatar img-raised"/>
                    <span>Kwun Yeung</span>
                  </a>
                </div>
                <div className="stats">
                  <i className="material-icons">schedule</i>
                  5 min read
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
        <div className="card card-blog">
          <div className="card-image">
            <a href="#pablo">
              <img className="img" src="/img/examples/card-blog2.jpg"/>
            </a>
            <div className="colored-shadow" style={{backgroundImage: 'url(/img/examples/card-blog2.jpg)',opacity: 1}}></div>
            <div className="ripple-container"></div>
          </div>

          <div className="card-content">
            <h6 className="category text-success">Technology</h6>

            <h4 className="card-title">
              <a href="#pablo">The programming language you should learn in 2018</a>
            </h4>
            <p className="card-description">
              Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
            </p>
            <div className="footer">
              <div className="author">
                <a href="/profile">
                  <img src="/img/faces/kwun-profile.jpg" alt="..." className="avatar img-raised"/>
                  <span>Kwun Yeung</span>
                </a>
              </div>
              <div className="stats">
                <i className="material-icons">schedule</i>
                8 min read
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 col-lg-4">
      <div className="card card-blog">
        <div className="card-image">
          <a href="#pablo">
            <img className="img" src="/img/examples/card-blog1.jpg"/>
          </a>
          <div className="colored-shadow" style={{backgroundImage: 'url(/img/examples/card-blog1.jpg)',opacity: 1}}></div>
          <div className="ripple-container"></div>
        </div>

        <div className="card-content">
          <h6 className="category text-success">Entrepreneurship</h6>

          <h4 className="card-title">
            <a href="#pablo">Be naughty</a>
          </h4>
          <p className="card-description">
            Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
          </p>
          <div className="footer">
            <div className="author">
              <a href="/profile">
                <img src="/img/faces/kwun-profile.jpg" alt="..." className="avatar img-raised"/>
                <span>Kwun Yeung</span>
              </a>
            </div>
            <div className="stats">
              <i className="material-icons">schedule</i>
              3 min read
            </div>
          </div>
        </div>
      </div>
    </div>

        </div>
      </div>
    </div>)
  }
}

export default Blog;
