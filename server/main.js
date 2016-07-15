import { Meteor } from 'meteor/meteor';

import {Restivus} from 'meteor/nimble:restivus';

var Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

Api.addRoute('reflect', {authRequired: false}, {

  post: function () {
    return this.bodyParams;
  },

  get: function () {
    return this.bodyParams;
  }

});

Api.addRoute('reflect-more', {authRequired: false}, {

  post: function () {
    return reflectMore(this.bodyParams);
  },

  get: function () {
    return reflectMore(this.bodyParams);
  }

});

var reflectMore = (params)=>{
  
  let date = new Date();
  
  if(params){
    if(params.invoker){
      console.log('Checkstat called by ' + params.invoker + ' at ' + date); // add requester
    } else {
      console.log('Checkstat called by Anonymous at ' + date);
    }
  }
  return {
    params: params,
    success: true,
    timestamp: date
  };
};




