import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Recommendation from './Recommendation.jsx'; 
import { Recommendations } from '/imports/api/recommendations/recommendations.js';

export default RecommendationListContainer = withTracker((props) => {
    const recosHandle = Meteor.subscribe('recommendations.findOne', props.match.params.id, true);

    const reco = Recommendations.findOne({_id: props.match.params.id});
    const loading = !recosHandle.ready();
    const recoExists = !loading && !!reco;
    return {
        loading,
        recoExists,
        reco: recoExists ? reco: {},
    };
})(Recommendation);