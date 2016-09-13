import { Template } from 'meteor/templating';
import { SubsManager } from 'meteor/meteorhacks:subs-manager';
import { Records } from '../common/collections';
import {_} from 'meteor/underscore';
import {Bert} from 'meteor/themeteorchef:bert';

/**
 * On created
 */
Template.output.onCreated(() => {
  let self = Template.instance();
  let Subs = new SubsManager();

  // Create subs ready reactive variables for the template
  self.recordReady = new ReactiveVar(false);

  // Create autorun function to listen on subscriptions
  self.autorun(() => {
    let recordReady = null;
    recordReady = Subs.subscribe('records');
    self.recordReady.set(recordReady.ready());
  });

});

Template.output.onRendered(()=>{
  let query = Records.find({});
  query.observeChanges({
    added: function (id, fields) {
      if (fields) {
        Bert.alert({
          // title: 'Heldeep Alert!',
          message: '<img src="https://i.ytimg.com/vi/6wnV49H9AyI/maxresdefault.jpg" width="100px">',
          type: 'info',
          style: 'growl-bottom-right',
          // icon: 'fa-bell'
        });
      }
    }
  });
});

Template.output.helpers({
  subsReady: () => {
    let self = Template.instance();
    return self.recordReady.get();
  },
  records:()=>{
    let r = Records.find({},{sort: {createdAt: -1}}).fetch();
    if(r && r.length > 0){
      return r;
    } else {
      return [{
        error: true,
        message: 'No calls received yet.'
      }]
    }
  },
  makeArray:(obj)=>{
    return _.toArray(obj);
  },
  output:(object)=>{
    return JSON.stringify(object);
  }
});

Template.output.events({
  'click .clearRecords':(e)=>{
    Meteor.call('clearRecords');
  },
  'click .deleteSingle':(e)=>{
    let id = e.currentTarget.id;
    if(!id) return false;
    Meteor.call('clearSingleRecord', id);
  }
});