import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';


class Wallet extends Component {
    constructor(props){
        super(props);
    }

    sendCoin = () => {
        Meteor.call('fbcli.sendCoin', 'aaaa', 'bbbb', 'cccc', 'dddd', 0, (error, result) => {
            console.log(result);
        });
    }

    createAccount = () => {
        Meteor.call('fbcli.createAccount', 'kwunyeung', '9876543210', 0, (error, result) => {
            console.log(result);
        });
    }

    sendContribReco = () => {
        Meteor.call('fbcli.sendContribReco', 'aaaa', 'bbbb', 'cccc', 'dddd', 0, (error, result) => {
            console.log(result);
        });
    }

    sendContribVote = () => {
        Meteor.call('fbcli.sendContribVote', 'aaaa', 'bbbb', 'cccc', 'dddd', 0, (error, result) => {
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
                <button className="btn btn-primary" onClick={this.createAccount}>Create Account</button>
                <button className="btn btn-primary" onClick={this.sendContribReco}>Send Recommendation</button>
                <button className="btn btn-primary" onClick={this.sendContribVote}>Send Vote</button>
                <button className="btn btn-primary" onClick={this.checkStatus}>Check Status</button>
            </div>
        )
        
    }
}
        
export default Wallet;