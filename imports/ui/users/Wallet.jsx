import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Wallet extends Component {
    constructor(props){
        super(props);
    }

    sendCoin = () => {  // example: send 1 steak here
        Meteor.call('fbcli.sendCoin', 'cosmosaccaddr1xv6rtafz5xk9d7qu0d3lagn3ycfs2szpg674d5', 1, 'fb-4', '1234567890', 0, 1, 200000, (error, result) => {
            console.log(result);
        });
    } 
 
    createAccount = () => {
        Meteor.call('fbcli.createAccount', this.refs.username.value, (error, result) => { 
            console.log(result);
        });
    }

    sendContribInvite = () => {  //example input
        Meteor.call('fbcli.sendContrib', 'cosmosaccaddr1xv6rtafz5xk9d7qu0d3lagn3ycfs2szpg674d5' , 'invite', 'abcdef11', 'fb-4', '2018-07-31T18:32:00Z', 0, 1, 200000, '239a2341', (error, result) => {
            console.log(result);
        });
    }

    sendContribReco = () => {  // example input
        Meteor.call('fbcli.sendContrib', 'cosmosaccaddr1xv6rtafz5xk9d7qu0d3lagn3ycfs2szpg674d5' , 'recommend', 'abcdef12', 'fb-4', '2018-07-31T12:33:00Z', 1, 1, 200000, 'a2432341', (error, result) => {
            console.log(result); 
        });
    } 
  
    sendContribVote = () => {  // example input, the last param is necessary (votetype)
        Meteor.call('fbcli.sendContrib', 'cosmosaccaddr1xv6rtafz5xk9d7qu0d3lagn3ycfs2szpg674d5', 'vote', 'abcdef13', 'fb-4', '2018-07-31T12:34:00Z', 2, 1, 200000, '766f7465', 'upvote', (error, result) => {
            console.log(result); 
        });
    }

    delegateCoins = () => {
        Meteor.call('fbcli.delegateCoins', (error, result) => {
            console.log(result);
        });
    }
  
    checkStatus = () => { //(delegator_name(t2), password, accnum, seq, gas, amount, delegatoraddr(t2), validatoraddr(sherry), valsrcaddr, valdstaddr)
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