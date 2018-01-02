import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';


export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    //Publication to get data
    //links name doesn't corespond to database name
    Meteor.publish('links', function () {
        //this.userId
        //find specific item in the database
        return Links.find({ userId: this.userId });
    });
}

// resource.action
//emails.archive
// links.insert  (variable name)
Meteor.methods({
    'links.insert' (url) {
        if (!this.userId) {
            throw new Meteor.Error('Not-authorized');
        }

        new SimpleSchema({
            url: {
                type: String,
                label: "Your Link",
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url });


        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },
    
    'links.setVisibility'( _id, visible) {
        if (!this.userId) {
            throw new Meteor.Error('Not-authorized');
        }

         new SimpleSchema({
            _id: {
                type: String,
                min: 1
            } ,
            visible: {
                type: Boolean
            }
        }).validate({ _id, visible });
        
        //query then update {},{}
        Links.update({_id}, {$set: {visible}});
    },
    //   greetUser(name) {
    //       console.log('greetUser is running');

    //       if(!name) {
    //           throw new Meteor.Error('invalid-arguments', 'Name is required');
    //       }

    //       return `Hello ${name}!`;
    //   }, 
    //   addNumbers (first, second) {
    //       console.log('addNumbers is running');

    //       if(typeof first !== 'number' || typeof second !== 'number') {
    //           throw new Meteor.Error('Invalid numbers', 'Use Numbers Only');
    //       }
    //       return first + second;
    //   }

    'links.trackVisit'( _id ) {
        
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });
        
        Links.update({_id}, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        });
    }
});

//addNumbers takes two numbers