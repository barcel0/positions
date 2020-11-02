import dateFormater from './dateFormatter';
const moment = require('moment');

const getWeekRange = (rawDate) => { //date in format YYYY/MM/DD
  if(rawDate){
    const date = dateFormater(rawDate,'long')
    const startOfWeek = moment(date, 'YYYY/MM/DD').startOf('isoWeek').toDate();
    const endOfWeek = moment(date, 'YYYY/MM/DD').endOf('isoWeek').toDate();
    const weekRange = moment(startOfWeek, 'YYYY/MM/DD').format("MMMM Do YYYY") + ' - ' + moment(endOfWeek, 'YYYY/MM/DD').format("MMMM Do YYYY");
    return weekRange;
  } else {
    return 'Loading...'
  }

}

export default getWeekRange;