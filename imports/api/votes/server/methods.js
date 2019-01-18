import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Invites } from '../../invites/invites.js';
import { Referrals } from '../../referrals/referrals.js';
import { Recommendations } from '../../recommendations/recommendations.js';

hasVote = (votes, userId) => {
    for (v in votes){
        if (votes[v].userId == userId){
            return true;
        }
    }

    return false;
}

updateVotes = (Collection, dir, propId, userId) => {
    let obj = Collection.findOne({_id:propId});
    // console.log(obj);
    if (obj){
        if (obj.votes == undefined){
            let data = {
                votes: dir
            };

            if (dir == 1){
                data.upvotes = [{userId: userId, createdAt: new Date()}];
            }
            else if (dir == -1){
                data.downvotes = [{userId: userId, createdAt: new Date()}];
            }
            Collection.update({_id:propId}, {$set:data});
        }
        else {
            let data = {};
            if (dir == 1){
                if (!hasVote(obj.upvotes, userId)){
                    if (obj.downvotes && obj.downvotes.length > 0){
                        data = {
                            $set:{votes: obj.votes+dir*2},
                            $pull: {downvotes: {userId: userId}},
                            $addToSet: {upvotes: {userId:userId, createdAt: new Date()}}
                        }
                    }
                    else{
                        data = {
                            $set:{votes: obj.votes+dir},
                            $addToSet: {upvotes: {userId:userId, createdAt: new Date()}}
                        }
                    }
                }
                else{
                    data = {
                        $set:{votes: obj.votes-dir},
                        $pull: {upvotes: {userId:userId}}
                    }
                }
            }
            else if (dir == -1){
                if (!hasVote(obj.downvotes, userId)){
                    if (obj.upvotes && obj.upvotes.length > 0){
                        data = {
                            $set:{votes: obj.votes+dir*2},
                            $pull: {upvotes: {userId: userId}},
                            $addToSet: {downvotes: {userId:userId, createdAt: new Date()}}
                        }
                    }
                    else{
                        data = {
                            $set:{votes: obj.votes+dir},
                            $addToSet: {downvotes: {userId:userId, createdAt: new Date()}}
                        }
                    }
                }
                else{
                    data = {
                        $set:{votes: obj.votes-dir},
                        $pull: {downvotes: {userId:userId}}
                    }
                }
                    
            }
            // console.log(data);
            if (!(Object.keys(data).length === 0 && data.constructor === Object))
                Collection.update({_id:propId}, data);
        }
    }
}

getUserVote = (Collection, dir, propId, userId) => {
    let obj = Collection.findOne({_id:propId});
    if (obj){
        if (dir == 1){
            if (obj.upvotes && obj.upvotes.length > 0){
                return hasVote(obj.upvotes, userId);
            }
            return false;
        }
        else if (dir == -1){
            if (obj.downvotes && obj.downvotes.length > 0){
                return hasVote(obj.downvotes, userId);
            }
            return false;
        }
    }

    return false;
}

Meteor.methods({
    'votes.add': function(dir, type, propId){
        check(dir, Number);
        check(type, String);
        check(propId, String);
        switch (type){
            case "introduction":
            case "referral":
            case "received-referral":
                updateVotes(Referrals, dir, propId, this.userId);
                break;
            case "invite":
                updateVotes(Invites, dir, propId, this.userId);
                break;
            case "recommendation":
                updateVotes(Recommendations, dir, propId, this.userId);
                break;
        }
    },
    'votes.exists': function(dir, type, propId){
        check(dir, Number);
        check(type, String);
        check(propId, String);
        switch (type){
            case "introduction":
            case "referral":
            case "received-referral":
                return getUserVote(Referrals, dir, propId, this.userId);
            case "invite":
                return getUserVote(Invites, dir, propId, this.userId);
            case "recommendation":
                return getUserVote(Recommendations, dir, propId, this.userId);
        }

        return false;
    }
});