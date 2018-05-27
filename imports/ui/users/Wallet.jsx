import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';


class Wallet extends Component {
    constructor(props){
        super(props);
    }

    sendCoin = () => {
        Meteor.call('sendCoin', 'aaaa', 'bbbb', 'cccc', 'dddd', 0, (error, result) => {
            console.log(result);
        });
        
    }

    checkStatus = () => {
        Meteor.call('checkStatus', (error, result) => {
            console.log(JSON.parse(result));
        })
    }
    render(){
        return (
            <div className="container">
                <h2>Wallet</h2>
                <button className="btn btn-primary" onClick={this.sendCoin}>Send</button>
                <button className="btn btn-primary" onClick={this.checkStatus}>Check Status</button>
            </div>
        )
        
    }
}
        
export default Wallet;