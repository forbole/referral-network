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
      inProgress: false,
      isCover: false,
      attachCoverButton: true,
      attachProfileButton: true
    }
    this.uploadIt = this.uploadIt.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.state.attachCoverButton){
      $(".fileinput.cover").on('change.bs.fileinput', this.uploadIt);
      this.setState({attachCoverButton: false});
    }

    if (this.state.attachProfileButton){
      $(".fileinput.profile").on('change.bs.fileinput', this.uploadIt);
      this.setState({attachProfileButton: false});
    }

    $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

  }

  showUploads() {
    if (!_.isEmpty(this.state.uploading)) {
      console.log('**********************************', this.state.uploading);
      return (<div>
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
      </div>)
    }
  }

  startUpload(file, self){
    // let self = this;
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
        // Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.image_id":fileObj._id}});
        if (self.state.isCover){
          Meteor.call('images.updateCover', fileObj._id, (err, result) => {
            if (err){
              console.log(err);
            }
          });
        }
        else{
          Meteor.call('images.updateProfilePic', fileObj._id, (err, result) => {
            if (err){
              console.log(err);
            }
          });
        }
      });

      uploadInstance.on('uploaded', function (error, fileObj) {
        console.log('uploaded: ', fileObj);

        // Remove the filename from the upload box
        // self.refs['fileinput'].value = '';
        $("input[name=profile]").val("");
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

  uploadIt(e){
    e.preventDefault();
    let el = $(e.currentTarget).find("input[type=file]")[0];
    let self = this;

    if (el.files && el.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = el.files[0];

      if (el.getAttribute('name') == 'cover'){
        this.setState({isCover:true}, () => {this.startUpload(file, self)})
      }
      else{
        this.setState({isCover:false}, () => {this.startUpload(file, self)})
      }

      // if (file){
      //   this.startUpload(file, self);
      // }
    }
  }

  render(){

    if (!this.props.loading){
      let headerBg = {
        backgroundImage:'url('+Meteor.user().coverPic()+')',
        backgroundPosition: 'center center'
      };
      // console.log(Meteor.user().profilePic());
    return (
      <div className="profile-page">
          <div className="page-header header-filter" data-parallax="true" style={headerBg}>
            <div className="fileinput cover text-center" data-provides="fileinput" rel="tooltip" title="Replace cover photo">
              <div>
                <span className="btn btn-fab btn-info btn-file">
                  <i className="material-icons">insert_photo</i>
                  <input type="file" name="cover" />
                </span>
              </div>
            </div>
          </div>

          <div className="main">
            <div className="profile-content container">

              <ProfileUserControl
                picture={Meteor.user().profilePic()}
                name={Meteor.user().profile.name}
                username={Meteor.user().username}
                userId={Meteor.userId()}
                firstname={Meteor.user().profile.firstname}
                edit={true}
              />
              {this.showUploads()}
            </div>
          </div>
        </div>
      )}
      else{
        return <div></div>
      }
  }
}

export default ProfileEdit;
