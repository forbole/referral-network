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
    'fbcli.sendCoin': function (toAddr, amount, name, password, seq, accnum, gas) {
        check(toAddr, String);
        check(amount, Number); 
        check(name, String);
        check(password, String);
        check(seq, Number);
        check(accnum, Number);
        check(gas, Number);
        // console.log(this);
        this.unblock();
        let future = new Future();

        let coindata = '{"chain_id": "' + chainId + '", "name": "' + name + '", "password": "' + password + '", "sequence": "' + seq + '", "account_number": "' + accnum + '", "gas": "' + gas + '", "amount": [{"amount": "' + amount + '", "denom": "steak"}]}'
        let data = JSON.parse(coindata);
        console.log(data);
        let sending = HTTP.post(fbHost + '/accounts/' + toAddr + '/send', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        future.return(sending.toString());
        return future.wait();
    },
    'fbcli.sendContrib': function (toAddr, type, key, name, time, seq, accnum, gas, content, votetype = ''){
        check(toAddr, String);
        check(type, String);
        check(key, String);
        check(name, String);
        check(time, String);
        check(seq, Number);
        check(accnum, Number);
        check(gas, Number);
        check(accnum, Number);
        check(content, String);  // set content later for vote
        check(votetype, String);  // empty string for other contrib except vote

        this.unblock();
        password = '1234567890';

        let future = new Future();
        console.log("vote: " + votetype)
        if (type == 'vote') {
            if (votetype === "upvote") {
                content = "7570766f7465" // upvote
            } else if (votetype === "downvote") {
                content = "646f776e766f7465"; // downvote
            } else {
                console.log("vote2: " + votetype)
                console.error("wrong vote type.")
                return future.wait()
            }
        } 
        let postdata = '{"name": "'+ name + '", "password": "' + password + '", "chain_id": "' + chainId + '", "sequence": "' + seq + '", "account_number": "' + accnum + '", "gas": "' + gas + '", "content": "' + content + '", "key": "' + key + '", "time": "' + time + '", "votetype": "' + votetype + '"}';
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
