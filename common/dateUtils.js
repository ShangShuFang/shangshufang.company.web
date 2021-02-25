require('date-utils');
let moment = require('moment');

exports.formatUTC = function(utc_datetime){
  // 转为正常的时间格式 年-月-日 时:分:秒
  let T_pos = utc_datetime.indexOf('T');
  let Z_pos = utc_datetime.indexOf('Z');
  let year_month_day = utc_datetime.substr(0,T_pos);
  let hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
  let new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

  // 处理成为时间戳
  let temp = Date.parse(new_datetime);
  let timestamp = new Date(temp);

  timestamp = timestamp.getTime();
  timestamp = timestamp/1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  timestamp = timestamp+8*60*60;

  // 时间戳转为时间
  //return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").format('yyyy-MM-dd hh:mm:ss');
  return new Date(parseInt(timestamp) * 1000).toFormat("YYYY-MM-DD HH24:MI:SS");
};

exports.formatGMT = function (gmt_datetime) {
  let date = new Date(gmt_datetime);
  return  date.getFullYear() + '-'
      + formatTime((date.getMonth() + 1)) + '-'
      + formatTime(date.getDate());
};

exports.currentTime = function () {
  return  new Date().toFormat("YYYY-MM-DD HH24:MI:SS");
};

exports.addMinutes = function (date, minutes) {
  return moment(date).add(minutes, 'minutes').format("YYYY-MM-DD HH:mm:ss");
};

exports.compare = function (date1, date2) {
  return Date.compare(date1, date2);
};

function formatTime(i){
  if (i<10){
    i="0" + i
  }
  return i;
}