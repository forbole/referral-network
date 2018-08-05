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
            <div className="wallet container">
                <p>Your <strong>Forbole Wallet</strong> is a Cosmos Network compatible address which stores multiple assets. You can buy and sell the tokens via a DEX or transfer to any address on Cosmos Network.</p>
                <div className="row token-group">
                    <h4 className="token-name">Desmos (δ)</h4>
                    <p>Desmo, inspired from Greek word desmós (δεσμός) which means “bond, relationship”, is the staking tokens on Forbole.</p>
                    <div className="col-xs-6 balance">395.14 <span className="token-unit">Desmos</span></div>
                    <div className="col-xs-6 text-right"><a className="btn btn-primary btn-xs">B</a> <a className="btn btn-primary btn-xs">S</a> <a className="btn btn-primary btn-xs">T</a></div>
                </div>
                <div className="row token-group">
                    <h4 className="token-name">Phanero (φ)</h4>
                    <p>Phanero, inspired from Greek word phanerós (φανερός) which means “visible, manifest, evident”, is the fee tokens on Forbole.</p>
                    <div className="col-xs-6 balance">8,415.56 <span className="token-unit">Phaneros</span></div>
                    <div className="col-xs-6 text-right"><a className="btn btn-primary btn-xs">B</a> <a className="btn btn-primary btn-xs">S</a> <a className="btn btn-primary btn-xs">T</a></div>
                </div>
                <div className="row token-group">
                    <h4 className="token-name">Atom (Ѧ)</h4>
                    <p>Atoms are the native token of the Cosmos Hub. It is a license for holders to stake and participate in governance.</p>
                    <div className="col-xs-6 balance">215.87 <span className="token-unit">Atoms</span></div>
                    <div className="col-xs-6 text-right"><a className="btn btn-primary btn-xs">B</a> <a className="btn btn-primary btn-xs">S</a> <a className="btn btn-primary btn-xs">T</a></div>
                </div>
                <div className="row token-group">
                    <h4 className="token-name">Ether (Ξ)</h4>
                    <p>Ether is a necessary element — a fuel — for operating the distributed application platform Ethereum.</p>
                    <div className="col-xs-6 balance">672.28 <span className="token-unit">Ethers</span></div>
                    <div className="col-xs-6 text-right"><a className="btn btn-primary btn-xs">B</a> <a className="btn btn-primary btn-xs">S</a> <a className="btn btn-primary btn-xs">T</a></div>
                </div>
            </div>
        )
        
    }
}
        
export default Wallet;