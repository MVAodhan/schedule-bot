const { DateTime } = require('luxon');

const getDate = (date) => {
  let dt = DateTime.fromISO(date, { zone: 'utc' });
  let zonedDt = DateTime.fromObject(
    {
      day: dt.day,
      month: dt.month,
      hour: dt.hour,
      minute: dt.minute,
    },
    { zone: 'utc' }
  );
  let usDate = zonedDt.setZone('America/Los_Angeles').toFormat('ff');

  return usDate;
};

const dateIsAfterNow = (date) => {
  let today = new Date();
  let todayStamp = today.getTime();
  let epDate = new Date(date);

  let epStamp = epDate.getTime();

  if (epStamp > todayStamp) {
    return true;
  } else {
    return false;
  }
};

module.exports = { getDate, dateIsAfterNow };
