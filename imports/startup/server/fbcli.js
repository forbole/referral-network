// All fbcli methods here

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

let fbPath = Meteor.settings.fbcli.path;
let output = {};

// Load future from fibers
let Future = Npm.require("fibers/future");
// Load exec
let exec = Npm.require("child_process").exec;

stdoutHandler = function(data){
    output.stdout = data;
}

stderrHandler = function(data){
    output.stderr = data;
}

Meteor.methods({
    // createAccount: (name, password) => {

    // },
    checkStatus(){
        this.unblock();
        let future = new Future();
        let command = 'fbcli status';
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                throw new Meteor.Error(500, command + " failed");
            }
            future.return(stdout.toString());
        });
        return future.wait();
    },
    sendCoin(toAddr, amount, name, password, seq) {
        check(toAddr, String);
        check(amount, String);
        check(name, String);
        check(password, String);
        check(seq,Number);
        this.unblock();
        let future = new Future();
        let command = 'ls -la';
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                throw new Meteor.Error(500, command + " failed");
            }
            future.return(stdout.toString());
        });
        return future.wait();
    }
});
