import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Wallet extends Component {
    constructor(props){
        super(props);
    }

    sendCoin = () => {  // example: send 1 steak here
        Meteor.call('fbcli.sendCoin', 'cosmosaccaddr1qlcz62t2j78643g2w33zdlg78l3662ev9c63j0', 1, 'sherry', '1234567890', 3, 0, 200000, (error, result) => {
            console.log(result);
        });
    } 
 
    createAccount = () => {
        Meteor.call('fbcli.createAccount', this.refs.username.value, (error, result) => { 
            console.log(result);
        });
    }

    sendContribInvite = () => {  //example input
        Meteor.call('fbcli.sendContrib', 'cosmosaccaddr1f3uspmas856c5583kf2m2sg2kdv2sa4urdk5td' , 'invite', 'adcbef11', 'sherry', '2018-07-30T12:57:00Z', 4, 0, 200000, 'acbd2341', (error, result) => {
            console.log(result);
        });
    }

    sendContribReco = () => {  // example input
        Meteor.call('fbcli.sendContrib', 'cosmosaccaddr1f3uspmas856c5583kf2m2sg2kdv2sa4urdk5td' , 'recommend', 'abcdef12', 'sherry', '2018-07-30T12:58:00Z', 5, 0, 200000, 'acbd2341', (error, result) => {
            console.log(result); 
        });
    } 
  
    sendContribVote = () => {  // example input, the last param is necessary (votetype)
        Meteor.call('fbcli.sendContrib', 'cosmosaccaddr1f3uspmas856c5583kf2m2sg2kdv2sa4urdk5td', 'vote', 'abcdef13', 'sherry', '2018-07-30T12:59:00Z', 6, 0, 200000, '766f7465', 'upvote', (error, result) => {
            console.log(result); 
        }); 
    }
  
    checkStatus = () => {
        Meteor.call('fbcli.checkStatus', (error, result) => {
            console.log(JSON.parse(result)); 
        })
    }

    render(){
        return (
            <div className="container">
                <h2>Wallet</h2>
                <button className="btn btn-primary" onClick={this.sendCoin}>Send 1 Coin</button>
                <input className="form-control" ref="username" />
                <button className="btn btn-primary" onClick={this.createAccount}>Create Account</button>
                <button className="btn btn-primary" onClick={this.sendContribReco}>Send Recommendation</button>
                <button className="btn btn-primary" onClick={this.sendContribVote}>Send Vote</button>
                <button className="btn btn-primary" onClick={this.checkStatus}>Check Status</button>
                <button className="btn btn-primary" onClick={this.sendContribInvite}>Send Invitation</button>
            </div>
        )
        
    }
}
        
export default Wallet;