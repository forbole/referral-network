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
        let status = HTTP.get(fbHost + '/node_info');
    
        future.return(status.content[0]);

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
    'fbcli.sendContrib': function (toAddr, type, key, content, name, time, seq, accnum, gas){
        check(toAddr, String);
        check(type, String);
        check(key, String);
        check(content, String);
        check(name, String);
        check(time, String);
        check(seq, Number);
        check(accnum, Number);
        check(gas, Number);

        this.unblock();
        password = '1234567890';

        let future = new Future();
        let postdata = '{"name": "'+ name + '", "password": "' + password + '", "chain_id": "' + chainId + '", "sequence": "' + seq + '", "account_number": "' + accnum + '", "gas": "' + gas + '", "content": "' + content + '", "key": "' + key + '", "time": "' + time + '"}';
         // let temp = {"name": "sherry", "password": "1234567890", "chain_id": "test", "sequence": "4", "account_number": "0", "content": "12341234", "key": "abdc2222", "gas": "200000", "time": "2018-07-27T16:56:00Z"}
        // console.log(postdata);
        // console.log(temp)
        let data = JSON.parse(postdata);
        console.log(data);
        let recom = HTTP.post(fbHost + '/contrib/' + toAddr + '/' + type, {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        future.return(recom.toString()); 
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
