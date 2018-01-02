import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';


import { routes, onAuthChange } from '../imports/routes/routes';
import { Links } from '../imports/api/links';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

// Tracker.autorun(() => {
// Session.set('name', 'Me');
// const name = Session.get('name');
// console.log('Name: ', name);
// });

Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});
