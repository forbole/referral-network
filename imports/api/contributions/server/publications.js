import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Contributions } from '../contributions.js';
import { Invites } from '../../invites/invites.js';
import { Referrals } from '../../referrals/referrals.js';
import { Connections } from '../../connections/connections.js';
import { Recommendations } from '../../recommendations/recommendations.js';

// Meteor.publish('contributions.all', function () {
//     return Contributions.find();
// });

publishComposite('contributions.user', function(userId){
    check(userId, String);
    return {
        find(){
            return Contributions.find({userId:userId});
        },
        children:[
            {
                find(contrib){
                    if (contrib.type == "invite"){
                        return Invites.find({_id:contrib.propId});
                    }
                    else if (contrib.type == "referral"){
                        return Referrals.find({_id:contrib.propId});
                    }
                    else if (contrib.type == "connection"){
                        return Connections.find({_id:contrib.propId});
                    }
                    else if (contrib.type == "recommendation"){
                        return Recommendations.find({_id:contrib.propId});
                    }
                }
            }
        ]
    }
});