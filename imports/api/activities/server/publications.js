// import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Activities } from '../activities.js';
import { Invites } from '../../invites/invites.js';
import { Referrals } from '../../referrals/referrals.js';
import { Connections } from '../../connections/connections.js';
import { Recommendations } from '../../recommendations/recommendations.js';

import { ReactiveAggregate } from 'meteor/jcbernack:reactive-aggregate';

// Meteor.publish('activities.timeline', function (limit) {
//     // return Contributions.find();
//     let pipeline = [
//         {$lookup:
//         {
//             from: "connections",
//             localField: "userId",
//             foreignField: "users",
//             as: "docs"
//             }
//         },
//         {
//         $unwind: "$docs"
//         },
//         {$match:{
//             "docs.users":{
//                 $in:[this.userId]
//             }        
//         }},
//         {$sort:{createdAt:-1}},
//         {$limit:limit},
//         {$project:{
//             user:{
//                 $filter:{
//                     input:"$docs.users",
//                     as:"user", 
//                     cond:{$not:[{$eq:["$$user", this.userId]}]}
//                 }
//             },
//             type:1,
//             propId:1,
//             createdAt:1,
//             userId:1
//         }}     
//     ];

//     ReactiveAggregate(this, Activities, pipeline);
// });

publishComposite('activities.timeline', function(limit){
    check(limit, Number);

    return {
        find(){
            let collection = Activities.rawCollection();
            // let aggregateQuery = Meteor.wrapAsync(collection.aggregate, collection);
            var pipeline = [
                {$lookup:
                    {
                      from: "connections",
                      localField: "userId",
                      foreignField: "users",
                      as: "docs"
                     }
                 },
                 {
                   $unwind: "$docs"
                 },
                 {$match:{
                     "docs.users":{
                         $in:[this.userId]
                     }        
                 }},
                 {$sort:{createdAt:-1}},
                 {$limit:limit},
                {$project:{
                    user:{
                        $filter:{
                            input:"$docs.users",
                            as:"user", 
                            cond:{$not:[{$eq:["$$user", this.userId]}]}
                        }
                    },
                    type:1,
                    propId:1,
                    createdAt:1,
                    userId:1,

                }}     
            ];
            // let result = aggregateQuery(pipeline, { cursor: {} });
            
            // return Promise.await(collection.aggregate(pipeline, {cursor: {}}));

            return ReactiveAggregate(this, Activities, pipeline);
        }
    }
});