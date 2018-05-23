import { Meteor } from 'meteor/meteor';

let fbStatus = () => {
    exec('fbcli status', (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            throw new Meteor.Error(500, 'fbcli status failed');
        }
        return (stdout.toString());
    })
}



Meteor.methods({
    status: function () {
        // this.unblock();
        let statusFunc = Meteor.wrapAsync(fbStatus);
        let result = statusFunc();
        console.log(result);
        return result;
    }
})