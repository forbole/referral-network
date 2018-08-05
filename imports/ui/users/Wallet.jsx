import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Wallet extends Component {
    constructor(props){
        super(props);
    }

    // sendCoin = () => {
    //     Meteor.call('fbcli.sendCoin', 'aaaa', 'bbbb', 'cccc', 'dddd', 0, (error, result) => {
    //         console.log(result);
    //     });
    // }

    // createAccount = () => {
    //     Meteor.call('fbcli.createAccount', this.refs.username.value, (error, result) => {
    //         console.log(result);
    //     });
    // }

    // sendContribInvite = () => {
    //     Meteor.call('fbcli.sendContribInvite', 'aaaa', 'bbbb', 'cccc', 'dddd', 0, (error, result) => {
    //         console.log(result);
    //     });
    // }

    // sendContribReco = () => {
    //     Meteor.call('fbcli.sendContribReco', 'aaaa', 'bbbb', 'cccc', 'dddd', 0, (error, result) => {
    //         console.log(result);
    //     });
    // }

    // sendContribVote = () => {
    //     Meteor.call('fbcli.sendContribVote', 'aaaa', 'bbbb', 'cccc', 'dddd', 0, (error, result) => {
    //         console.log(result);
    //     });
    // }

    // checkStatus = () => {
    //     Meteor.call('fbcli.checkStatus', (error, result) => {
    //         console.log(JSON.parse(result));
    //     })
    // }

    render(){
        return (
            <div className="container">
                <div className="row">
                </div>
            </div>
        )
        
    }
}
        
export default Wallet;