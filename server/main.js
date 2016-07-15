import { Meteor } from 'meteor/meteor';

import {Restivus} from 'meteor/nimble:restivus';

var Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

Api.addRoute('checkstat', {authRequired: false}, {

  post: function () {

    let params = this.bodyParams;
    let date = new Date();

    if(params){
      if(params.invoker){
        console.log('Checkstat called by ' + params.invoker + ' at ' + date); // add requester
      } else {
        console.log('Checkstat called by Anonymous at ' + date);
      }
    }

    return {
      success: true,
      timestamp: date
    };
  }

});

Api.addRoute('reflect', {authRequired: false}, {

  post: function () {

    let params = this.bodyParams;
    console.log(params);
    console.log(params.chat_id);
    
    return params;
  }

});

