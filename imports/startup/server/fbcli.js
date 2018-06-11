// All fbcli methods here

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import bcrypt from 'bcrypt';

let fbPath = Meteor.settings.fbcli.path;
let chainId = Meteor.settings.fbcli.chainId;
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

generateKey = (name, password) => {
    // this.unblock();
    let future = new Future();
    let command = Meteor.settings.fbPath+'createAccount '+name+' '+password;
    exec(command, (error, stdout, stderr) => {
        if (error){
            console.log(error);
            throw new Meteor.Error(500, command+" failed");
        }
        future.return(stdout.toString());
    });
    return future.wait();
}

Meteor.methods({
    // createAccount: (name, password) => {

    // },
    'fbcli.checkStatus': function(){
        this.unblock();
        let future = new Future();
        let command = fbPath + 'checkstatus';
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                throw new Meteor.Error(500, command + " failed");
            }
            let lines = stdout.toString().split('\n');
            future.return(lines[1]);
        });
        return future.wait();
    },
    'fbcli.sendCoin': function (toAddr, amount, name, password, seq) {
        check(toAddr, String);
        check(amount, String);
        check(name, String);
        check(password, String);
        check(seq,Number);
        // console.log(this);
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
    },
    'fbcli.sendContrib': function (toAddr, type, key, content, name, time, seq){
        check(toAddr, String);
        check(type, String);
        check(key, String);
        check(content, String);
        check(name, String);
        check(time, String);
        check(seq, Number);

        this.unblock();
        password = '1234567890';

        let future = new Future();
        let command = fbPath+'sendContrib '+toAddr+' '+content+' 0 '+key+' '+time+' '+type+' '+name+' '+password+' '+chainId+' 0'; 

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                throw new Meteor.Error(500, command + " failed");
            }
            future.return(stdout.toString());
        });
        return future.wait();
    },
    'fbcli.createAccount': function (username) {
        check(username, String);
        // check(psSeed, String);


        let d = new Date();
        let psSeed = d.toISOString();

        let future = new Future();
        this.unblock();

        const saltRounds = 3;

        bcrypt.genSalt(saltRounds, function(err, salt){
            bcrypt.hash(psSeed, salt, function(err, hash){
                let password = hash.substring(10);
                let command = fbPath + 'createAccount ' + username + ' ' + password;
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(error);
                        console.log(stderr);
                        throw new Meteor.Error(500, command + " failed");
                    }
                    console.log(stdout);
                    let output = stdout.split('\n');

                    let account = {};
                    account.password = password;
                    account.key = output[6].split('\t');
                    account.seed = output[10];

                    // console.log(account);
                    // future.return(stdout.toString());
                    future.return(account);
                });
            })
        });

        return future.wait();
    }
});
