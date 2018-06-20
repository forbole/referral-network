// All fbcli LCD methods here

import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'
import { check } from 'meteor/check';
import bcrypt from 'bcrypt';

let fbHost = Meteor.settings.fbcli.host;
let chainId = Meteor.settings.fbcli.chainId;
let nodePass = Meteor.settings.fbcli.nodePass;

// Load future from fibers
let Future = Npm.require("fibers/future");
// Load exec
let exec = Npm.require("child_process").exec;

Meteor.methods({
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

        bcrypt.genSalt(saltRounds, Meteor.bindEnvironment(function(err, salt){
            bcrypt.hash(psSeed, salt, Meteor.bindEnvironment(function(err, hash){
                let password = hash.substring(10);
                // let command = fbPath + 'createAccount ' + username + ' ' + password;

                let seed = HTTP.get(fbHost+'/keys/seed');
                // console.log(seed.content);

                let account = {
                    "name":username,
                    "password":password,
                    "seed": seed.content
                };

                let response = HTTP.post(fbHost +'/keys', {
                    data: account,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                let acctAddress = HTTP.get(fbHost +'/keys/'+username);

                let newAccount = {
                    "response": response,
                    "account": acctAddress.content
                }

                future.return(newAccount);
            }))
        }));

        return future.wait();
    }
});
