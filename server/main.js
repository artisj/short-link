import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration';
 
Meteor.startup(() => {
  let now = new Date();
  console.log('Time now', now);

  let momentNow = moment(0);
  console.log(momentNow.fromNow())

WebApp.connectHandlers.use((req, res, next) => {
  //slice modifies the string, starts from item 1 in array
  const _id = req.url.slice(1);
  const link = Links.findOne({ _id });

  if (link) {
    res.statusCode = 302;
    res.setHeader('Location', link.url);
    res.end();
    
    Meteor.call('links.trackVisit', _id );
  }
  else {
    next();
  }

});


  //request
  //middleware
  //response
  // WebApp.connectHandlers.use((req, res, next) => {
  //   console.log('This is from my custom middleware!');
  //   console.log(req.url, req.method, req.headers, req.query);
    

    //httpstatuses.com to see all http status codes

    //Set HTTP status code
    // res.statusCode = 404;
    // //Set HTTP headers
    // res.setHeader('my-custom-header', 'Artis was here');
    // //Set HTTP body
    // res.write('<h1>This is my middleware at work!</h1>');
    // //End HTTP request
    // res.end();


    //next causes the function to continue passed the request
  //   next();
  // });
  //error argument and return from callback

  // code to run on server at startup

  // Accounts.validateNewUser((user) => {
  //     const email = user.emails[0].address;


  //     console.log('this is the user', user);



  // try {
  //     new SimpleSchema({
  //         email: {
  //             type: String,
  //             regEx: SimpleSchema.RegEx.Email
  //         }
  //     }).validate({ email });
  // } catch (e) {
  //     throw new Meteor.Error(400, e.message);
  // }
  // return true;

  //   try {
  //       throw new Meteor.Error(400, 'Please enter a valide email');
  //   } catch (e) {
  //       console.log(e);
  //   }

  //   const petSchema = new SimpleSchema({
  //      name: {
  //          type: String,
  //          min: 1,
  //          max: 200,
  //          optional: true
  //      },
  //      age: {
  //          type: Number,
  //          min: 0
  //      },
  //      contactNumber: {
  //          type: String,
  //          optional: true,
  //          regEx: SimpleSchema.RegEx.Phone
  //      }
  //   });

  //   petSchema.validate({
  //      age: 21,
  //      contactNumber: '1234'
  //   });

});
