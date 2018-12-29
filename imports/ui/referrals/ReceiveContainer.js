import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Referrals } from '/imports/api/referrals/referrals.js';
import Receive from './Receive.jsx';

export default ReceiveContainer = withTracker((props) => {
    // console.log(props.match.params.id);
  const referralHandle = Meteor.subscribe('referrals.findOne', props.match.params.id);
//   console.log(referralHandle);
  const loading = !referralHandle.ready();
  const referral = Referrals.findOne({_id: props.match.params.id});
  const referralExists = !loading && !!referral;
  return {
    loading,
    referralExists,
    referral: referralExists ? referral : {}
  };
})(Receive);
