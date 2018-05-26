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
    render(){
        return (
            <div className="container">
                <h2>Wallet</h2>
                <button className="btn btn-primary" onClick={this.sendCoin}>Send</button>
            </div>
        )
        
    }
}
        
export default Wallet;