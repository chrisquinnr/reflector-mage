import { Meteor } from 'meteor/meteor';
import { Records } from '../common/collections';

Meteor.publish('records', () => {
  return Records.find({});
});
