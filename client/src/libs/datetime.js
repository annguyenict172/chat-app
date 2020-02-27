import moment from 'moment';

const getMomentNow = () => {
  return moment();
}

const isToday = (momentDate) => {
  const today = getMomentNow().startOf('day');
  return momentDate.isSame(today, 'd');
}

const isWithinThisWeek = (momentDate) => {
  const thisWeek = getMomentNow().startOf('week')
  return momentDate.isSame(thisWeek, 'w');
}

const isWithinThisYear = (momentDate) => {
  const thisYear = getMomentNow().startOf('year')
  return momentDate.isSame(thisYear, 'y');
}

const isSameDate = (timestamp1, timestamp2) => {
  return moment(timestamp1).isSame(moment(timestamp2), 'date');
}

const getLastMessageTimeString = (timestamp) => {
  const momentTs = moment(timestamp);
  if (isToday(momentTs)) {
    return momentTs.format('h:mm A');
  } else if (isWithinThisWeek(momentTs)) {
    return momentTs.format('ddd');
  } else if (isWithinThisYear(momentTs)) {
    return momentTs.format('MMM DD');
  } else {
    return momentTs.format('MM/DD/YY');
  }
}

const getMessageDividerTimeString = (timestamp) => {
  const momentTs = moment(timestamp);
  if (isToday(momentTs)) {
    return momentTs.format('h:mm A');
  } else if (isWithinThisWeek(momentTs)) {
    return momentTs.format('ddd h:mm A');
  } else {
    return momentTs.format('MMM DD, YYYY, h:mm A');
  }
}

export {
  getLastMessageTimeString,
  getMessageDividerTimeString,
  isSameDate
}