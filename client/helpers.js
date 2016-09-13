import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { _ } from 'meteor/underscore';

/**
 * Formats a given date
 *
 * @param {String|Date} date
 * @param {String} [format]
 *   Optional. Defaults to 'null'
 */
Template.registerHelper('formatDate', (date, format = null) => {
  let dateFormat = 'ddd D MMM YYYY hh:mma';

  // Sets the date format if given
  if (format && _.isString(format)) {
    dateFormat = format;
  }
  if(moment.isMoment(date)){
    return moment(date.datetime).format(dateFormat);
  } else {
    return moment(date).format(dateFormat);
  }

});