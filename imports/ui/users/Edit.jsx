import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Skill, RecommendationCard, ProfileUserControl } from '/imports/ui/components/ForboleComponents.jsx';
import { Images } from '../../api/images/images.js';


class ProfileEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      uploading: [],
      progress: 0,
      inProgress: false
    }
  }

  componentDidMount(){
    $(".fileinput").on('change.bs.fileinput', this.uploadIt);
  }

  showUploads() {
    if (!_.isEmpty(this.state.uploading)) {
      console.log('**********************************', this.state.uploading);
      return <div>
        {this.state.uploading.file.name}

        <div className="progress progress-bar-default">
          <div style={{width: this.state.progress + '%'}} aria-valuemax="100"
             aria-valuemin="0"
             aria-valuenow={this.state.progress || 0} role="progressbar"
             className="progress-bar">
            <span className="sr-only">{this.state.progress}% Complete (success)</span>
            <span>{this.state.progress}%</span>
          </div>
        </div>
      </div>
    }
  }

  uploadIt(e){
    console.log(e);
    e.preventDefault();
    let self = this;

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];

      if (file) {
        let uploadInstance = Images.insert({
          file: file,
          meta: {
            // locator: self.props.fileLocator,
            userId: Meteor.userId() // Optional, used to check on server for file tampering
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false);

        self.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', function () {
          console.log('Starting');
        });

        uploadInstance.on('end', function (error, fileObj) {
          console.log('On end File Object: ', fileObj);
        });

        uploadInstance.on('uploaded', function (error, fileObj) {
          console.log('uploaded: ', fileObj);

          // Remove the filename from the upload box
          self.refs['fileinput'].value = '';

          // Reset our state for the next file
          self.setState({
            uploading: [],
            progress: 0,
            inProgress: false
          });
        });

        uploadInstance.on('error', function (error, fileObj) {
          console.log('Error during upload: ' + error);
        });

        uploadInstance.on('progress', function (progress, fileObj) {
          console.log('Upload Percentage: ' + progress);
          // Update our progress bar
          self.setState({
            progress: progress
          })
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }

  render(){
    let headerBg = {
      backgroundImage:'url(/img/kwun-profile-header.jpg)',
      backgroundPosition: 'center center'
    };

    return (
      <div className="profile-page">
          <div className="page-header header-filter" data-parallax="true" style={headerBg}>
          </div>

          <div className="main">
            <div className="profile-content container">

              <ProfileUserControl
                picture={Meteor.user().profile.picture}
                name={Meteor.user().profile.name}
                username={Meteor.user().username}
                userId={Meteor.userId()}
                firstname={Meteor.user().profile.firstname}
              />
              <div className="fileinput text-center" data-provides="fileinput">
								<div>
									<span className="btn btn-raised btn-round btn-default btn-file">
										<span>New Profile Photo</span>
										<input type="file" name="profile" ref="fileinput" />
                  </span>
								</div>
							</div>
              {this.showUploads()}
            </div>
          </div>
        </div>
      )
  }
}

export default ProfileEdit;
