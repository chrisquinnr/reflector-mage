import {Records} from '../common/collections';

export var Utils = new class {

  constructor() {
  }


  /**
   * Logs out the request
   * @param request
   */
  logOutput(header, request) {
    console.log(header[['x-forwarded-for']]);
    console.log(request);
  };

  /**
   * Records the contents of the request to be output client side
   * @param request
   * @returns {*}
   */
  recordRequest(header, request) {
    let head = {
      source: header['x-forwarded-for']
    }
    return Records.insert({header: head, bodyParams:request});
  };

  /**
   * More verbose output, for use as a declared dependency
   * in other Meteor app startup routines
   * @param params
   * @returns {{params: *, success: boolean, timestamp: Date}}
   */
  reflectMore(params) {

    let date = new Date();

    if (params) {
      if (params.invoker) {
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

};