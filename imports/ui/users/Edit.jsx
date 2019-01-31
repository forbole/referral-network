import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Skill, RecommendationCard, ProfileUserControl } from '/imports/ui/components/ForboleComponents.jsx';
import { Images } from '../../api/images/images.js';
import { toast } from 'react-toastify';


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
      // console.log('**********************************', this.state.uploading);
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
        // console.log('On end File Object: ', fileObj);
        // Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.image_id":fileObj._id}});
        if (self.state.isCover){
          Meteor.call('images.updateCover', fileObj._id, (err, result) => {
            if (err){
              console.log(err);
              // toast.error(err);
            }

            if (result){
              console.log(result);
              toast.success(result);
            }
          });
        }
        else{
          Meteor.call('images.updateProfilePic', fileObj._id, (err, result) => {
            if (err){
              console.log(err);
              // toast.error(err);
            }
            if (result){
              console.log(result);
              toast.success(result);
            }
          });
        }
      });

      uploadInstance.on('uploaded', function (error, fileObj) {
        // console.log('uploaded: ', fileObj);

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
        // console.log(error);
        console.log('Error during upload: ' + error);
        toast.error(error.message);
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

  handleSubmit(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    for (let entry of formData.entries()) {
       data[entry[0]] = entry[1];
    }

    // console.log(data);
    Meteor.call('users.udpateProfile', data.firstname, data.lastname, data.headline, data.position, data.location, (error, result) => {
      if (result){
        toast.success("Your profile is updated.");
      }
      if (error){
        toast.error(error);
      }
    });
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
                headline={Meteor.user().profile.headline}
                position={Meteor.user().profile.position}
                location={Meteor.user().profile.location}
                edit={true}
              />
              {this.showUploads()}
              <div className="col-md-9">
                <form role="form" id="settings-form" onSubmit={this.handleSubmit} noValidate>
                  <div className="form-group label-floating">
                    <label className="control-label">First Name</label>
                    <input type="text" name="firstname" className="form-control" defaultValue={Meteor.user().profile.firstname} />
                  </div>
                  <div className="form-group label-floating">
                    <label className="control-label">Last Name</label>
                    <input type="text" name="lastname" className="form-control" defaultValue={Meteor.user().profile.lastname} />
                  </div>
                  <div className="form-group label-floating">
                    <label className="control-label">Headline</label>
                    <input type="text"  name="headline" className="form-control" defaultValue={Meteor.user().profile.headline} />
                  </div>
                  <div className="form-group label-floating">
                    <label className="control-label">Current Position</label>
                    <input type="text" name="position" className="form-control" defaultValue={Meteor.user().profile.position} />
                  </div>
                  <div className="form-group label-floating">
                    <label className="control-label">Location</label>
                    <input type="text" name="location" className="form-control" defaultValue={Meteor.user().profile.location} />
                  </div>
                  <div className="submit text-center">
                    <button type="submit" className="btn btn-primary btn-raised btn-round" >Update</button>
                  </div>
                </form>
              </div>
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
